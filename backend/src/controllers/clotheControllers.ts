import {Request, Response} from 'express';
import { Clothe } from '../models/Clothe';

type t_details={
    dimension:string,
    fabricType:string,
    manufacturer:string,
};

class ClotheClass{
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

const getAllClothes = async (req:Request, res:Response) =>{
	try {
		const clothes = await Clothe.find().lean();

		if (!clothes)
			return res.status(404).json({message:'No clothe found'});
		return res.json(clothes);
	} catch (error) {
		console.log(error);
	}
};

const getClothe = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const clothe = await Clothe.findById(id).lean().exec();

		if (!clothe)
			return res.status(404).json({message:'No clothe found'});
		return res.json(clothe);
	} catch (error) {
		console.log(error);
	}
};

const createClothe = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, color,size, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Clothe.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This clothe exists already'});

		const missingData = !title || !rating  || !price || !number || !details ||!details.dimension || !details.manufacturer || !details.fabricType || !aboutItem ||!size?.length || !color?.length || !imagesUrl?.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});
		
		promotion = (promotion) ? promotion:0;
		const clothe = new ClotheClass(title, rating, price, number, promotion, details, aboutItem, size, color, imagesUrl);

		const createdClothe = await Clothe.create(clothe);
		if (!createdClothe)
			return res.status(400).json({message:'error when creating the clothe'});
		return res.json({message:'clothe created'});
	} catch (error) {
		console.log(error);
	}
};

const updateClotheDetailsValue = (clothe:ClotheClass, details:t_details) =>{
	clothe.details.dimension = (details?.dimension) ? details.dimension :clothe.details.dimension;
	clothe.details.fabricType = (details?.fabricType) ? details.fabricType : clothe.details.fabricType;
	clothe.details.manufacturer = (details?.manufacturer) ? details.manufacturer : clothe.details.manufacturer;
};

const updateProductValue = (clothe:ClotheClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,color:string[],size:string[],imagesUrl:string[]) =>{
	clothe.title = (title) ? title : clothe.title;
	clothe.rating = (rating) ? rating : clothe.rating;
	clothe.price = (price) ? price : clothe.price;
	clothe.number = (number) ? number : clothe.number;
	clothe.promotion = (promotion) ? promotion : clothe.promotion;
	updateClotheDetailsValue(clothe, details);
	clothe.color = (color) ? color : clothe.color;
	clothe.size = (size) ? size : clothe.size;
	clothe.imagesUrl = (imagesUrl) ? imagesUrl : clothe.imagesUrl;
};

const updatedClothe = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, color, size,imagesUrl} = req.body;

		const clothe = await Clothe.findById(id).exec();
		if (!clothe)
			return res.status(404).json({message:'No clothe found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details  && !aboutItem && !color && !size &&! imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(clothe,title,rating,price,number,promotion,details,aboutItem,color,size,imagesUrl);
		const updatedClothe = await clothe.save();
		if(!updatedClothe)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteClothe = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const clothe = await Clothe.findById(id).exec();
		if (!clothe)
			return res.status(400).json({message:'No clothe found'});

		const deletedClothe =  await clothe.deleteOne();
		if (!deletedClothe.acknowledged)
			return res.status(400).json({message:'Error when deleting the clothe'});
		else 
			return res.json({message:`Clothe ${clothe.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllClothes,
	getClothe,
	createClothe,
	updatedClothe,
	deleteClothe,
	ClotheClass
};