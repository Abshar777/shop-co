
export interface INotification {
    _id: string;
    userId: string;
    title: string;
    message: string;
    type: "ORDER" | "DELIVERY" | "PROMOTION" | "SYSTEM" | "VERIFICATION";
    orderId?: string;
    read: boolean;
    createdAt: string;
}