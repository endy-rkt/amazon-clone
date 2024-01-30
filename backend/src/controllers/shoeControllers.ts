import {Request, Response} from 'express';
import { Shoe } from '../models/Shoe';

type t_details={
	inches:string,
    soleMaterial:string,
    fabricType:string,
    manufacturer:string,
};

class ShoeClass{
	constructor(
        public title:string,
        public rating:number,
        public price:number,
        public number:number,
        public promotion:number|null,
        public details: t_details,
        public aboutItem:string,
        public color:string[],
		public size:string[],
        public imagesUrl:string[]
	){}
}

const getAllShoes = async (req:Request, res:Response) =>{
	try {
		const shoes = await Shoe.find().lean();

		if (!shoes)
			return res.status(404).json({message:'No shoe found'});
		return res.json(shoes);
	} catch (error) {
		console.log(error);
	}
};

const getShoe = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const shoe = await Shoe.findById(id).lean().exec();

		if (!shoe)
			return res.status(404).json({message:'No shoe found'});
		return res.json(shoe);
	} catch (error) {
		console.log(error);
	}
};

const createShoe = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, color,size, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Shoe.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This shoe exists already'});

		const missingData = !title || !rating  || !price || !number || !details ||!details.soleMaterial || !details.manufacturer || !details.fabricType || !details.inches || !aboutItem ||!size?.length || !color?.length || !imagesUrl?.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});
		
		promotion = (promotion) ? promotion:0;
		const shoe = new ShoeClass(title, rating, price, number, promotion, details, aboutItem, size, color, imagesUrl);

		const createdShoe = await Shoe.create(shoe);
		if (!createdShoe)
			return res.status(400).json({message:'error when creating the shoe'});
		return res.json({message:'shoe created'});
	} catch (error) {
		console.log(error);
	}
};

const updateShoeDetailsValue = (shoe:ShoeClass, details:t_details) =>{
	shoe.details.inches = (details?.inches) ? details.inches : shoe.details.inches;
	shoe.details.soleMaterial = (details?.soleMaterial) ? details.soleMaterial :shoe.details.soleMaterial;
	shoe.details.fabricType = (details?.fabricType) ? details.fabricType : shoe.details.fabricType;
	shoe.details.manufacturer = (details?.manufacturer) ? details.manufacturer : shoe.details.manufacturer;
};

const updateProductValue = (shoe:ShoeClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,color:string[],size:string[],imagesUrl:string[]) =>{
	shoe.title = (title) ? title : shoe.title;
	shoe.rating = (rating) ? rating : shoe.rating;
	shoe.price = (price) ? price : shoe.price;
	shoe.number = (number) ? number : shoe.number;
	shoe.promotion = (promotion) ? promotion : shoe.promotion;
	updateShoeDetailsValue(shoe, details);
	shoe.color = (color) ? color : shoe.color;
	shoe.size = (size) ? size : shoe.size;
	shoe.imagesUrl = (imagesUrl) ? imagesUrl : shoe.imagesUrl;
};

const updatedShoe = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, color, size,imagesUrl} = req.body;

		const shoe = await Shoe.findById(id).exec();
		if (!shoe)
			return res.status(404).json({message:'No shoe found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details  && !aboutItem && !color && !size &&! imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(shoe,title,rating,price,number,promotion,details,aboutItem,color,size,imagesUrl);
		const updatedShoe = await shoe.save();
		if(!updatedShoe)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteShoe = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const shoe = await Shoe.findById(id).exec();
		if (!shoe)
			return res.status(400).json({message:'No shoe found'});

		const deletedShoe =  await shoe.deleteOne();
		if (!deletedShoe.acknowledged)
			return res.status(400).json({message:'Error when deleting the shoe'});
		else 
			return res.json({message:`Shoe ${shoe.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllShoes,
	getShoe,
	createShoe,
	updatedShoe,
	deleteShoe,
	ShoeClass
};