import { NextFunction, Request, Response } from "express";
import { NotificationUsecase } from "../../application/usecases/notification/notification.usecase";
import { statusCodes } from "../../shared/constants/api.constant";
import { AuthRequest } from "../../domain/types/api";


/** @Controller */
export class NotificationController {
    /**
     * @description Notification usecase
     */
    private readonly notificationUsecase: NotificationUsecase;

    constructor() {
        this.notificationUsecase = new NotificationUsecase();
    }

    /**
     * @description Get notifications
     * @Method GET
     * @Access PRIVATE
     * @Route /api/notifications
     * @Response 200 - Notifications fetched successfully
     * @Response 400 - User id is required
     * @Response 500 - Internal server error
     */
    async getNotifications(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const notifications = await this.notificationUsecase.getNotifications(req.userId as string);
            return res.status(statusCodes.OK).json({
                success: true,
                message: "Notifications fetched successfully",
                notifications: notifications || []
            });
        } catch (error) {
            next(error);
        }
    }


    /** 
     * @description Mark notification all as read
     * @Method PUT
     * @Access PRIVATE
     * @Route /api/notifications/read
     * @Response 200 - Notification marked as read successfully
     * @Response 400 - User id is required
     */
    async markAllNotificationsAsRead(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            await this.notificationUsecase.markAllNotificationsAsRead(req.userId as string);
            return res.status(statusCodes.OK).json({
                success: true,
                message: "Notification marked as read successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}