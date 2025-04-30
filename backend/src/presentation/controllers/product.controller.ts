import { NextFunction, Request, Response } from "express";
import { ProductUsecase } from "../../application/usecases/products/product.usecase";
import { statusCodes } from "../../shared/constants/api.constant";

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
            res.status(statusCodes.OK).json(products);
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
            res.status(statusCodes.OK).json(product);
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
            res.status(statusCodes.OK).json(products);
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
            res.status(statusCodes.OK).json(products);
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
            res.status(statusCodes.OK).json(categories);
        } catch (error) {
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
            const filterQuery = {
                minPrice: req.query.minPrice || 0,
                maxPrice: req.query.maxPrice || 1000000,
                category: req.query.category || "",
                brand: req.query.brand || "",
                color: req.query.color || "",
                size: req.query.size || "",
                material: req.query.material || "",
            }
            const products = await this.productUsecase.filterProducts({
                price: {
                    $gte: filterQuery.minPrice,
                    $lte: filterQuery.maxPrice,
                },
                category: filterQuery.category,
                sizes: {
                    $elemMatch: {
                        size: filterQuery.size,
                    },
                    stock: {
                        $gt: 0,
                    },

                },
            }, Number(req.query.limit || 10), Number(req.query.page || 1));
            res.status(statusCodes.OK).json(products);
        } catch (error) {
            next(error);
        }
    }

}

export default new ProductController();
