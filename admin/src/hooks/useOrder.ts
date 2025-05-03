import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData";
import { getOrders, getOrdersByDeliveryBoy, updateOrderStatus, manageOrder } from "@/api/orders";
import { useMutationData } from "./useMutation";
import { IOrderApiResponse } from "@/types/api";

export const useOrders = () => {
    const { data: session } = useSession();
    const { data, isPending } = useQueryData(['orders'], () => getOrders(session?.user.token))
    const response = data as IOrderApiResponse
    return { data: response, isPending }
}


export const useOrdersByDeliveryBoy = () => {
    const { data: session } = useSession();
    const { data, isPending } = useQueryData(['ordersByDeliveryBoy'], () => getOrdersByDeliveryBoy(session?.user.token, session?.user.id))
    const response = data as IOrderApiResponse
    return { data: response, isPending }
}


export const useUpdateOrderStatus = () => {
    const { data: session } = useSession();
    const { mutate, isPending } = useMutationData(['updateOrderStatus'], ({ id, status }: any) => updateOrderStatus(session?.user.token, id, status))
    return { mutate, isPending }
}


export const useManageOrder = () => {
    const { data: session } = useSession();
    const { mutate, isPending } = useMutationData(['manageOrder'], ({ id }: any) => manageOrder(session?.user.token, id))
    return { mutate, isPending }
}


