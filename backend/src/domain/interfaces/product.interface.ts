import { Document } from "mongoose";

export interface IProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: ISize[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}


export interface ISize {
    stock: number;
    size: string;
}


export interface IProductDocument extends IProduct, Document { }


