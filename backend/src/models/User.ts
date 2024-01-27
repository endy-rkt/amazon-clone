import mongoose,{Document} from 'mongoose';

type t_role = 'admin' | 'manager' | 'customer';

export interface IUser extends Document {
    name :  string,
    email: string,
    password: string,
    role?: t_role[]
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
		type:[String],
		enum:['admin','manager','customer'],
		default:'customer'
	}
},{
	timestamps:true
});

export const User = mongoose.model<IUser>('User',userSchema);
