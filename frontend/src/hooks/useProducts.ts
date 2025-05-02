"use client"
import { ICategoryResponse, IProductByIdResponse, IProductResponse } from "@/types/api";
import { useQueryData } from "./useQueryData"
import { getProductByCategory, getProductById, getProducts, getAvailableCategories, searchProducts, filterProducts } from "@/api/product";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFilterStore } from "@/store/filterStore";

export const useProducts = (id?: string) => {
    const client = useQueryClient()
    const apiFn = !id ? getProducts : getProductById;
    const queryKey = !id ? "products" : "product";
    const { data, isPending } = useQueryData([queryKey], () => apiFn(id as string));
    type type = IProductResponse & IProductByIdResponse;
    const response = data as type;


    useEffect(() => {
        if (id) client.invalidateQueries({ queryKey: [queryKey], exact: true })
    }, [id]);
    return { data: response, isPending };
}


export const useSearchProducts = (query: string) => {
    const { data, isPending } = useQueryData(["searchProducts", query], () => searchProducts(query));
    return { data, isPending };
}

export const useGetProductByCategory = (category: string) => {
    const { data, isPending } = useQueryData(["getProductByCategory", category], () => getProductByCategory(category));
    return { data, isPending };
}


export const useGetAvailableCategories = () => {
    const { data, isPending } = useQueryData(["getAvailableCategories"], () => getAvailableCategories());
    type type = ICategoryResponse;
    const response = data as type;
    return { data: response, isPending };
}


export const useFilterProducts = () => {
    const { categories, priceRange, sizes } = useFilterStore();
    const { data, isPending, refetch } = useQueryData(["filterProducts", categories, priceRange, sizes], () => filterProducts({ category: categories, minPrice: priceRange[0], maxPrice: priceRange[1], size: sizes }));
    useEffect(() => {
        refetch();
    }, [categories, priceRange, sizes]);
    const response = data as IProductResponse;
    return { data: response, isPending, refetch };
}







