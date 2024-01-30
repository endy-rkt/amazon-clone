import bcrypt from 'bcrypt';
import {Response, Request} from 'express';
import { User } from '../models/User';


type t_role = 'admin' | 'manager' | 'customer';

class UserClass {
	constructor(
        public name:string,
        public email:string,
        public password:string,
        public role?: t_role[]
	){}
}

const getAllUsers = async(req:Request, res:Response) =>{
	try {
		const users:UserClass[]|null = await User.find().lean();
		if (!(users?.length))
			return res.status(404).json({message: 'No user found'});

		return res.json(users);
	} 
	catch (error){
		console.log(error);
	}
};

const getUser = async (req:Request, res:Response) =>{
	try {
		const id = req.params.id;

		const user:UserClass|null = await User.findById(id).lean();
		if (!user)
			return res.status(404).json({message:'No user found'});

		return res.json(user);
	} catch (error) {
		console.log(error);
	}
};

const createUser = async (req:Request, res:Response) =>{
	try {
		const {name, email, password, role} = req.body;
		if (!name || !email || !password)
			return res.status(404).json({message:'All fields are required'});

		const duplicate = await User.findOne({email}).lean().exec();
		if (duplicate)
			return res.status(404).json({message:'This email is already used'});

		const hashedPwd = await bcrypt.hash(password, 10);
		const user = new UserClass(name, email, hashedPwd, role);
		const userCreated = await User.create(user);
		if (!userCreated)
			return res.status(404).json({message:'Invalid data received'});
		else 
			return res.json({message:'New user created'});
	} catch (error) {
		console.log(error);
	}
};

const updateUser = async(req:Request, res:Response) =>{
	try {
		const id = req.params.id;
		const {name,email} = req.body;
		if (!name)
			return res.status(400).json({message:'All data are required'});

		const user = await User.findById(id).exec();
		if (!user)
			return res.status(400).json({message:'No user found'});

		user.name = name;
		user.email=email;

		const updatedUser = await user.save();
		if (!updatedUser)
			return res.status(400).json({message:'Error when updating username'});
		return res.json({message:'Username is updated successfully'});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async(req:Request,res:Response) =>{
	try {
		const id = req.params.id;
        
		const user = await User.findById(id).exec();
		if (!user)
			return res.status(400).json({message:'No user found'});

		const deletedUser =  await user.deleteOne();
		if (!deletedUser.acknowledged)
			return res.status(400).json({message:'Error when deleting the user'});
		else 
			return res.json({message:`User ${user.name} is deleted`});
	} catch (error) {
		console.log(error);
	}
};

export {
	getAllUsers,
	getUser,
	createUser,
	updateUser,
	deleteUser
};