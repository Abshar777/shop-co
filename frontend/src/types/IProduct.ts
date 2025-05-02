export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: ISize[];
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    rating: number;
    discount: number;
    originalPrice: number;
}


export interface ISize {
    stock: number;
    size: string;
}