"use client"
import { useQueryData } from "./useQueryData";
import { useSession } from "next-auth/react";
import { getNotifications, markAllNotificationsAsRead } from "@/api/notification";
import { INotificationResponse } from "@/types/api";
import { useMutationData } from "./useMutation";
import { queryClient } from "@/components/provider/react-query";

export const useNotifications = () => {
    const { data: session } = useSession();
    const { data, isPending } = useQueryData(["notifications"], () => getNotifications(session?.user?.token as string));
    const response = data as INotificationResponse;
    return { data: response, isPending };
}

export const useMarkAllNotificationsAsRead = () => {
    const { data: session } = useSession();
    const { mutate, isPending } = useMutationData(["markAllNotificationsAsRead"], () => markAllNotificationsAsRead(session?.user?.token as string), ['notifications'], () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return { mutate, isPending };
}

