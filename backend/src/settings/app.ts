import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import authRoutes from '../presentation/routes/auth.route';
import { apiRoutes } from '../shared/constants/api.constant';
import { notFound, errorHandler } from '../presentation/middlewares/error.middleware';
import path from 'path';
import productRoutes from '../presentation/routes/product.route';
import cartRoutes from '../presentation/routes/cart.route';
import orderRoutes from '../presentation/routes/order.route';
import deliveryBoyRoutes from '../presentation/routes/deliveryBoy.route';
import adminRoutes from '../presentation/routes/admin.route';

dotenv.config();
const app = express();



// -------------------- util middleware-------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// -------------------- security middleware-------------------------------
app.use(cors({
    origin: [process.env.FRONTEND_URL as string, process.env.ADMIN_URL as string],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
app.use(cookieParser())
app.use(helmet())
app.use(mongoSanitize())

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));




// -------------------------  routes-------------------------------
app.use(apiRoutes.AUTH, authRoutes);
app.use(apiRoutes.PRODUCT, productRoutes);
app.use(apiRoutes.CART, cartRoutes);
app.use(apiRoutes.ORDER, orderRoutes);
app.use(apiRoutes.DELIVERY_BOY, deliveryBoyRoutes);
app.use(apiRoutes.ADMIN, adminRoutes);


// -------------------------  error middleware-------------------------------
app.use(notFound);
app.use(errorHandler);




export default app;