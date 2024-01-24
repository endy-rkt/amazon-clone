import express from 'express';
import path from 'path';
import 'dotenv/config';
import mongoose from 'mongoose';
import { dbConnection } from './config/dbConnection';
import rootRoute from './routes/root';

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/',rootRoute);

//PORT needs to set the value of the one used in production
mongoose.connection.once('open',()=>{
	console.log('Connected to mongoDB');
	app.listen(PORT, ()=>{
		console.log(`Server listening to port ${PORT}`);
	});
});