import { Document } from "mongoose";
import { Roles } from "../types/user.type";

export interface IUser {
    name: string;
    email: string;
    role: Roles;
    password: string;
    avatar: string;
    verified: boolean;
}


export interface IUserDocument extends IUser, Document {
    comparePassword(password: string): boolean;
}
