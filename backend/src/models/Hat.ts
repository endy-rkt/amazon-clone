import mongoose from 'mongoose';

export interface IHat extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
    promotion : number,
	number:number,
	size:string[],
	color:string[],
    details: {
        fabricType:string,
		origin: string,
		modelNumber:string,
		manufacturer: string,
    },
    aboutItem:string,
    imagesUrl:string[]
}

export const hatSchema = new mongoose.Schema({
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
	size:{
		type:[String],
		required: true
	},
	color: {
		type:[String],
		required:true
	},
	promotion: Number,
	details: {
		origin:{
			type:String,
			required:true
		},
		modelNumber: {
			type:String,
			required:true
		},
		fabricType:{
			type:String,
			required:true
		},
		manufacturer: {
			type:String,
			required:true
		},
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

export const Hat = mongoose.model<IHat>('Hat',hatSchema);