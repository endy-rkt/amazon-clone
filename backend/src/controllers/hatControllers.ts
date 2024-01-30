import {Request, Response} from 'express';
import { Hat } from '../models/Hat';
	
type t_details={
	origin:string,
    modelNumber:string,
    fabricType:string,
    manufacturer:string,
};

class HatClass{
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

const getAllHats = async (req:Request, res:Response) =>{
	try {
		const hats = await Hat.find().lean();

		if (!hats)
			return res.status(404).json({message:'No hat found'});
		return res.json(hats);
	} catch (error) {
		console.log(error);
	}
};

const getHat = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const hat = await Hat.findById(id).lean().exec();

		if (!hat)
			return res.status(404).json({message:'No hat found'});
		return res.json(hat);
	} catch (error) {
		console.log(error);
	}
};

const createHat = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, color,size, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Hat.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This hat exists already'});

		const missingData = !title || !rating  || !price || !number || !details ||!details.modelNumber || !details.manufacturer || !details.fabricType || !details.origin || !aboutItem ||!size?.length || !color?.length || !imagesUrl?.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});
		
		promotion = (promotion) ? promotion:0;
		const hat = new HatClass(title, rating, price, number, promotion, details, aboutItem, size, color, imagesUrl);

		const createdHat = await Hat.create(hat);
		if (!createdHat)
			return res.status(400).json({message:'error when creating the hat'});
		return res.json({message:'hat created'});
	} catch (error) {
		console.log(error);
	}
};

const updateHatDetailsValue = (hat:HatClass, details:t_details) =>{
	hat.details.origin = (details?.origin) ? details.origin : hat.details.origin;
	hat.details.modelNumber = (details?.modelNumber) ? details.modelNumber :hat.details.modelNumber;
	hat.details.fabricType = (details?.fabricType) ? details.fabricType : hat.details.fabricType;
	hat.details.manufacturer = (details?.manufacturer) ? details.manufacturer : hat.details.manufacturer;
};

const updateProductValue = (hat:HatClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,color:string[],size:string[],imagesUrl:string[]) =>{
	hat.title = (title) ? title : hat.title;
	hat.rating = (rating) ? rating : hat.rating;
	hat.price = (price) ? price : hat.price;
	hat.number = (number) ? number : hat.number;
	hat.promotion = (promotion) ? promotion : hat.promotion;
	updateHatDetailsValue(hat, details);
	hat.color = (color) ? color : hat.color;
	hat.size = (size) ? size : hat.size;
	hat.imagesUrl = (imagesUrl) ? imagesUrl : hat.imagesUrl;
};

const updatedHat = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, color, size,imagesUrl} = req.body;

		const hat = await Hat.findById(id).exec();
		if (!hat)
			return res.status(404).json({message:'No hat found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details  && !aboutItem && !color && !size &&! imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(hat,title,rating,price,number,promotion,details,aboutItem,color,size,imagesUrl);
		const updatedHat = await hat.save();
		if(!updatedHat)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteHat = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const hat = await Hat.findById(id).exec();
		if (!hat)
			return res.status(400).json({message:'No hat found'});

		const deletedHat =  await hat.deleteOne();
		if (!deletedHat.acknowledged)
			return res.status(400).json({message:'Error when deleting the hat'});
		else 
			return res.json({message:`Hat ${hat.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllHats,
	getHat,
	createHat,
	updatedHat,
	deleteHat,
	HatClass
};