import { PRODUCT_URL } from "@/constants/api";
import { IProductResponse } from "@/types/api";
import AxiosInstance from "@/utils/axios";


export const getProducts = async (): Promise<IProductResponse> => {
    const response = await AxiosInstance().get(PRODUCT_URL);
    return response.data;
};

export const getProductById = async (id: string) => {
    const response = await AxiosInstance().get(`${PRODUCT_URL}/${id}`);
    return response.data;
};



