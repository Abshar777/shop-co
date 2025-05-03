import { IOrder } from "./IOrder";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: Roles;
    password: string;
    avatar: string;
    verified: boolean;
}

export enum Roles {
    CLIENT = "client",
    ADMIN = "admin",
    DELIVERY_BOY = "delivery_boy",
}


export interface IApiResponse {
    success: boolean;
    message: string;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}


export interface IUserApiResponse {
    success: boolean;
    message: string;
    users: IUser[];
}


export interface IDeliveryBoyApiResponse {
    success: boolean;
    message: string;
    deliveryBoys: IUser[];
}


export interface IOrderApiResponse {
    success: boolean;
    message: string;
    orders: IOrder[];
}




