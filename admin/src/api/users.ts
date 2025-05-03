import AxiosInstance from "@/utils/axios";
import { ADMIN_URL } from "@/constants/api";


export const getUsers = async (token: string) => {
    const response = await AxiosInstance(token).get(`${ADMIN_URL}/users`);
    return response.data;
}


export const getDeliveryBoys = async (token: string) => {
    const response = await AxiosInstance(token).get(`${ADMIN_URL}/delivery-boys`);
    return response.data;
}



export const updateDeliveryBoy = async (token: string, id: string, status: boolean) => {
    const response = await AxiosInstance(token).put(`${ADMIN_URL}/delivery-boys/${id}`, { status });
    return response.data;
}



