import { IProduct } from ".";
import { IUser } from "./IUser";

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


