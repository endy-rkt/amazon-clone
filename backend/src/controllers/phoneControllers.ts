import {Request, Response} from 'express';
import { Phone } from '../models/Phone';

type t_details={
	brand:string,
    modelName:string,
    os:string,
    cellularTech:string[],
	screenSize:number,
	memoryCapacity:number,
	ramSize : number
};

class PhoneClass{
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
		public productDoc:string[],
        public imagesUrl:string[]
	){}
}

const getAllPhones = async (req:Request, res:Response) =>{
	try {
		const phones = await Phone.find().lean();

		if (!phones)
			return res.status(404).json({message:'No phone found'});
		return res.json(phones);
	} catch (error) {
		console.log(error);
	}
};

const getPhone = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const phone = await Phone.findById(id).lean().exec();

		if (!phone)
			return res.status(404).json({message:'No phone found'});
		return res.json(phone);
	} catch (error) {
		console.log(error);
	}
};

const createPhone = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, color,style,productDoc, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Phone.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This phone exists already'});

		const missingData = !title || !rating  || !price || !number || !details ||!details.modelName || !details.cellularTech?.length || !details.screenSize || !details.memoryCapacity || !details.os || !details.brand || !aboutItem || !details.ramSize ||!style?.length || !color?.length || !productDoc?.length || !imagesUrl?.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});
		
		promotion = (promotion) ? promotion:0;
		const phone = new PhoneClass(title, rating, price, number, promotion, details, aboutItem, style, color,productDoc, imagesUrl);

		const createdPhone = await Phone.create(phone);
		if (!createdPhone)
			return res.status(400).json({message:'error when creating the phone'});
		return res.json({message:'phone created'});
	} catch (error) {
		console.log(error);
	}
};

const updatePhoneDetailsValue = (phone:PhoneClass, details:t_details) =>{
	phone.details.brand = (details?.brand) ? details.brand : phone.details.brand;
	phone.details.modelName = (details?.modelName) ? details.modelName :phone.details.modelName;
	phone.details.os = (details?.os) ? details.os : phone.details.os;
	phone.details.ramSize = (details?.ramSize) ? details.ramSize : phone.details.ramSize;
	phone.details.memoryCapacity = (details?.memoryCapacity) ? details.memoryCapacity : phone.details.memoryCapacity;
	phone.details.screenSize = (details?.screenSize) ? details.screenSize : phone.details.screenSize;
	phone.details.cellularTech = (details?.cellularTech) ? details.cellularTech : phone.details.cellularTech;
};

const updateProductValue = (phone:PhoneClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,color:string[],style:string[],imagesUrl:string[],productDoc:string[]) =>{
	phone.title = (title) ? title : phone.title;
	phone.rating = (rating) ? rating : phone.rating;
	phone.price = (price) ? price : phone.price;
	phone.number = (number) ? number : phone.number;
	phone.promotion = (promotion) ? promotion : phone.promotion;
	updatePhoneDetailsValue(phone, details);
	phone.color = (color) ? color : phone.color;
	phone.style = (style) ? style : phone.style;
	phone.imagesUrl = (imagesUrl) ? imagesUrl : phone.imagesUrl;
	phone.productDoc = (productDoc) ? productDoc : phone.productDoc;
};

const updatedPhone = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, color, style,productDoc,imagesUrl} = req.body;

		const phone = await Phone.findById(id).exec();
		if (!phone)
			return res.status(404).json({message:'No phone found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details  && !aboutItem && !color && !style &&! imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(phone,title,rating,price,number,promotion,details,aboutItem,color,style,imagesUrl,productDoc);
		const updatedPhone = await phone.save();
		if(!updatedPhone)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deletePhone = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const phone = await Phone.findById(id).exec();
		if (!phone)
			return res.status(400).json({message:'No phone found'});

		const deletedPhone =  await phone.deleteOne();
		if (!deletedPhone.acknowledged)
			return res.status(400).json({message:'Error when deleting the phone'});
		else 
			return res.json({message:`Phone ${phone.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllPhones,
	getPhone,
	createPhone,
	updatedPhone,
	deletePhone,
	PhoneClass
};