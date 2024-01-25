import mongoose from 'mongoose';

interface Clothes{
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

const clothesSchema = new mongoose.Schema<Clothes>({
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
			dimension:String,
			fabricType: String,
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

export const Clothes = mongoose.model('Clothes',clothesSchema);