import mongoose,{Document, Types} from 'mongoose';

export interface IOrder extends Document{
    cart:string[],
    userId:Types.ObjectId,
    deliveryDate:string,
    location:string
}

export const orderSchema = new mongoose.Schema({
	cart: {
		type: [String],
		required:true
	},
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required:true
	},
	deliveryDate:{
		type: String,
		required:true
	},
	location :{
		type:String,
		required:true
	}
});

export const Order = mongoose.model<IOrder>('Order',orderSchema);