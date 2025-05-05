"use client"
import { addressSchema } from "@/schema/address.schema"
import { useZodFormV2 } from "./useZodForm"
import { useGetCart } from "./useCart";
import { useSession } from "next-auth/react";
import { createOrder, getOrderById, getPreviousAddress } from "@/api/order";
import { useEffect, useRef, useState } from "react";
import { useMutationData } from "./useMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { getOrdersByUserId } from "@/api/order";
import { useQueryData } from "./useQueryData";
import { IOrderByIdResponse, IOrderResponse, IPreviousAddressResponse } from "@/types/api";
import { IOrder } from "@/types/IOrder";



export const useOrder = () => {
    const { data: session, update } = useSession();
    const [DisOpen,setDisOpen]=useState(false)
    const client = useQueryClient()
    const router = useRouter();
    const token = session?.user?.token || "";
    const { data: previousAddress, isLoading: previousAddressLoading } = useQueryData(['previousAddress'], () => getPreviousAddress(token));
    const { data: response, isLoading } = useGetCart();
    const formRef = useRef<HTMLFormElement>(null);
    const { mutate: createOrderMutation, reset } = useMutationData(['order'], (data: any) => createOrder(data, token), ['cart'], async (data: any) => {
        await update({ ...session, user: { ...session?.user, orderSuccesPageAccess: true } });
        toast.success("Order created successfully");
        await client.invalidateQueries({ queryKey: ['products'], exact: true });
        await client.invalidateQueries({ queryKey: ['cart'], exact: true });
        await client.invalidateQueries({ queryKey: ['orders'], exact: true });
        reset();
        router.push("/home/cart/checkout/success");
    })
    const { form, onFormSubmit, control, errors, } = useZodFormV2(addressSchema, (data: any) => createOrderMutation(data), {
        address: "",
        city: "",
        country: "",
        postalCode: "",
        street: "",
    }, {
        mode: "onChange"
    })
    const handleCheckout = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const previousAddressData = previousAddress as IPreviousAddressResponse
    return { form, onFormSubmit, control, errors, formRef, handleCheckout, previousAddressData, previousAddressLoading,DisOpen,setDisOpen }
}



export const useGetOrders = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const [orders, setOrders] = useState<IOrder[]>([]);

    const filteredOrders = orders.length > 0 ? orders.filter(
        (order) =>
            order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.products.some((item) =>
                item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
    ) : [];

    const { data: session } = useSession();
    const token = session?.user?.token || "";
    const { data: response, isLoading } = useQueryData(['orders'], () => getOrdersByUserId(token));

    const responseData = response as IOrderResponse

    useEffect(() => {
        if (responseData) {
            setOrders(responseData.orders);
        }
    }, [responseData]);

    return { data: responseData, isLoading, filteredOrders, setSearchTerm, searchTerm }
}



export const useGetOrderById = (id: string) => {
    
    const { data: session } = useSession();
    const token = session?.user?.token || "";
    const { data: response, isLoading } = useQueryData(['order'], () => getOrderById(token, id));
    const responseData = response as IOrderByIdResponse
    return { data: responseData, isLoading }
}




