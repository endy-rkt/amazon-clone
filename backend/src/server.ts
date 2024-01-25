import express,{Request, Response} from 'express';
import path from 'path';
import 'dotenv/config';
import mongoose from 'mongoose';
import  cors from 'cors';
import { logEvents } from './middlewares/logger';
import { corsOptions } from './config/corsOptions';
import { dbConnection } from './config/dbConnection';
import rootRoute from './routes/root';
import { logger } from './middlewares/logger';

const app = express();
const PORT = process.env.PORT;

dbConnection();

app.use(logger);
app.use(cors<Request>(corsOptions));

app.use('/',express.static(path.join(__dirname,'/public')));

app.use('/',rootRoute);

app.all('*',(req:Request,res:Response)=>{
	res.status(404);
	if (req.accepts('html'))
		res.sendFile(path.join(__dirname,'views','page404.html'));
	else if (req.accepts('json'))
		res.json({message: 'Page not found'});
	else
		res.type('txt').send('Page not found');
});

//Set the value of PORT to the one used in production
mongoose.connection.once('open',()=>{
	console.log('Connected to mongoDB');
	app.listen(PORT, ()=>{
		console.log(`Server listening to port ${PORT}`);
	});
});

mongoose.connection.on('error',err =>{
	logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`,'mongoErrLog.log');
});