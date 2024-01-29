import mongoose from 'mongoose';

export interface IComputer extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
	number : number,
    promotion : number,
    details: {
        type : 'UC' | 'laptop',
        brand : string,
        modelName : string,
        screenSize:number,
        color : string[],
        diskSize: string[],
        cpuModel: string,
        ramSize: number,
        gpuCard: string[]
    },
    aboutItem:string,
    imagesUrl:string[]
}

export const computerSchema = new mongoose.Schema({
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
	promotion: Number,
	details: {
		type : {
			type:String,
			enum:['UC','laptop'],
			required : true
		},
		brand : {
			type:String,
			required:true
		},
		modelName : {
			type:String,
			required:true
		},
		screenSize:{
			type:String,
			required:true
		},
		color : {
			type:[String],
			required:true
		},
		diskSize: {
			type:[String],
			required:true
		},
		cpuModel: {
			type:String,
			required:true
		},
		ramSize: {
			type:Number,
			required:true
		},
		gpuCard: {
			type:[String],
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

export const Computer = mongoose.model<IComputer>('Computer',computerSchema);