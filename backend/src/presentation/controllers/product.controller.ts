import { NextFunction, Request, Response } from "express";
import { ProductUsecase } from "../../application/usecases/products/product.usecase";
import { statusCodes } from "../../shared/constants/api.constant";
import ProductModel from "../../infrastructure/db/models/product.model";

/** @Controller */
export class ProductController {
    private readonly productUsecase: ProductUsecase;

    constructor() {
        this.productUsecase = new ProductUsecase();
    }

    /**
     * @description Get all products
     * @Route /api/products
     * @Method GET
     * @Response 200 - Products fetched successfully
     * @Response 500 - Internal server error
     */
    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productUsecase.getAllProducts();
            res.status(statusCodes.OK).json({ message: "Products fetched successfully", products });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description Get product by id
     * @Route /api/products/:id
     * @Method GET
     * @Response 200 - Product fetched successfully
     * @Response 500 - Internal server error
     */
    async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await this.productUsecase.getProductById(req.params.id);
            if (!product) {
                return res.status(statusCodes.NOT_FOUND).json({ message: "Product not found" });
            }
            res.status(statusCodes.OK).json({ message: "Product fetched successfully", product });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description Search products
     * @Route /api/products/search
     * @Method GET
     * @Response 200 - Products fetched successfully
     * @Response 500 - Internal server error
     */
    async searchProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productUsecase.searchProducts(req.query.query as string);
            res.status(statusCodes.OK).json({ message: "Products fetched successfully", products });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description Get product by category
     * @Route /api/products/category/:category
     * @Method GET
     * @Response 200 - Products fetched successfully
     * @Response 500 - Internal server error
     */
    async getProductByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productUsecase.getProductByCategory(req.params.category);
            res.status(statusCodes.OK).json({ message: "Products fetched successfully", products });
        } catch (error) {
            next(error);
        }
    }


    /**
     * @description Get available categories
     * @Route /api/products/categories
     * @Method GET
     * @Response 200 - Categories fetched successfully
     * @Response 500 - Internal server error
     */
    async getAvailableCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.productUsecase.getAvailableCategories();
            console.log("categories", categories);
            res.status(statusCodes.OK).json({ message: "Categories fetched successfully", categories });
        } catch (error) {
            console.log("error on categories", error);
            next(error);
        }
    }

    /**
     * @description filter products
     * @Route /api/products/filter
     * @Method GET
     * @Response 200 - Products fetched successfully
     * @Response 500 - Internal server error
     */
    async filterProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const minPrice = Number(req.query.minPrice) || 0;
            const maxPrice = Number(req.query.maxPrice) || 1000000;
            const category = req.query.category;
            const size = req.query.size;
            const limit = Number(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
    
            const filter: any = {
                price: { $gte: minPrice, $lte: maxPrice },
            };
    
            if (category) {
                // support comma-separated categories
                filter.category = { $in: Array.isArray(category) ? category : (typeof category === 'string' ? category.split(',') : []) };
            }
    
            if (size) {
                filter.sizes = {
                    $elemMatch: {
                        size: { $in: Array.isArray(size) ? size : (typeof size === 'string' ? size.split(',') : []) },
                    }
                };
            }
    
            const products = await ProductModel.find(
                filter,
                {
                    _id: 1,
                    name: 1,
                    price: 1,
                    sizes: 1,
                    category: 1,
                    description: 1,
                    images: 1,
                    rating: 1,
                    isDelete: 1,
                    createdAt: 1,
                    updatedAt: 1,
                }
            )
            .limit(limit)
            .skip((page - 1) * limit);
    
            res.status(200).json({
                message: "Products fetched successfully",
                products,
            });
        } catch (error) {
            next(error);
        }
    }
    

}

export default new ProductController();
