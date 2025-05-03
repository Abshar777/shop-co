import { IProduct } from "@/types/IProduct";
import { IUser } from "@/types/IUser";
import { IOrder } from "./IOrder";
import { IAddress } from "./IOrder";

export interface IApiResponse {
    success: boolean;
    message: string;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}


export interface IProductResponse {
    message: string,
    products: IProduct[]
}

export interface IProductByIdResponse {
    message: string,
    product: IProduct
}

export interface IOrderResponse {
    message: string,
    orders: IOrder[]
}


export interface IOrderByIdResponse {
    message: string,
    order: IOrder
}


export interface ICategoryResponse {
    message: string,
    categories: string[]
}


export interface IPreviousAddressResponse {
    message: string,
    address: IAddress[]
}
