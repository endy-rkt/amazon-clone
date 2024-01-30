import {Request, Response} from 'express';
import { Watch } from '../models/Watch';

type t_details={
	origin:string,
    batteries:string,
    modelNumber:string,
    manufacturer:string,
	productDimension:string
};

class WatchClass{
	constructor(
        public title:string,
        public rating:number,
        public price:number,
        public number:number,
        public promotion:number|null,
        public details: t_details,
        public aboutItem:string,
        public color:string[],
		public style:string[],
        public imagesUrl:string[]
	){}
}

const getAllWatches = async (req:Request, res:Response) =>{
	try {
		const watches = await Watch.find().lean();

		if (!watches)
			return res.status(404).json({message:'No watch found'});
		return res.json(watches);
	} catch (error) {
		console.log(error);
	}
};

const getWatch = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const watch = await Watch.findById(id).lean().exec();

		if (!watch)
			return res.status(404).json({message:'No watch found'});
		return res.json(watch);
	} catch (error) {
		console.log(error);
	}
};

const createWatch = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, color,style, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Watch.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This watch exists already'});

		const missingData = !title || !rating  || !price || !number || !details ||!details.batteries || !details.manufacturer || !details.modelNumber || !details.origin  || !details.productDimension || !aboutItem ||!style?.length || !color?.length || !imagesUrl?.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});
		
		promotion = (promotion) ? promotion:0;
		const watch = new WatchClass(title, rating, price, number, promotion, details, aboutItem, style, color, imagesUrl);

		const createdWatch = await Watch.create(watch);
		if (!createdWatch)
			return res.status(400).json({message:'error when creating the watch'});
		return res.json({message:'watch created'});
	} catch (error) {
		console.log(error);
	}
};

const updateWatchDetailsValue = (watch:WatchClass, details:t_details) =>{
	watch.details.origin = (details?.origin) ? details.origin : watch.details.origin;
	watch.details.productDimension = (details?.productDimension) ? details.productDimension : watch.details.productDimension;
	watch.details.batteries = (details?.batteries) ? details.batteries :watch.details.batteries;
	watch.details.modelNumber = (details?.modelNumber) ? details.modelNumber : watch.details.modelNumber;
	watch.details.manufacturer = (details?.manufacturer) ? details.manufacturer : watch.details.manufacturer;
};

const updateProductValue = (watch:WatchClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,color:string[],style:string[],imagesUrl:string[]) =>{
	watch.title = (title) ? title : watch.title;
	watch.rating = (rating) ? rating : watch.rating;
	watch.price = (price) ? price : watch.price;
	watch.number = (number) ? number : watch.number;
	watch.promotion = (promotion) ? promotion : watch.promotion;
	updateWatchDetailsValue(watch, details);
	watch.color = (color) ? color : watch.color;
	watch.style = (style) ? style : watch.style;
	watch.imagesUrl = (imagesUrl) ? imagesUrl : watch.imagesUrl;
	watch.aboutItem = (aboutItem) ? aboutItem : watch.aboutItem;
};

const updatedWatch = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, color, style,imagesUrl} = req.body;

		const watch = await Watch.findById(id).exec();
		if (!watch)
			return res.status(404).json({message:'No watch found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details  && !aboutItem && !color && !style &&! imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(watch,title,rating,price,number,promotion,details,aboutItem,color,style,imagesUrl);
		const updatedWatch = await watch.save();
		if(!updatedWatch)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteWatch = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const watch = await Watch.findById(id).exec();
		if (!watch)
			return res.status(400).json({message:'No watch found'});

		const deletedWatch =  await watch.deleteOne();
		if (!deletedWatch.acknowledged)
			return res.status(400).json({message:'Error when deleting the watch'});
		else 
			return res.json({message:`Watch ${watch.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllWatches,
	getWatch,
	createWatch,
	updatedWatch,
	deleteWatch,
	WatchClass
};