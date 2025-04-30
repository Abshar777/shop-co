// infrastructure/database/models/OrderModel.ts
import mongoose, { Schema } from 'mongoose';
import { IOrderDocument } from '../../../domain/interfaces/order.interface';

const OrderedProductSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false }
);


const OrderSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        products: [OrderedProductSchema],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            enum: ['COD', 'ONLINE'],
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['PENDING', 'PAID', 'FAILED'],
            default: 'PENDING',
        },
        orderStatus: {
            type: String,
            enum: ['PLACED', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PLACED',
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: 'Address',
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const OrderModel = mongoose.model<IOrderDocument>('Order', OrderSchema);

export default OrderModel;
