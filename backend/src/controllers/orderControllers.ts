import { Response,Request } from 'express';
import { Order } from '../models/Order';

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

export{
	getAllOrders,
	getOrder
};