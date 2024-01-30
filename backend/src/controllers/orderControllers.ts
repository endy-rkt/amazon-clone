import { Response,Request } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { Book } from '../models/Book';
import { Clothe } from '../models/Clothe';
import { Computer } from '../models/Computer';
import { Hat } from '../models/Hat';
import { Phone } from '../models/Phone';
import { Shoe } from '../models/Shoe';
import { Watch } from '../models/Watch';
import mongoose from 'mongoose';

const getAllOrders = async (req:Request, res:Response) =>{
	try {
		const orders = await Order.find().lean();

		if (!orders)
			return res.status(404).json({message:'No order found'});
		return res.json(orders); 
	} catch (error) {
		console.log(error);
	}
};

const getOrder = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const order = await Order.findById(id).lean().exec();

		if (!order)
			return res.status(404).json({message:'No order found'});
		return res.json(order);
	} catch (error) {
		console.log(error);
	}
};

const getOrderByUserId = async (req:Request, res:Response) =>{
	try {
		const {userId} = req.body;

		const user = await User.findById(userId).lean().exec();
		if (!user)
			return res.status(400).json({message:'No user found'});

		if (!mongoose.Types.ObjectId.isValid(userId)) 
			return res.status(400).json({ message: 'Invalid user ID' });
		const order = await Order.find({userId}).lean().exec();

		if (!order?.length)
			return res.status(404).json({message:'No order found'});
		return res.json({order});
	} catch (error) {
		console.log(error);
	}
};

const validateCart = async (cart: string[]) => {
	let counter = 0;

	for (const title of cart) {
		try {
			let product;
			counter = 0;
			
			product = await Book.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Clothe.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Computer.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Hat.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Phone.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Shoe.findOne({ title }).lean().exec();
			if (product) counter++;

			product = await Watch.findOne({ title }).lean().exec();
			if (product) counter++;
		} catch (error) {
			console.log(error);
		}
	}
	return counter;
};

const createOrder = async (req:Request, res:Response) =>{
	try {
		const {cart, deliveryDate, location, userId} = req.body;

		const missingData = !cart || !deliveryDate || !location || !userId;
		if (missingData)
			return res.status(404).json({message:'All field are required'});
		
		//validate inputs
		const user = await User.findById(userId).lean().exec();
		if (!user)
			return res.status(400).json({message:'No corresponding user'});

		const isValidCart = await validateCart(cart);
		if (!isValidCart)
			return res.status(400).json({message:'The product doesn\'t exist'});

		const order = await Order.create({cart, deliveryDate, location, userId});
		if (!order)
			return res.status(400).json({message:'Error when creating the order'});
		return res.json({message:'Order is successfully created'});

	} catch (error) {
		console.log(error);
	}
};

const deleteOrder = async (req:Request, res:Response) =>{
	const id = req.params.id;

	const order = await Order.findById(id).exec();
	if (!order)
		return res.status(400).json({message:'This product doesn\'t exist'});
	
	const deletedOrder = await order.deleteOne();
	if (!deletedOrder.acknowledged)
		return res.status(400).json({message:'Error when deleting the deletedOrder'});
	else 
		return res.json({message:'Order is deleted'});
};

export{
	getAllOrders,
	getOrder,
	getOrderByUserId,
	createOrder,
	deleteOrder
};