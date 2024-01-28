import mongoose from 'mongoose';

export interface IWatch extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
    promotion : number,
	number:number,
	color : string[],
	style : string[],
    details: {
        productDimension: string,
		modelNumber: string,
		batteries: string,
		manufacturer: string,
		origin: string
    },
    aboutItem:string,
    imagesUrl:string[]
}

export const watchSchema = new mongoose.Schema({
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
	style:{
		type:[String],
		required: true
	},
	color: {
		type:[String],
		required:true
	},
	number:{
		type: Number,
		required:true
	},
	promotion: Number,
	details: {
		productDimension: {
			type:String,
			required:true
		},
		modelNumber: {
			type:String,
			required:true
		},
		batteries: {
			type:String,
			required:true
		},
		manufacturer: {
			type:String,
			required:true
		},
		origin: {
			type:String,
			required:true
		}
	},
	aboutItem:{
		type: String,
		required :true
	},
	imagesUrl:{
		type: [String],
		required: true
	}
},{
	timestamps:true
});

export const Watch = mongoose.model<IWatch>('Watch',watchSchema);