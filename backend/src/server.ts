import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { dbConnection } from './config/dbConnection';

const app = express();
const PORT = process.env.PORT;

dbConnection();

mongoose.connection.once('open',()=>{
	console.log('Connected to mongoDB');
	app.listen(PORT, ()=>{
		console.log(`Server listening to port ${PORT}`);
	});
});