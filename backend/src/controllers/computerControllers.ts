import {Request, Response} from 'express';
import { Computer } from '../models/Computer';

type t_details={
    type: 'UC' | 'laptop',
    brand:string,
    modelName:string,
    screenSize:number,
    color:string[],
	cpuModel:string,
	diskSize:string[],
	ramSize:number;
	gpuCard:string[]
};

class ComputerClass{
	constructor(
        public title:string,
        public rating:number,
        public price:number,
        public number:number,
        public promotion:number|null,
        public details: t_details,
        public aboutItem:string,
        public imagesUrl:string[]
	){}
}

const getAllComputers = async (req:Request, res:Response) =>{
	try {
		const computers = await Computer.find().lean();

		if (!computers)
			return res.status(404).json({message:'No computer found'});
		return res.json(computers);
	} catch (error) {
		console.log(error);
	}
};

const getComputer = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const computer = await Computer.findById(id).lean().exec();

		if (!computer)
			return res.status(404).json({message:'No computer found'});
		return res.json(computer);
	} catch (error) {
		console.log(error);
	}
};

const createComputer = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, aboutItem, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Computer.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This computer exists already'});

		const missingData = !title || !rating  || !price || !number  || !details || !details.type || !details.brand || !details.modelName || !details.screenSize || !details.color.length || !details.cpuModel || !details.diskSize.length || !details.ramSize || !details.gpuCard.length || !aboutItem || !imagesUrl.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});

		promotion = (promotion) ? promotion:0;
		const computer = new ComputerClass(title, rating, price, number, promotion, details, aboutItem, imagesUrl);

		const createdComputer = await Computer.create(computer);
		if (!createdComputer)
			return res.status(400).json({message:'error when creating the computer'});
		return res.json({message:'computer created'});
	} catch (error) {
		console.log(error);
	}
};

const updateComputerDetailsValue = (computer:ComputerClass,details:t_details)=>{
	computer.details['type'] = (details?.type) ? details['type']:computer.details['type'];
	computer.details['brand'] = (details?.brand) ? details['brand']:computer.details['brand'];
	computer.details['modelName'] = (details?.modelName) ? details['modelName']:computer.details['modelName'];
	computer.details['screenSize'] = (details?.screenSize) ? details['screenSize']:computer.details['screenSize'];
	computer.details['color'] = (details?.color) ? details['color' ]:computer.details['color'];
	computer.details['cpuModel'] = (details?.cpuModel) ? details['cpuModel']:computer.details['cpuModel'];
	computer.details['diskSize'] = (details?.diskSize) ? details['diskSize']:computer.details['diskSize'];
	computer.details['ramSize'] = (details?.ramSize) ? details['ramSize']:computer.details['ramSize'];
	computer.details['gpuCard'] = (details?.gpuCard) ? details['gpuCard' ]:computer.details['gpuCard'];
};

const updateProductValue=(computer:ComputerClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,aboutItem:string,imagesUrl:string[])=>{
	computer.title = (title) ? title:computer.title;
	computer.rating = (rating) ? rating:computer.rating;
	computer.price = (price) ? price:computer.price;
	computer.number = (number) ? number:computer.number;
	computer.promotion = (promotion) ? promotion:computer.promotion;
	computer.aboutItem = (aboutItem) ? aboutItem:computer.aboutItem;
	computer.imagesUrl = (imagesUrl) ? imagesUrl:computer.imagesUrl;
	updateComputerDetailsValue(computer,details);
};

const updatedComputer = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, aboutItem, editorReview, imagesUrl} = req.body;

		const computer = await Computer.findById(id).exec();
		if (!computer)
			return res.status(404).json({message:'No computer found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details && !aboutItem && !editorReview && !imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(computer,title,rating,price,number,promotion,details,aboutItem,imagesUrl);
		const updatedComputer = await computer.save();
		if(!updatedComputer)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteComputer = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const computer = await Computer.findById(id).exec();
		if (!computer)
			return res.status(400).json({message:'No computer found'});

		const deletedComputer =  await computer.deleteOne();
		if (!deletedComputer.acknowledged)
			return res.status(400).json({message:'Error when deleting the computer'});
		else 
			return res.json({message:`Computer ${computer.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllComputers,
	getComputer,
	createComputer,
	updatedComputer,
	deleteComputer,
	ComputerClass
};