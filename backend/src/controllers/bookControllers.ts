import {Request, Response} from 'express';
import { Book } from '../models/Book';

type t_details={
    hardCover: number,
    author:string,
    publisher:string,
    language:string,
    isbn:string,
};

type t_editorReview={
    review:string
    author:string
}

class BookClass{
	constructor(
        public title:string,
        public rating:number,
        public price:number,
        public number:number,
        public promotion:number|null,
        public details: t_details,
        public abstract:string,
        public editorReview:t_editorReview,
        public imagesUrl:string[]
	){}
}

const getAllBooks = async (req:Request, res:Response) =>{
	try {
		const books = await Book.find().lean();

		if (!books)
			return res.status(404).json({message:'No book found'});
		return res.json(books);
	} catch (error) {
		console.log(error);
	}
};

const getBook = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const book = await Book.findById(id).lean().exec();

		if (!book)
			return res.status(404).json({message:'No book found'});
		return res.json(book);
	} catch (error) {
		console.log(error);
	}
};

const createBook = async (req:Request, res:Response) =>{
	try {
		const {title, rating, price, number, details, abstract, editorReview, imagesUrl} = req.body;
		let {promotion} = req.body;

		const duplicate = await Book.findOne({title}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This book exists already'});

		const missingData = !title || !rating  || !price || !number  || !details || !details.hardCover || !details.author || !details.publisher || !details.language || !details.isbn || !abstract || !editorReview || !editorReview.author  || !editorReview.review || !imagesUrl.length;
		if (missingData)
			return res.status(404).json({message:'All data are required'});

		promotion = (promotion) ? promotion:0;
		const book = new BookClass(title, rating, price, number, promotion, details, abstract, editorReview, imagesUrl);

		const createdBook = await Book.create(book);
		if (!createdBook)
			return res.status(400).json({message:'error when creating the book'});
		return res.json({message:'book created'});
	} catch (error) {
		console.log(error);
	}
};

const updateBookDetailsValue = (book:BookClass,details:t_details)=>{
	book.details['hardCover'] = (details?.hardCover) ? details['hardCover']:book.details['hardCover'];
	book.details['author'] = (details?.author) ? details['author']:book.details['author'];
	book.details['publisher'] = (details?.publisher) ? details['publisher']:book.details['publisher'];
	book.details['language'] = (details?.language) ? details['language']:book.details['language'];
	book.details['isbn'] = (details?.isbn) ? details['isbn' ]:book.details['isbn'];
};

const updateProductValue=(book:BookClass,title:string,rating:number,price:number,number:number,promotion:number,details:t_details,abstract:string,imagesUrl:string[],editorReview:t_editorReview)=>{
	book.title = (title) ? title:book.title;
	book.rating = (rating) ? rating:book.rating;
	book.price = (price) ? price:book.price;
	book.number = (number) ? number:book.number;
	book.promotion = (promotion) ? promotion:book.promotion;
	book.editorReview['author'] = (editorReview?.author) ? editorReview['author']:book.editorReview['author'];
	book.editorReview['review']  = (editorReview?.review) ? editorReview['review'] :book.editorReview['review'] ;
	book.abstract = (abstract) ? abstract:book.abstract;
	book.imagesUrl = (imagesUrl) ? imagesUrl:book.imagesUrl;
	updateBookDetailsValue(book,details);
};

const updatedBook = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {title, rating, price, number,promotion, details, abstract, editorReview, imagesUrl} = req.body;

		const book = await Book.findById(id).exec();
		if (!book)
			return res.status(404).json({message:'No book found'});

		const dataIsEmpty = !title && !promotion && !rating  && !price && !number  && !details && !abstract && !editorReview && !imagesUrl;
		if (dataIsEmpty)
			return res.status(404).json({message:'Empty data send'});

		updateProductValue(book,title,rating,price,number,promotion,details,abstract,imagesUrl,editorReview);
		const updatedBook = await book.save();
		if(!updatedBook)
			return res.status(400).json({message:'Error when updating the product'});
		return res.json({message:'The product is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteBook = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;
        
		const book = await Book.findById(id).exec();
		if (!book)
			return res.status(400).json({message:'No book found'});

		const deletedBook =  await book.deleteOne();
		if (!deletedBook.acknowledged)
			return res.status(400).json({message:'Error when deleting the book'});
		else 
			return res.json({message:`Book ${book.title} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export{
	getAllBooks,
	getBook,
	createBook,
	updatedBook,
	deleteBook,
	BookClass
};