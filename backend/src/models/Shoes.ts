import mongoose from 'mongoose';

export interface IShoes extends mongoose.Document{
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

export const shoesSchema = new mongoose.Schema({
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
		type : {
			inches:String,
			fabricType: String,
			soleMaterial:String,
			manufacturer: String,
		},
		required:true
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

export const Shoes = mongoose.model<IShoes>('Shoes',shoesSchema);