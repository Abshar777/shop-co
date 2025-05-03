import AxiosInstance from "@/utils/axios";
import { ADMIN_URL, DELIVERY_BOY_URL } from "@/constants/api";


export const getOrders = async (token: string) => {
    const response = await AxiosInstance(token).get(`${ADMIN_URL}/orders`);
    return response.data;
}


export const getOrdersByDeliveryBoy = async (token: string, id: string) => {
    const response = await AxiosInstance(token).get(`${ADMIN_URL}/orders/delivery-boy/${id}`);
    return response.data;
}

export const manageOrder = async (token: string, orderId: string) => {
    const response = await AxiosInstance(token).post(`${DELIVERY_BOY_URL}/orders/${orderId}`);
    return response.data;
}



export const updateOrderStatus = async (token: string, orderId: string, status: string) => {
    const response = await AxiosInstance(token).put(`${DELIVERY_BOY_URL}/orders/${orderId}`, { status });
    return response.data;
}




