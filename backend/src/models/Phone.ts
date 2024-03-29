import mongoose from 'mongoose';

export interface IPhone extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
	number:number,
    promotion : number,
	color : string[],
	style : string[],
    details: {
        brand : string,
        modelName : string,
		os : string,
		cellularTech: string[],
        screenSize:number,
		memoryCapacity:number,
        ramSize: number,
    },
    aboutItem:string,
	productDoc: string[],
    imagesUrl:string[]
}

export const phoneSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true
	},
	rating: {
		type:Number,
		required: true
	},
	price: {
		type: Number,
		required : true
	},
	number:{
		type: Number,
		required:true
	},
	color:{
		type:[String],
		required:true
	},
	style:{
		type:[String],
		required:true
	},
	promotion: Number,
	details: {
		brand : {
			type:String,
			required:true
		},
		modelName : {
			type:String,
			required:true
		},
		os : {
			type:String,
			required:true
		},
		cellularTech:{
			type:[String],
			required:true
		},
		screenSize:{
			type:Number,
			required:true
		},
		memoryCapacity: {
			type:Number,
			required:true
		},
		ramSize: {
			type:Number,
			required:true
		},
	},
	aboutItem:{
		type: String,
		required :true
	},
	productDoc: {
		type: [String],
		required: true
	},
	imagesUrl:{
		type: [String],
		required: true
	}
},{
	timestamps:true
});

export const Phone = mongoose.model<IPhone>('Phone',phoneSchema);