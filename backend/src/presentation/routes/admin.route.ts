import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import authMiddilware from "../middlewares/auth.middileware";

const router = Router();
const adminController = new AdminController();


router.get("/users", authMiddilware, adminController.getUsers.bind(adminController));

router.get("/delivery-boys", authMiddilware, adminController.getDeliveryBoys.bind(adminController));

router.put("/delivery-boys/:id", authMiddilware, adminController.updateDeliveryBoy.bind(adminController));

router.get("/orders", authMiddilware, adminController.getOrders.bind(adminController));

router.get("/orders/delivery-boy/:id", authMiddilware, adminController.getOrdersByDeliveryBoy.bind(adminController));

export default router;
