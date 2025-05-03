"use client"
import { useSession } from "next-auth/react";
import { useQueryData } from "./useQueryData"
import { getDeliveryBoys, getUsers, updateDeliveryBoy } from "@/api/users"
import { IUserApiResponse, IDeliveryBoyApiResponse } from "@/types/api";
import { useMutationData } from "./useMutation";
export const useUsers = () => {
    const { data: session } = useSession();
    const { data, isPending } = useQueryData(['users'], () => getUsers(session?.user.token))
    const response = data as IUserApiResponse
    return { data: response, isPending }
}


export const useDeliveryBoys = () => {
    const { data: session } = useSession();
    const { data, isPending } = useQueryData(['deliveryBoys'], () => getDeliveryBoys(session?.user.token))
    const response = data as IDeliveryBoyApiResponse
    return { data: response, isPending }
}


export const useUpdateDeliveryBoy = () => {
    const { data: session } = useSession();
    const { mutate, isPending } = useMutationData(['updateDeliveryBoy'], ({ id, status }: any) => updateDeliveryBoy(session?.user.token, id, status), ["deliveryBoys"])
    return { mutate, isPending }
}

