import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const ACCESS_TOKEN_SECRET : string = process.env.ACCESS_TOKEN_SECRET!;

export const verifyJwt = (req:Request, res:Response, next:NextFunction) =>{
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader || typeof(authHeader) !== 'string')
		return res.status(400).json({message:'Unauthorized'});
	if (!authHeader?.startsWith('Bearer '))
		return res.status(400).json({message:'Unauthorized'});

	const token = authHeader.split(' ')[1];
	verify(
		token,
		ACCESS_TOKEN_SECRET,
		err =>{
			if (err) 
				return res.status(400).json({message:'Forbidden'});
			next();
		}
	);
};