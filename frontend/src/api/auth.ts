import AxiosInstance from "@/utils/axios";
import { AUTH_URL } from "@/constants/api";
import { IUser } from "@/types/IUser";
import { IApiResponse } from "@/types/api";

export const login = async (data: { email: string, password: string }): Promise<IApiResponse> => {
    const response = await AxiosInstance().post(`${AUTH_URL}/login`, {
        email: data.email,
        password: data.password
    });
    return response.data
}


export const signUp = async (data: any): Promise<IApiResponse> => {
    const response = await AxiosInstance().post(`${AUTH_URL}/register`, data);
    return response.data
}
