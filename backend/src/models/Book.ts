import mongoose from 'mongoose';

export interface IBook extends mongoose.Document{
    title: string,
    rating: number,
    price : number,
	number : number,
    promotion : number,
	abstract: string,
	editorReview:{
		review:string,
		author:string
	},
    details: {
        author:string,
		publisher: string,
		language:string,
		hardCover: number,
		isbn:string
    },
    imagesUrl:string[]
}

export const bookSchema = new mongoose.Schema({
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
		hardCover: {
			type:Number,
			required:true
		},
		author:{
			type:String,
			required:true
		},
		publisher: {
			type:String,
			required:true
		},
		language:{
			type:String,
			required:true
		},
		isbn: {
			type:String,
			required:true
		}
	},
	abstract: {
		type:String,
		required:true
	},
	editorReview:{
		review:{
			type:String,
			required:true
		},
		author:{
			type:String,
			required:true
		}
	},
	imagesUrl:{
		type: [String],
		required: true
	}
},{
	timestamps:true
});

export const Book = mongoose.model<IBook>('Book',bookSchema);