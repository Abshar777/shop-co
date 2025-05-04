import mongoose, { Document, Schema } from "mongoose";
import { NotificationDocument } from "../../../domain/interfaces/notification.interface";

const NotificationSchema = new Schema<NotificationDocument>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["ORDER", "PROMOTION", "SYSTEM", "DELIVERY","VERIFICATION"],
        required: true,
      },
      orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
      read: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true, // adds createdAt and updatedAt
    }
  );
  
  export const NotificationModel = mongoose.model<NotificationDocument>(
    "Notification",
    NotificationSchema
  );