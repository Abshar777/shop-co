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
