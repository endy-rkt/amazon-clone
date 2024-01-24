import fs from 'fs';
import {NextFunction, Request, Response} from 'express';
import path from 'path';
import {format} from 'date-fns';
import {v4 as uuid} from 'uuid';
import fsPromise from 'fs/promises';

export const logEvents = async(message : string, logFileName : string) =>{
	const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}`;

	try {
		const LOGS_FOLDER_EXIST = fs.existsSync(path.join(__dirname,'..','logs'));
		if (!LOGS_FOLDER_EXIST)
			await fsPromise.mkdir(path.join(__dirname,'..','logs'));
		await fsPromise.appendFile(path.join(__dirname,'..','logs',logFileName),logItem);
	} catch (error) {
		console.log(error);
	}
};

export const logger = (req:Request,res:Response,next:NextFunction) =>{
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}\n`,'reqLog.log');
	console.log(`${req.method}\t${req.path}`);
	next();
};
