// domain/interfaces/order.interface.ts
import { Document, Types } from 'mongoose';
import { IUser } from './user.interface';

export interface IOrderedProduct {
  product: Types.ObjectId;
  size: string;
  quantity: number;
  price: number;
}


export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  userId: Types.ObjectId | IUser | string;
  products: IOrderedProduct[];
  totalAmount: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  deliveryBoy?: Types.ObjectId | IUser | string;
  address: IAddress;
  isDeleted?: boolean;
}

export interface IOrderDocument extends IOrder, Document {}
