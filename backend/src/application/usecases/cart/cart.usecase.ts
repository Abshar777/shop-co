import { Types } from "mongoose";
import { CartRepository } from "../../../infrastructure/db/repositories/cart.repository";
import { ProductRepository } from "../../../infrastructure/db/repositories/product.repository";
import { IProduct } from "../../../domain/interfaces/product.interface";
export class CartUsecase {
    private readonly cartRepository: CartRepository;
    private readonly productRepository: ProductRepository;

    constructor() {
        this.cartRepository = new CartRepository();
        this.productRepository = new ProductRepository();
    }

    async addProductToCart(userId: string, productId: Types.ObjectId, size: string, quantity: number) {
        const product = await this.productRepository.findById(productId as unknown as string);
        if (!product) {
            throw new Error("Product not found");
        }
        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        const productExist = cart.items.find((item) => item.product.toString() === productId.toString() && item.size === size);
        if (productExist) {
            productExist.quantity += quantity;
        } else {
            cart.items.push({ product: product, size, quantity });
        }
        return await cart.save();
    }

    async removeProductFromCart(userId: string, productId: Types.ObjectId, size: string) {
        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId.toString() || item.size !== size);
        return await cart.save();
    }

    async getCart(userId: string) {
        return await this.cartRepository.getCartByUserId(userId);
    }

    async clearCart(userId: string) {
        return await this.cartRepository.clearCart(userId);
    }

    async updateCartItem(userId: string, productId: Types.ObjectId, size: string, quantity: number) {
        const cart = await this.cartRepository.getCartByUserId(userId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        cart.items = cart.items.map((item) => item.product.toString() === productId.toString() && item.size === size ? { ...item, quantity } : item);
        return await cart.save();
    }

    async getCartTotal(userId: string) {
        const cart = await this.cartRepository.getCartByUserId(userId);
        return cart?.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    }
}   

export default new CartUsecase();