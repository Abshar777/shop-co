import { ORDER_URL } from "@/constants/api";
import AxiosInstance from "@/utils/axios";

export const createOrder = async (data: any, token: string) => {
    console.log("ajja")
    const response = await AxiosInstance(token).post(ORDER_URL, {
        address: data,
    });
    return response.data;
};

export const getOrders = async (token: string) => {
    const response = await AxiosInstance(token).get(ORDER_URL);
    return response.data;
};

export const getOrdersByUserId = async (token: string) => {
    const response = await AxiosInstance(token).get(ORDER_URL + "/user");
    return response.data;
};


export const getOrderById = async (token: string, id: string) => {
    const response = await AxiosInstance(token).get(ORDER_URL + "/" + id);
    return response.data;
};

