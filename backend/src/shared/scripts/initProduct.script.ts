import connectDB from "../../config/db.config";
import { ProductRepository } from "../../infrastructure/db/repositories/product.repository";

const data = [
    { name: 'Brown Shirt', description: 'Stylish brown shirt', price: 25, category: 'shirt', sizes: [{ size: 'M', stock: 10 }], images: ['/brown-shirt-0.webp', '/brown-shirt-1.webp', '/brown-shirt-2.webp'] },
    { name: 'Green Shirt', description: 'Comfortable green shirt', price: 20, category: 'shirt', sizes: [{ size: 'L', stock: 8 }], images: ['/green-shirt-0.webp', '/green-shirt-1.webp', '/green-shirt-2.webp'] },
    { name: 'Jacket', description: 'Warm and trendy jacket', price: 60, category: 'jacket', sizes: [{ size: 'XL', stock: 5 }], images: ['/jacket.webp'] },
    { name: 'Liquid - TShirt', description: 'Cool liquid style T-shirt', price: 30, category: 'tshirt', sizes: [{ size: 'M', stock: 12 }], images: ['/liquid-0.webp', '/liquid-1.webp'] },
    { name: 'Black Skull Pant', description: 'Edgy black skull pants', price: 40, category: 'pant', sizes: [{ size: '32', stock: 6 }], images: ['/pant-black.webp'] },
    { name: 'Gray Skull Pant', description: 'Gray pants with skull design', price: 42, category: 'pant', sizes: [{ size: '34', stock: 7 }], images: ['/pant-skull-0.webp', '/pant-skull-1.webp'] },
    { name: 'Pink Shirt', description: 'Bright pink shirt', price: 22, category: 'shirt', sizes: [{ size: 'S', stock: 9 }], images: ['/pink-shirt-0.webp', '/pink-shirt-1.webp'] },
    { name: 'Salty - TShirt', description: 'Salty slogan T-shirt', price: 28, category: 'tshirt', sizes: [{ size: 'M', stock: 11 }], images: ['/salty-0.webp', '/salty-1.webp', '/salty-2.webp'] },
    { name: 'Yellow Jacket', description: 'Bold yellow jacket', price: 65, category: 'jacket', sizes: [{ size: 'L', stock: 4 }], images: ['/yellow-jacket.webp'] },
];


const initProduct = async () => {
    const productRepository = new ProductRepository();
    const productList = await productRepository.findAll();
    if (productList.length > 0) {
        console.log("🎉 Products already initialized");
        return;
    }
    const products = await productRepository.createMany(data);
    console.log(products);
    console.log(products.length);
    console.log("🎉 Products initialized successfully");
}

export default initProduct;


