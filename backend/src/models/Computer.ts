import mongoose from 'mongoose';

interface Computer{
    title: string,
    rating: number,
    price : number,
	number : number,
    promotion : number,
    details: {
        type : 'UC' | 'Laptop',
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

const computerSchema = new mongoose.Schema<Computer>({
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
			type : ['UC','Laptop'],
			brand : String,
			modelName : String,
			screenSize:Number,
			color : [String],
			diskSize: [String],
			cpuModel: String,
			ramSize: Number,
			gpuCard: [String] 
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

export const Computer = mongoose.model('Computer',computerSchema);