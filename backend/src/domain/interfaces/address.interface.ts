import { Document, Types } from 'mongoose';

export interface IAddress {
  userId: Types.ObjectId;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface IAddressDocument extends IAddress, Document {}
