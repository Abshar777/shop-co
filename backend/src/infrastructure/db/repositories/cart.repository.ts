import { ICartDocument } from "../../../domain/interfaces/cart.interface";
import { ICart } from "../../../domain/interfaces/cart.interface";
import CartModel from "../models/cart.model";

export class CartRepository {
    async createCart(cart: ICart): Promise<ICartDocument> {
        return await CartModel.create(cart);
    }

    async upsertCart(cart: ICart): Promise<ICartDocument> {
        return await CartModel.findOneAndUpdate({ userId: cart.userId }, cart, { upsert: true, new: true }).populate('items.product');
    }

    async getCartByUserId(userId: string): Promise<ICartDocument | null> {
        return await CartModel.findOne({ userId }).populate('items.product');
    }

    async clearCart(userId: string): Promise<ICartDocument | null> {
        return await CartModel.findOneAndUpdate({ userId }, { items: [] }, { new: true }).populate('items.product');
    }
}

export default new CartRepository();