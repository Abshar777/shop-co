import { Model, UpdateQuery } from "mongoose";
import { IOrder, IOrderDocument } from "../../../domain/interfaces/order.interface";
import OrderModel from "../models/order.model";

export class OrderRepository {
    private orderModel: Model<IOrderDocument>;

    constructor() {
        this.orderModel = OrderModel;
    }


    async getOrders(): Promise<IOrderDocument[]> {
        return await this.orderModel.find().populate("products.product").populate("deliveryBoy").populate("userId");
    }

    async getOrdersByUserId(userId: string): Promise<IOrderDocument[]> {
        return await this.orderModel.find({ userId }).populate("products.product").populate("deliveryBoy").populate("userId");
    }

    async getOrderById(orderId: string): Promise<IOrderDocument | null> {
        return await this.orderModel.findById(orderId).populate("products.product").populate("deliveryBoy").populate("userId");
    }

    async createOrder(order: Partial<IOrder>): Promise<IOrderDocument> {
        return await this.orderModel.create(order);
    }

    async updateOrder(orderId: string, order: UpdateQuery<IOrderDocument>): Promise<IOrderDocument | null> {
        return await this.orderModel.findByIdAndUpdate(orderId, order, { new: true });
    }


    async getDistintValues(userId: string, field: string): Promise<IOrderDocument[]> {
        return await this.orderModel.distinct(field, { userId });
    }


    async getOrderByStatus(status: string): Promise<IOrderDocument[]> {
        return await this.orderModel.find({ status }).populate("products.product").populate("deliveryBoy").populate("userId");
    }

    async getOderByDeliveryBoy(deliveryBoy: string): Promise<IOrderDocument[]> {
        return await this.orderModel.find({ deliveryBoy }).populate("products.product").populate("deliveryBoy").populate("userId");
    }

    async getOderByDeliveryBoyAndStatus(deliveryBoy: string, status: string): Promise<IOrderDocument[]> {
        return await this.orderModel.find({ deliveryBoy, status }).populate("products.product").populate("deliveryBoy").populate("userId");
    }


}

export default new OrderRepository();   