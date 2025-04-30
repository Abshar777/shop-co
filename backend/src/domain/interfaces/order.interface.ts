import { Document, Types } from 'mongoose';

export interface IOrderedProduct {
  product: Types.ObjectId;
  size: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: Types.ObjectId;
  products: IOrderedProduct[];
  totalAmount: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  orderStatus: 'PLACED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  isDeleted?: boolean;
}

export interface IOrderDocument extends IOrder, Document {}
