import mongoose,{Document} from 'mongoose';

export interface IUser extends Document {
    name :  string,
    email: string,
    password: string,
    role : 'admin' | 'manager' | 'customer'
}

export const userSchema = new mongoose.Schema({
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

export const User = mongoose.model<IUser>('User',userSchema);
