import mongoose,{Document, Types} from 'mongoose';
import { BookClass } from '../controllers/bookControllers';
import { ClotheClass } from '../controllers/clotheControllers';
import { ComputerClass } from '../controllers/computerControllers';
import { HatClass } from '../controllers/hatControllers';
import { PhoneClass } from '../controllers/phoneControllers';
import { ShoeClass } from '../controllers/shoeControllers';
import { WatchClass } from '../controllers/watchControllers';

type t_product = BookClass | ClotheClass | ComputerClass | HatClass | PhoneClass | ShoeClass | WatchClass;
export interface IOrder extends Document{
    listOfProducts:[t_product],
    customer:Types.ObjectId,
    deliveryDate:string,
    location:string
}

export const orderSchema = new mongoose.Schema({
	listOfProducts:{
		type:[Object],
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