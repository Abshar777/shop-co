import { Types } from "mongoose";
import { IAddress, IOrderDocument } from "../../../domain/interfaces/order.interface";
import { CartRepository } from "../../../infrastructure/db/repositories/cart.repository";
import { OrderRepository } from "../../../infrastructure/db/repositories/order.repository";
import { ProductRepository } from "../../../infrastructure/db/repositories/product.repository";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
import { NotificationUsecase } from "../notification/notification.usecase";
import { RedisService } from "../../../infrastructure/redis/redis";
import { REDIS_KEYS } from "../../../shared/constants/redis.constant";
import { IUserDocument } from "../../../domain/interfaces/user.interface";
export class OrderUsecase {
    private readonly orderRepository: OrderRepository
    private readonly productRepository: ProductRepository
    private readonly cartRepository: CartRepository
    private readonly userRepository: UserRepository
    private readonly notificationUsecase: NotificationUsecase
    private readonly redisService: RedisService
    constructor() {
        this.orderRepository = new OrderRepository();
        this.productRepository = new ProductRepository();
        this.cartRepository = new CartRepository();
        this.userRepository = new UserRepository();
        this.notificationUsecase = new NotificationUsecase();
        this.redisService = new RedisService();
    }

    async getOrders() {
        const cachedOrders = await this.redisService.get(REDIS_KEYS.ORDERS);
        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }
        const orders = await this.orderRepository.getOrders();
        await this.redisService.set(REDIS_KEYS.ORDERS, JSON.stringify(orders), 60 * 60 * 24);
        return orders;
    }


    async getOrdersByUserId(userId: string): Promise<IOrderDocument[]> {
        const cachedOrders = await this.redisService.get(REDIS_KEYS.ORDERS + userId);
        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }
        const orders = await this.orderRepository.getOrdersByUserId(userId);
        await this.redisService.set(REDIS_KEYS.ORDERS + userId, JSON.stringify(orders), 60 * 60 * 24);
        return orders;
    }

    async getOrderById(orderId: string): Promise<IOrderDocument | null> {
        const cachedOrder = await this.redisService.get(REDIS_KEYS.ORDERS + orderId);
        if (cachedOrder) {
            return JSON.parse(cachedOrder);
        }
        const order = await this.orderRepository.getOrderById(orderId);
        await this.redisService.set(REDIS_KEYS.ORDERS + orderId, JSON.stringify(order), 60 * 60 * 24);
        await this.redisService.del(REDIS_KEYS.ORDERS + (order?.userId as IUserDocument)?._id);
        return order;
    }

    async createOrder(address: IAddress, userId: string): Promise<IOrderDocument> {

        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart || !cart.items || !cart?.items?.length) {
            throw new Error("Cart did'nt have products , add Some Products In Cart");
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of cart.items) {

            const product = await this.productRepository.findById(item.product._id as string);
            if (!product) throw new Error(`Product not found: ${item.product._id}`);
            const sizePerProdut = product.sizes.find(e => e.size == item.size);
            if (!sizePerProdut || sizePerProdut.stock <= 0) throw new Error(`Insufficient stock for product: ${product.name}`);
            const updatedProduct = await this.productRepository.updateProductStockBySize(product._id as string, item.size, -item.quantity);

            const productPrice = product.price * item.quantity;
            orderItems.push({
                product: item.product._id as Types.ObjectId,
                quantity: item.quantity,
                price: productPrice,
                size: item.size
            });
            totalAmount += productPrice;
        }
        await this.redisService.del(REDIS_KEYS.ORDERS + userId);
        await this.redisService.del(REDIS_KEYS.CART + userId);
        await this.redisService.del(REDIS_KEYS.PRODUCTS);
        await this.redisService.del(REDIS_KEYS.CATEGORIES);
        await this.redisService.del(REDIS_KEYS.ADDRESS + userId);

        const order = await this.orderRepository.createOrder({
            userId,
            address,
            paymentMethod: "COD",
            products: orderItems,
            totalAmount
        })
        await this.notificationUsecase.createNotification({
            userId: userId,
            title: "Order Placed",
            message: "Your order has been placed successfully",
            type: "ORDER",
            orderId: order._id as string,
            read: false
        })
        await this.cartRepository.clearCart(userId);
        return order;
    }

    async updateOrderStatus(orderId: string, updateStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        const order = await this.orderRepository.updateOrder(orderId, { orderStatus: updateStatus });
        if (!order) throw new Error("Order not found");
        await this.notificationUsecase.createNotification({
            userId: order?.userId as string,
            title: "Order Status Updated",
            message: `Your order has been ${updateStatus}`,
            type: "ORDER",
            orderId: order?._id as string,
            read: false
        })
        await this.redisService.del(REDIS_KEYS.ORDERS + orderId);
        return order;

    }


    async getOrdersByStatus(status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        const cachedOrders = await this.redisService.get(REDIS_KEYS.ORDERS + status);
        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }
        const orders = await this.orderRepository.getOrderByStatus(status);
        await this.redisService.set(REDIS_KEYS.ORDERS + status, JSON.stringify(orders), 60 * 60 * 24);
        return orders;
    }


    async getOrdersByDeliveryBoy(deliveryBoy: string) {
        const user = await this.userRepository.findById(deliveryBoy);
        if (!user) throw new Error("Delivery Boy not found");
        const cachedOrders = await this.redisService.get(REDIS_KEYS.ORDERS + deliveryBoy);
        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }
        const orders = await this.orderRepository.getOderByDeliveryBoy(deliveryBoy);
        await this.redisService.set(REDIS_KEYS.ORDERS + deliveryBoy, JSON.stringify(orders), 60 * 60 * 24);
        return orders;
    }

    async getOrdersByDeliveryBoyAndStatus(deliveryBoy: string, status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        const cachedOrders = await this.redisService.get(REDIS_KEYS.ORDERS + deliveryBoy + status);
        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }
        const orders = await this.orderRepository.getOderByDeliveryBoyAndStatus(deliveryBoy, status);
        await this.redisService.set(REDIS_KEYS.ORDERS + deliveryBoy + status, JSON.stringify(orders), 60 * 60 * 24);
        return orders;
    }


    async addDeliveryBoyToOrder(orderId: string, deliveryBoy: string) {
        const user = await this.userRepository.findById(deliveryBoy);
        if (!user) throw new Error("Delivery Boy not found");
        const order = await this.orderRepository.updateOrder(orderId, { deliveryBoy: user._id });
        if (!order) throw new Error("Order not found");
        await this.notificationUsecase.createNotification({
            userId: user._id as string,
            title: "Order Assigned to You",
            message: "You have been assigned to this order",
            type: "DELIVERY",
            orderId: order._id as string,
            read: false
        })
        await this.notificationUsecase.createNotification({
            userId: order?.userId as string,
            title: "Order Assigned to " + user.name,
            message: "Your order has been assigned to " + user.name,
            type: "DELIVERY",
            orderId: order._id as string,
            read: false
        })
        await this.redisService.del(REDIS_KEYS.ORDERS + orderId);
        await this.redisService.del(REDIS_KEYS.ORDERS + (order?.userId as IUserDocument)?._id);
        await this.redisService.del(REDIS_KEYS.ORDERS + deliveryBoy);
        return order;
    }

    async getDistintAddress(userId: string) {
        const cachedAddress = await this.redisService.get(REDIS_KEYS.ADDRESS + userId);
        if (cachedAddress) {
            return JSON.parse(cachedAddress);
        }
        const address = await this.orderRepository.getDistintValues(userId, "address");
        await this.redisService.set(REDIS_KEYS.ADDRESS + userId, JSON.stringify(address), 60 * 60 * 24);
        return address;
    }



}
