import mongoose, { Document, Schema } from "mongoose";

export interface INotification {
  userId: string | mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "ORDER" | "DELIVERY" | "PROMOTION" | "SYSTEM" | "VERIFICATION";
  orderId?: string | mongoose.Types.ObjectId;
  read: boolean;
  createdAt?: Date;
}


export interface NotificationDocument extends INotification, Document {}