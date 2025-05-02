import { IProduct } from "./IProduct";

export interface ICartItem {
    product: IProduct;
    size: string;
    quantity: number;
}

export interface ICart {
    userId: string;
    items: ICartItem[];
    totalPrice: number;
}