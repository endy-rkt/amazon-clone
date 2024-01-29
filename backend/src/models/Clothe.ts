import mongoose from 'mongoose';

export interface IClothe extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
	number :number,
    promotion : number,
	size:string[],
	color:string[],
    details: {
        dimension:string,
		fabricType: string,
		manufacturer: string,
    },
    aboutItem:string,
    imagesUrl:string[]
}

export const clotheSchema = new mongoose.Schema({
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
		dimension:{
			type:String,
			required:true
		},
		fabricType: {
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

export const Clothe = mongoose.model<IClothe>('Clothe',clotheSchema);