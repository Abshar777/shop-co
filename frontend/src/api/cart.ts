"use client";
import { CART_URL } from "@/constants/api";
import AxiosInstance from "@/utils/axios";
import { useSession } from "next-auth/react";

export const addToCart = async (productId: string, size: string, quantity: number, token: string) => {

    const response = await AxiosInstance(token).post(`${CART_URL}/add`, {
        productId,
        size,
        quantity
    });
    return response.data;
};

export const getCart = async (token: string) => {
    const response = await AxiosInstance(token).get(`${CART_URL}`)
    return response.data
}

export const clearCart = async (token: string) => {
    const response = await AxiosInstance(token).delete(`${CART_URL}/clear`)
    return response.data
}


export const removeFromCart = async (productId: string, size: string, token: string) => {
    const response = await AxiosInstance(token).delete(`${CART_URL}/remove`, {
        data: {
            productId,
            size
        }
    })
    return response.data
}

