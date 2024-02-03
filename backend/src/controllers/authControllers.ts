import bcrypt from 'bcrypt';
import { User } from '../models/User';
import {Request, Response} from 'express';
import {sign, verify} from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET : string =  process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_SECRET : string = process.env.ACCESS_TOKEN_SECRET!;

const login = async (req:Request, res:Response) =>{
	try {
		const {username, password} = req.body;

		if (!username || !password)
			return res.status(400).json({message:'All fields are required.'});

		const user = await User.findOne({$or:[{name:username},{email:username}]});
		if (!user)
			return res.status(400).json({message:'Unauthorized'});

		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(400).json({message:'Unauthorized'});

		const accessToken = sign(
			{
				'userInfo':{
					'userId':user._id,
					'name':user.name,
					'email':user.email
				}
			},
			ACCESS_TOKEN_SECRET,
			{
				expiresIn:'15m'
			}
		);

		const refreshToken = sign(
			{
				'userId':user._id
			},
			REFRESH_TOKEN_SECRET,
			{
				expiresIn:'7d'
			}
		);

		res.cookie('jwt', refreshToken,{
			secure:true,
			httpOnly:true,
			sameSite:'none',
			maxAge: 1000 * 60 * 60 * 24 * 7
		});

		res.json({accessToken});
	} catch (error) {
		console.log(error);
	} 
};

const sign_up = (req:Request, res:Response) => {

};

const refreshAuth = (req:Request, res:Response) =>{

};

const logout = (req:Request, res:Response) =>{

};

export {
	login,
	logout,
	refreshAuth,
	sign_up
};