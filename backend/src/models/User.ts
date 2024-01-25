import mongoose from 'mongoose';

interface User{
    name :  string,
    email: string,
    password: string
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
	}
},{
	timestamps:true
});

export const User = mongoose.model('User',userSchema);
