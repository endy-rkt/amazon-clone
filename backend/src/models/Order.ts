import mongoose,{Document, Types} from 'mongoose';
import { bookSchema } from './Book';
import { clothesSchema } from './Clothes';
import { computerSchema } from './Computer';
import { hatSchema } from './Hat';
import { phoneSchema } from './Phone';
import { shoesSchema } from './Shoes';
import { watchSchema } from './Watch';

export interface IOrder extends Document{
    listOfProducts:[object],
    customer:Types.ObjectId,
    delivryDate:string,
    location:string
}

export const orderSchema = new mongoose.Schema({
	listOfProducts:{
		type:[bookSchema || computerSchema || clothesSchema || hatSchema || phoneSchema || shoesSchema || watchSchema],
		required:true
	},
	customer:{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required:true
	},
	delivryDate:{
		type: String,
		required:true
	},
	location :{
		type:String,
		required:true
	}
});

export const Order = mongoose.model<IOrder>('Order',orderSchema);