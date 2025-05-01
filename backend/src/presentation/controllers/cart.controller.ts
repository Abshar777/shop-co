import { NextFunction, Response } from 'express';
import { CartUsecase } from '../../application/usecases/cart/cart.usecase';
import { AuthRequest } from '../../domain/types/api';
import { statusCodes } from '../../shared/constants/api.constant';


/** @Controller */
export class CartController {
    private readonly cartUsecase: CartUsecase;

    constructor() {
        this.cartUsecase = new CartUsecase();
    }
    

    /**
     * @description Add product to cart
     * @Method POST
     * @Access PRIVATE
     * @Route /api/cart/add
     * @Body productId: string, size: string, quantity: number
     * @Response 200 - Product added to cart successfully
     * @Response 400 - Product id, size and quantity are required
     * @Response 500 - Internal server error
     */
    async addProductToCart(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const { productId, size, quantity } = req.body;
            const cart = await this.cartUsecase.addProductToCart(req.userId, productId, size, quantity);
            res.status(statusCodes.OK).json({ message: "Product added to cart successfully", cart });
        } catch (error: any) {
           next(error);
        }
    }

    /**
     * @description Remove product from cart
     * @Method DELETE
     * @Access PRIVATE
     * @Route /api/cart/remove
     * @Body productId: string, size: string
     * @Response 200 - Product removed from cart successfully
     * @Response 400 - Product id and size are required
     * @Response 500 - Internal server error
     */
    async removeProductFromCart(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const { productId, size } = req.body;
            const cart = await this.cartUsecase.removeProductFromCart(req.userId, productId, size);
            res.status(statusCodes.OK).json({ message: "Product removed from cart successfully", cart });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Get cart
     * @Method GET
     * @Access PRIVATE
     * @Route /api/cart
     * @Response 200 - Cart retrieved successfully
     * @Response 400 - Internal server error
     */
    async getCart(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const cart = await this.cartUsecase.getCart(req.userId);
            res.status(statusCodes.OK).json({ message: "Cart retrieved successfully", cart });
        } catch (error: any) {
            next(error);
        }
    }

    /**
     * @description Clear cart
     * @Method DELETE
     * @Access PRIVATE
     * @Route /api/cart/clear
     * @Response 200 - Cart cleared successfully
     * @Response 400 - Internal server error    
     */
    async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const cart = await this.cartUsecase.clearCart(req.userId);
            res.status(statusCodes.OK).json({ message: "Cart cleared successfully", cart });
        } catch (error: any) {  
            next(error);
        }
    }

    /**
     * @description Update cart item
     * @Method PUT
     * @Access PRIVATE
     * @Route /api/cart/update
     * @Body productId: string, size: string, quantity: number
     * @Response 200 - Cart item updated successfully
     * @Response 400 - Product id, size and quantity are required
     * @Response 500 - Internal server error
     */
    async updateCartItem(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const { productId, size, quantity } = req.body;
            const cart = await this.cartUsecase.updateCartItem(req.userId, productId, size, quantity);
            res.status(statusCodes.OK).json({ message: "Cart item updated successfully", cart });
        } catch (error: any) {
            next(error);
        }
    }

    /** 
     * @description Get cart total
     * @Method GET
     * @Access PRIVATE
     * @Route /api/cart/total
     * @Response 200 - Cart total retrieved successfully
     * @Response 400 - Internal server error
     */
    async getCartTotal(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            if (!req.userId) {
                throw new Error('User ID is required');
            }
            const total = await this.cartUsecase.getCartTotal(req.userId);
            res.status(statusCodes.OK).json({ message: "Cart total retrieved successfully", total });
        } catch (error: any) {
            next(error);
        }
    }


}   
