import mongoose from 'mongoose';

interface Watch{
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

const watchSchema = new mongoose.Schema<Watch>({
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
		type : {
			productDimension: String,
			modelNumber: String,
			batteries: String,
			manufacturer: String,
			origin: String
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

export const Watch = mongoose.model('Watch',watchSchema);