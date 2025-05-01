import { NextFunction, Response } from "express";
import { OrderUsecase } from "../../application/usecases/orders/order.usecase";
import { AuthRequest } from "../../domain/types/api";
import { statusCodes } from "../../shared/constants/api.constant";



/** @Controller */
export class OrderController {
    private readonly orderUsecase: OrderUsecase;
    constructor() {
        this.orderUsecase = new OrderUsecase();
    }

    /**
     * @description Get all orders
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders
     * @Response 200 - Orders fetched successfully
     */
    async getOrders(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderUsecase.getOrders();
            res.status(statusCodes.OK).json({ message: "Orders fetched successfully", orders });
        } catch (error: any) {
            next(error);
        }
    }

/**
     * @description Get order byUserId
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/user/:userId
     * @Response 200 - Orders fetched successfully
     */
    async getOrdersByUserId(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderUsecase.getOrdersByUserId(req.params.userId);
            res.status(statusCodes.OK).json({ message: "Orders fetched successfully", orders });
        } catch (error: any) {
            next(error);
        }
    }


    /**
     * @description Get order byId
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/:orderId
     * @Response 200 - Order fetched successfully
     */ 
    async getOrderById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const order = await this.orderUsecase.getOrderById(req.params.orderId);
            res.status(statusCodes.OK).json({ message: "Order fetched successfully", order });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Create order
     * @Method POST
     * @Access PRIVATE
     * @Route /api/orders
     * @Response 200 - Order created successfully
     */ 
    async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { address } = req.body;
            const order = await this.orderUsecase.createOrder(address, req.userId as string);
            res.status(statusCodes.OK).json({ message: "Order created successfully", order });
        } catch (error: any) {
            next(error);
        }
    }


    /**
     * @description Update order status
     * @Method PUT
     * @Access PRIVATE
     * @Route /api/orders/:orderId
     * @Response 200 - Order status updated successfully
     */
    async updateOrderStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { status } = req.body;
            const order = await this.orderUsecase.updateOrderStatus(req.params.orderId, status);
            res.status(statusCodes.OK).json({ message: "Order status updated successfully", order });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Get orders by status
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/status/:status
     * @Response 200 - Orders fetched successfully
     */ 
    async getOrdersByStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderUsecase.getOrdersByStatus(req.params.status as "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED");
            res.status(statusCodes.OK).json({ message: "Orders fetched successfully", orders });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Get orders by delivery boy
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/delivery-boy/:deliveryBoyId
     * @Response 200 - Orders fetched successfully
     */
    async getOrdersByDeliveryBoy(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderUsecase.getOrdersByDeliveryBoy(req.params.deliveryBoyId);
            res.status(statusCodes.OK).json({ message: "Orders fetched successfully", orders });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Get orders by delivery boy and status
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/delivery-boy/:deliveryBoyId/status/:status
     * @Response 200 - Orders fetched successfully
     */
    async getOrdersByDeliveryBoyAndStatus(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const orders = await this.orderUsecase.getOrdersByDeliveryBoyAndStatus(req.params.deliveryBoyId, req.params.status as "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED");
            res.status(statusCodes.OK).json({ message: "Orders fetched successfully", orders });
        } catch (error: any) {
            next(error);
        }
    }


    /**
     * @description Add delivery boy to order
     * @Method POST
     * @Access PRIVATE
     * @Route /api/orders/delivery-boy/:deliveryBoyId
     * @Response 200 - Delivery boy added to order successfully
     */
    async addDeliveryBoyToOrder(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const order = await this.orderUsecase.addDeliveryBoyToOrder(req.params.orderId, req.params.deliveryBoyId);
            res.status(statusCodes.OK).json({ message: "Delivery boy added to order successfully", order });
        } catch (error: any) {
            next(error);
        }
    }


    /**
     * @description Get distinct address
     * @Method GET
     * @Access PRIVATE
     * @Route /api/orders/previous-address
     * @Response 200 - Distinct address fetched successfully
     */
    async getDistintAddress(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const address = await this.orderUsecase.getDistintAddress(req.userId as string);
            res.status(statusCodes.OK).json({ message: "Distinct address fetched successfully", address });
        } catch (error: any) {
            next(error);
        }
    }


    
}
