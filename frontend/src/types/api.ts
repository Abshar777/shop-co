import { IUser } from "./IUser";

export interface IApiResponse {
    success: boolean;
    message: string;
    user: IUser;
    accessToken: string;
    refreshToken: string;
}


