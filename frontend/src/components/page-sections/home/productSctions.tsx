import React from "react";
import ProductCarousel from "../../global/product-carousel";
import { IProduct } from "@/types";

interface ProductSctionsProps {
  title: string;
  products: IProduct[];
  isLoading: boolean;
}

const ProductSctions = ({ title, products, isLoading }: ProductSctionsProps) => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-center gap-4 mt-15 py-5 px-4">
      <h1 className="text-4xl text-center font-bold">{title}</h1>
      <ProductCarousel products={products} isLoading={isLoading} />
    </div>
  );
};

export default ProductSctions;
