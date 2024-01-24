import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

//Set MONGO_URI to the one used in production
export const dbConnection = async() =>{
	try {
		if (MONGO_URI)
			await mongoose.connect(MONGO_URI);
	} catch (error) {
		console.log(error);
	}
};