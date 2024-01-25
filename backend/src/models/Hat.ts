import mongoose from 'mongoose';

interface Hat{
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

const hatSchema = new mongoose.Schema<Hat>({
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
			origin:String,
			modelNumber: String,
			fabricType:String,
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

export const Hat = mongoose.model('Hat',hatSchema);