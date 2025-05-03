import { ProductRepository } from "../../../infrastructure/db/repositories/product.repository";
import { IProduct, IProductDocument } from "../../../domain/interfaces/product.interface";
import { FilterQuery } from "mongoose";
import { CartRepository } from "../../../infrastructure/db/repositories/cart.repository";
import { RedisService } from "../../../infrastructure/redis/redis";
import { REDIS_KEYS } from "../../../shared/constants/redis.constant";
export class ProductUsecase {
    private readonly productRepository: ProductRepository;
    private readonly cartRepository: CartRepository;
    private readonly redisService: RedisService;

    constructor() {
        this.productRepository = new ProductRepository();
        this.cartRepository = new CartRepository();
        this.redisService = new RedisService();
    }

    async getAllProducts() {
        const cachedProducts = await this.redisService.get(REDIS_KEYS.PRODUCTS);
        if (cachedProducts) {
            console.log("Products fetched from cache");
            return JSON.parse(cachedProducts);
        }
        const products = await this.productRepository.findAll();
        await this.redisService.set(REDIS_KEYS.PRODUCTS, JSON.stringify(products), 60 * 60 * 24);
        return products;
    }

    async getProductById(id: string) {
        const cachedProduct = await this.redisService.get(REDIS_KEYS.PRODUCTS + id);
        if (cachedProduct) {
            return JSON.parse(cachedProduct);
        }
        const product = await this.productRepository.findById(id);
        await this.redisService.set(REDIS_KEYS.PRODUCTS + id, JSON.stringify(product), 60 * 60 * 24);
        return product;
    }

    async filterProducts(filter: FilterQuery<IProductDocument>, limit: number = 10, page: number = 1) {
        const cachedProducts = await this.redisService.get(REDIS_KEYS.PRODUCTS + filter.toString() + limit + page);
        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }
        const products = await this.productRepository.filterProducts(filter, limit, page);
        await this.redisService.set(REDIS_KEYS.PRODUCTS + filter.toString() + limit + page, JSON.stringify(products), 60 * 60 * 24);
        return products;
    }

    async searchProducts(query: string) {
        const cachedProducts = await this.redisService.get(REDIS_KEYS.PRODUCTS + query);
        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }
        const products = await this.productRepository.searchProducts(query);
        await this.redisService.set(REDIS_KEYS.PRODUCTS + query, JSON.stringify(products), 60 * 60 * 24);
        return products;
    }

    async getProductByCategory(category: string) {
        const cachedProducts = await this.redisService.get(REDIS_KEYS.PRODUCTS + category);
        if (cachedProducts) {
            
            return JSON.parse(cachedProducts);
        }
        const products = await this.productRepository.findByCategory(category);
        await this.redisService.set(REDIS_KEYS.PRODUCTS + category, JSON.stringify(products), 60 * 60 * 24);
        return products;
    }

    async getAvailableCategories() {
        const cachedCategories = await this.redisService.get(REDIS_KEYS.CATEGORIES);
        if (cachedCategories) {
            return JSON.parse(cachedCategories);
        }
        const categories = await this.productRepository.getCategories();
        await this.redisService.set(REDIS_KEYS.CATEGORIES, JSON.stringify(categories), 60 * 60 * 24);
        return categories;
    }



}

export default new ProductUsecase();
