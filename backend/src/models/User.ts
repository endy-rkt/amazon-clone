import mongoose from 'mongoose';

interface User{
    name :  string,
    email: string,
    password: string,
    role : 'admin' | 'manager' | 'customer'
}

const userSchema = new mongoose.Schema<User>({
	name:{
		type:String,
		required : true
	},
	email:{
		type:String,
		required : true
	},
	password:{
		type:String,
		required:true
	},
	role:{
		type:String,
		enum:['admin','manager','customer'],
		default:'customer',
		required:true
	}
},{
	timestamps:true
});

export const User = mongoose.model('User',userSchema);
