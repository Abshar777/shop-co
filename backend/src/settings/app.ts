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
import notificationRoutes from '../presentation/routes/notification.route';

dotenv.config();
const app = express();
const allowedOrigins = [
    process.env.FRONTEND_URL as string,
    process.env.ADMIN_URL as string
];



app.use(cookieParser())
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                // console.log(origin, "origin when cors is used");
                callback(null, origin);
            } else {
                // console.log(origin, "origin when cors is not used");
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.options("*", (req, res) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
        // console.log(origin, "origin when cors is used in options");
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.sendStatus(204);
    } else {
        // console.log(origin, "origin when cors is not used in options");
        res.status(403).send("CORS Preflight Request Not Allowed");
    }
});


// -------------------- util middleware-------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../../public')));


// -------------------- security middleware-------------------------------
app.use(mongoSanitize())

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));




// -------------------------  routes-------------------------------
app.use(apiRoutes.AUTH, authRoutes);
app.use(apiRoutes.PRODUCT, productRoutes);
app.use(apiRoutes.CART, cartRoutes);
app.use(apiRoutes.ORDER, orderRoutes);
app.use(apiRoutes.DELIVERY_BOY, deliveryBoyRoutes);
app.use(apiRoutes.ADMIN, adminRoutes);
app.use(apiRoutes.NOTIFICATION, notificationRoutes);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// -------------------------  error middleware-------------------------------
app.use(notFound);
app.use(errorHandler);




export default app;