import { Router } from "express";
import { DeliveryBoyController } from "../controllers/deliveryBoy.controller";
import authMiddilware from "../middlewares/auth.middileware";

const router = Router();
const deliveryBoyController = new DeliveryBoyController();


router.post("/login", deliveryBoyController.login.bind(deliveryBoyController));

router.post("/register", deliveryBoyController.register.bind(deliveryBoyController));

router.post("/orders/:id", authMiddilware, deliveryBoyController.addDeliveryBoyToOrder.bind(deliveryBoyController));

router.get("/orders", authMiddilware, deliveryBoyController.getOrders.bind(deliveryBoyController));

router.put("/orders/:id", authMiddilware, deliveryBoyController.updateOrderStatus.bind(deliveryBoyController));

export default router;


