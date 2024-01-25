import mongoose from 'mongoose';

interface Phone{
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

const phoneSchema = new mongoose.Schema<Phone>({
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
		type : {
			brand : String,
			modelName : String,
			os : String,
			cellularTech:[String],
			screenSize:Number,
			memoryCapacity: Number,
			ramSize: Number,
		},
		required:true
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

export const Phone = mongoose.model('Phone',phoneSchema);