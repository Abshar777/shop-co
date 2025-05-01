import { Types } from "mongoose";
import { IAddress, IOrderDocument } from "../../../domain/interfaces/order.interface";
import { CartRepository } from "../../../infrastructure/db/repositories/cart.repository";
import { OrderRepository } from "../../../infrastructure/db/repositories/order.repository";
import { ProductRepository } from "../../../infrastructure/db/repositories/product.repository";
import { UserRepository } from "../../../infrastructure/db/repositories/user.repository";
export class OrderUsecase {
    private readonly orderRepository: OrderRepository
    private readonly productRepository: ProductRepository
    private readonly cartRepository: CartRepository
    private readonly userRepository: UserRepository
    constructor() {
        this.orderRepository = new OrderRepository();
        this.productRepository = new ProductRepository();
        this.cartRepository = new CartRepository();
        this.userRepository = new UserRepository();
    }

    async getOrders() {
        return await this.orderRepository.getOrders();
    }


    async getOrdersByUserId(userId: string): Promise<IOrderDocument[]> {
        return await this.orderRepository.getOrdersByUserId(userId);
    }

    async getOrderById(orderId: string): Promise<IOrderDocument | null> {
        return await this.orderRepository.getOrderById(orderId);
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

            await this.productRepository.updateProductStockBySize(product._id as string, item.size, -item.quantity);
            const productPrice = product.price * item.quantity;
            orderItems.push({
                product: item.product._id as Types.ObjectId,
                quantity: item.quantity,
                price: productPrice,
                size: item.size
            });
            totalAmount += productPrice;
        }

        const order = await this.orderRepository.createOrder({
            userId,
            address,
            paymentMethod: "COD",
            products: orderItems,
            totalAmount
        })
        await this.cartRepository.clearCart(userId);
        return order;
    }

    async updateOrderStatus(orderId: string, updateStatus: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        const order = await this.orderRepository.updateOrder(orderId, { orderStatus:updateStatus });
        if (!order) throw new Error("Order not found");
        return order;

    }


    async getOrdersByStatus(status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        return await this.orderRepository.getOrderByStatus(status);
    }


    async getOrdersByDeliveryBoy(deliveryBoy: string) {
        const user = await this.userRepository.findById(deliveryBoy);
        if (!user) throw new Error("Delivery Boy not found");
        return await this.orderRepository.getOderByDeliveryBoy(deliveryBoy);
    }

    async getOrdersByDeliveryBoyAndStatus(deliveryBoy: string, status: "PLACED" | "SHIPPED" | "DELIVERED" | "CANCELLED") {
        return await this.orderRepository.getOderByDeliveryBoyAndStatus(deliveryBoy, status);
    }


    async addDeliveryBoyToOrder(orderId: string, deliveryBoy: string) {
        const user = await this.userRepository.findById(deliveryBoy);
        if (!user) throw new Error("Delivery Boy not found");
        const order = await this.orderRepository.updateOrder(orderId, { deliveryBoy: user._id });
        if (!order) throw new Error("Order not found");
        return order;
    }

    async getDistintAddress(userId: string) {
        return await this.orderRepository.getDistintValues(userId,"address");
    }



}
