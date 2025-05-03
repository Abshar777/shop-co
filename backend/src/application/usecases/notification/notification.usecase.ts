import { INotification } from "../../../domain/interfaces/notification.interface";
import { NotificationRepository } from "../../../infrastructure/db/repositories/notification.repository";
import { RedisService } from "../../../infrastructure/redis/redis";
import { REDIS_CHANNELS } from "../../../shared/constants/redis.constant";

export class NotificationUsecase {
    private readonly notificationRepository: NotificationRepository;
    private readonly redisService: RedisService;

    constructor() {
        this.notificationRepository = new NotificationRepository();
        this.redisService = new RedisService();
    }

    async getNotifications(userId: string) {
        return await this.notificationRepository.getNotificationsByUserId(userId);
    }

    async createNotification(notification: INotification) {
        // WIREUP: socket implementation
        this.redisService.publish(REDIS_CHANNELS.NOTIFICATION, JSON.stringify(notification));

        const data = await this.notificationRepository.createNotification(notification);

        return data;
    }

    async markAllNotificationsAsRead(userId: string) {
        return await this.notificationRepository.markAllNotificationsAsRead(userId);
    }
}
