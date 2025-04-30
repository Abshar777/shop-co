import { ProductRepository } from "../../../infrastructure/db/repositories/product.repository";
import { IProduct, IProductDocument } from "../../../domain/interfaces/product.interface";
import { FilterQuery } from "mongoose";
import { CartRepository } from "../../../infrastructure/db/repositories/cart.repository";

export class ProductUsecase {
    private readonly productRepository: ProductRepository;
    private readonly cartRepository: CartRepository;

    constructor() {
        this.productRepository = new ProductRepository();
        this.cartRepository = new CartRepository();
    }

    async getAllProducts() {
        return await this.productRepository.findAll();
    }

    async getProductById(id: string) {
        return await this.productRepository.findById(id);
    }

    async filterProducts(filter: FilterQuery<IProductDocument>, limit: number = 10, page: number = 1) {
        return await this.productRepository.filterProducts(filter, limit, page);
    }

    async searchProducts(query: string) {
        return await this.productRepository.searchProducts(query);
    }

    async getProductByCategory(category: string) {
        return await this.productRepository.findByCategory(category);
    }

    async getAvailableCategories() {
        return await this.productRepository.getCategories();
    }



}

export default new ProductUsecase();
