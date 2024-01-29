import mongoose from 'mongoose';

export interface IShoe extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
    promotion : number,
	number :number,
	size:string[],
	color:string[],
    details: {
        inches:string,
		fabricType: string,
		soleMaterial:string,
		manufacturer: string,
    },
    aboutItem:string,
    imagesUrl:string[]
}

export const shoeSchema = new mongoose.Schema({
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
		inches:{
			type:String,
			required:true
		},
		fabricType: {
			type:String,
			required:true
		},
		soleMaterial:{
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

export const Shoe = mongoose.model<IShoe>('Shoe',shoeSchema);