import mongoose from 'mongoose';

interface Book{
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

const bookSchema = new mongoose.Schema<Book>({
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
			hardCover: Number,
			author:String,
			publisher: String,
			language:String,
			isbn: String,
		},
		required:true
	},
	abstract: {
		type:String,
		required:true
	},
	editorReview:{
		type:{
			review:String,
			author:String
		},
		required: true
	},
	imagesUrl:{
		type: [String],
		required: true
	}
},{
	timestamps:true
});

export const Book = mongoose.model('Book',bookSchema);