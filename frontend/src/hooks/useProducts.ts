import { IProductByIdResponse, IProductResponse } from "@/types/api";
import { useQueryData } from "./useQueryData"
import { getProductById, getProducts } from "@/api/product";

export const useProducts = (id?: string) => {
    const apiFn = !id ? getProducts : getProductById;
    const queryKey = !id ? "products" : "product";
    const { data, isPending } = useQueryData([queryKey], () => apiFn(id as string));
    type type = IProductResponse & IProductByIdResponse;
    const response = data as type;
    return { data: response, isPending };
}