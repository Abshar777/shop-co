import { Request, Response, NextFunction } from "express";
import { messages, statusCodes } from "../../shared/constants/api.constant";
import { DeliveryBoyUsecase } from "../../application/usecases/deliveryBoy/deliveryBoy";
import { AdminUsecase } from "../../application/usecases/admin/admin.usecaes";
import { Roles } from "../../domain/types/user.type";
import { AuthRequest } from "../../domain/types/api";
import { OrderUsecase } from "../../application/usecases/orders/order.usecase";


/**  @Controller */
export class DeliveryBoyController {
    /**
     * @description Delivery boy usecase
     */
    private readonly deliveryBoyUsecase: DeliveryBoyUsecase
    /**
     * @description Admin usecase
     */
    private readonly adminUsecase: AdminUsecase

    /**
     * @description Order usecase
     */
    private readonly orderUsecase: OrderUsecase

    constructor() {
        this.deliveryBoyUsecase = new DeliveryBoyUsecase();
        this.adminUsecase = new AdminUsecase();
        this.orderUsecase = new OrderUsecase();
    }


    /**
     * @description Login delivery boy or admin
     * @Method POST
     * @Route /api/auth/delivery-boy/login
     * @Body email: string, password: string
     * @Response 200 - User logged in successfully
     * @Response 400 - Email and password are required
     * @Response 500 - Internal server error
     * @ResponseJson {success: boolean, message: string, user: User, accessToken: string, refreshToken: string}
     */
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(statusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Email and password are required"
                });
            }
            const { user, accessToken, refreshToken } =
                email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ?
                    await this.adminUsecase.adminLogin(email, password) :
                    await this.deliveryBoyUsecase.loginDeliveryBoy(email, password);
            const message = email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ? "Admin logged in successfully" : "Delivery boy logged in successfully";
            res.status(statusCodes.OK).json({
                success: true,
                message,
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }

    }



    /**
     * @description Register delivery boy
     * @Method POST
     * @Route /api/auth/delivery-boy/register
     * @Body email: string, password: string, name: string
     * @Response 201 - Delivery boy registered successfully
     * @Response 400 - Email, password and name are required
     * @Response 500 - Internal server error
     * @ResponseJson {success: boolean, message: string, user: User, accessToken: string, refreshToken: string}
     */
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;
            if (!email || !password || !name) {
                return res.status(statusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "Email, password and name are required"
                });
            }
            const { user, accessToken, refreshToken } = await this.deliveryBoyUsecase.registerDeliveryBoy({ email, password, name });
            res.status(statusCodes.CREATED).json({
                success: true,
                message: "Delivery boy registered successfully",
                user,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Add delivery boy to order
     * @Method POST
     * @Route /api/delivery-boy/orders/:id
     * @Response 200 - Delivery boy added to order successfully
     * @Response 400 - Delivery boy not found
     */
    async addDeliveryBoyToOrder(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (req.role !== Roles.DELIVERY_BOY) {
                throw new Error(messages.UNAUTHORIZED)
            }
            const { id } = req.params;
            const userId = req.userId as string;
            const order = await this.orderUsecase.addDeliveryBoyToOrder(id, userId);
            res.status(statusCodes.OK).json({
                message: "Delivery boy added to order successfully",
                order: order
            });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description Get orders
     * @Method GET
     * @Route /api/delivery-boy/orders
     * @Response 200 - Orders fetched successfully
     * @Response 400 - Orders not found
     */
    async getOrders(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (req.role !== Roles.DELIVERY_BOY) {
                throw new Error(messages.UNAUTHORIZED)
            }
            const userId = req.userId as string;
            const orders = await this.orderUsecase.getOrdersByDeliveryBoy(userId);
            res.status(statusCodes.OK).json({
                message: "Orders fetched successfully",
                orders: orders
            });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description update order status
     * @Method PUT
     * @Route /api/delivery-boy/orders/:id
     * @Response 200 - Order status updated successfully
     * @Response 400 - Order not found
     */
    async updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (req.role !== Roles.DELIVERY_BOY) {
                throw new Error(messages.UNAUTHORIZED)
            }
            const { id } = req.params;
            const { status } = req.body;
            const order = await this.orderUsecase.updateOrderStatus(id, status);
            res.status(statusCodes.OK).json({
                message: "Order status updated successfully",
                order: order
            });
        } catch (error) {
            next(error);
        }
    }

}

export default new DeliveryBoyController();