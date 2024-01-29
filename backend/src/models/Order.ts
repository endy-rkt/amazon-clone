import mongoose,{Document, Types} from 'mongoose';
import { bookSchema } from './Book';
import { clotheSchema } from './Clothe';
import { computerSchema } from './Computer';
import { hatSchema } from './Hat';
import { phoneSchema } from './Phone';
import { shoeSchema } from './Shoe';
import { watchSchema } from './Watch';

export interface IOrder extends Document{
    listOfProducts:[object],
    customer:Types.ObjectId,
    deliveryDate:string,
    location:string
}

export const orderSchema = new mongoose.Schema({
	listOfProducts:{
		type:[bookSchema || computerSchema || clotheSchema || hatSchema || phoneSchema || shoeSchema || watchSchema],
		required:true
	},
	customer:{
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