"use client"
import { IProductByIdResponse, IProductResponse } from "@/types/api";
import { useQueryData } from "./useQueryData"
import { getProductById, getProducts } from "@/api/product";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
export const useProducts = (id?: string) => {
    const client = useQueryClient()
    const apiFn = !id ? getProducts : getProductById;
    const queryKey = !id ? "products" : "product";
    const { data, isPending } = useQueryData([queryKey], () => apiFn(id as string));
    type type = IProductResponse & IProductByIdResponse;
    const response = data as type;


    useEffect(() => {
       if(id) client.invalidateQueries({ queryKey: [queryKey], exact: true })
    }, [id]);
    return { data: response, isPending };
}




