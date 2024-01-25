import mongoose from 'mongoose';

interface User{
    name :  string,
    email: string,
    password: string,
    role : string
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
		default:'customer',
		required:true
	}
},{
	timestamps:true
});

export const User = mongoose.model('User',userSchema);
