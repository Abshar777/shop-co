import { Document, Types } from 'mongoose';
import { IProduct } from './product.interface';

export interface ICartItem {
  product: IProduct ; 
  size: string;
  quantity: number;
}

export interface ICart {
  userId: Types.ObjectId; 
  items: ICartItem[];
  totalPrice: number;
}

export interface ICartDocument extends ICart, Document {}
