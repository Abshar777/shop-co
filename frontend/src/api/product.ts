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

export const searchProducts = async (query: string) => {
    const response = await AxiosInstance().get(`${PRODUCT_URL}/search?query=${query}`);
    return response.data;
};


export const getProductByCategory = async (category: string) => {
    const response = await AxiosInstance().get(`${PRODUCT_URL}/category/${category}`);
    return response.data;
};


export const getAvailableCategories = async () => {
    const response = await AxiosInstance().get(`${PRODUCT_URL}/categories`);
    return response.data;
};


export const filterProducts = async (filters: {
    minPrice: number;
    maxPrice: number;
    category: string[];
    size: string[];
}) => {
    const response = await AxiosInstance().get(`${PRODUCT_URL}/filter`, { params: filters });
    return response.data;
};













