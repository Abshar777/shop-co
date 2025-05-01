import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/login", authController.login.bind(authController));

router.post("/register", authController.register.bind(authController));

export default router;

