import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { authMiddilware } from "../middlewares/auth.middileware";
const router = Router();
const cartController = new CartController();


router.post("/add", authMiddilware, cartController.addProductToCart.bind(cartController));
router.delete("/remove", authMiddilware, cartController.removeProductFromCart.bind(cartController));
router.get("/", authMiddilware, cartController.getCart.bind(cartController));
router.delete("/clear", authMiddilware, cartController.clearCart.bind(cartController));
router.put("/update", authMiddilware, cartController.updateCartItem.bind(cartController));
router.get("/total", authMiddilware, cartController.getCartTotal.bind(cartController));

export default router;

