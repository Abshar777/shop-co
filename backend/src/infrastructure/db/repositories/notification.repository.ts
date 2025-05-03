import { INotification, NotificationDocument } from "../../../domain/interfaces/notification.interface";
import { NotificationModel } from "../models/notification.model";
import { BaseRepository } from "./base.repository";

export class NotificationRepository extends BaseRepository<NotificationDocument> {
    constructor() {
        super(NotificationModel);
    }

    async createNotification(notification: INotification) {
        return await this.model.create(notification);
    }

    async getNotificationsByUserId(userId: string) {
        return await this.model.find({ userId }).sort({ createdAt: -1 });
    }

    async markAllNotificationsAsRead(userId: string) {
        return await this.model.updateMany({ userId }, { $set: { read: true } });
    }


}