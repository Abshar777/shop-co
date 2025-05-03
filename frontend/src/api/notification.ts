import { NOTIFICATION_URL } from "../constants/api";
import AxiosInstance from "@/utils/axios";


export const getNotifications = async (token: string) => {
    const response = await AxiosInstance(token).get(NOTIFICATION_URL);
    return response.data;
}

export const markAllNotificationsAsRead = async (token: string) => {
    const response = await AxiosInstance(token).put(NOTIFICATION_URL + "/read");
    return response.data;
}

