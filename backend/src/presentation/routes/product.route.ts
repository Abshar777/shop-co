import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router = Router();



router.get("/", ProductController.getAllProducts.bind(ProductController));

router.get("/search", ProductController.searchProducts.bind(ProductController));

router.get("/category/:category", ProductController.getProductByCategory.bind(ProductController));

router.get("/categories", ProductController.getAvailableCategories.bind(ProductController));

router.get("/filter", ProductController.filterProducts.bind(ProductController));


router.get("/:id", ProductController.getProductById.bind(ProductController));




export default router;
