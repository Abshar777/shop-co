import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authMiddilware } from "../middlewares/auth.middileware";

const router = Router();

const notificationController = new NotificationController();

router.get("/", authMiddilware, notificationController.getNotifications.bind(notificationController));

router.put("/read", authMiddilware, notificationController.markAllNotificationsAsRead.bind(notificationController));


export default router;




