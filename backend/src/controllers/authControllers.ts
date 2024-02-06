import bcrypt from 'bcrypt';
import { User } from '../models/User';
import {Request, Response} from 'express';
import {sign, verify, Jwt,JwtPayload,VerifyErrors} from 'jsonwebtoken';
import { Types } from 'mongoose';

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
					'email':user.email,
					'role':user.role
				}
			},
			ACCESS_TOKEN_SECRET,
			{
				expiresIn:'15m'
			}
		);

		const refreshToken = sign(
			{
				'userId':user._id,
				'email':user.email
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

const refreshAuth = (req:Request, res:Response) =>{
	const cookies = req.cookies;

	if (!cookies?.jwt)
		return res.status(400).json({message:'Unauthorized'});

	const refreshToken = cookies.jwt;

	verify(
		refreshToken,
		REFRESH_TOKEN_SECRET,
		async (err: VerifyErrors | null, decoded: string | Jwt | JwtPayload | undefined) => {
			try {
				if (err || !decoded)
					return res.status(400).json({ message: 'Forbidden' });
				
				let userId: string | undefined |Types.ObjectId;
	
				if (typeof decoded === 'string')
					userId = decoded;
				else if ('userId' in decoded) 
					userId = decoded.userId;
				else
					userId = undefined;
	
				if (!userId) {
					return res.status(400).json({ message: 'Unauthorized' });
				}
	
				const foundUser = await User.findById(userId).lean().exec();
				if (!foundUser) {
					return res.status(400).json({ message: 'Unauthorized' });
				}
	
				const accessToken = sign(
					{
						userInfo: {
							userId: foundUser._id,
							name: foundUser.name,
							email: foundUser.email,
							role: foundUser.role
						}
					},
					ACCESS_TOKEN_SECRET,
					{
						expiresIn: '15m'
					}
				);
				res.json({ accessToken });
			} catch (error) {
				console.log(error);
			}
		});
};


const logout = (req:Request, res:Response) =>{
	const cookies = req.cookies;

	if (!cookies?.jwt)
		return res.sendStatus(204);

	console.log('ato');
	res.clearCookie('jwt',{secure:true,httpOnly:true,sameSite:'none'});
	res.json({message:'Cookie cleared'});
};

export {
	login,
	logout,
	refreshAuth
};