import { Breadcrumbs } from "@/components/global/breadcrumb";
import { ProductDetails } from "@/components/page-sections/shop/product-details";
import { ProductGallery } from "@/components/page-sections/shop/product-gallery";
import ProductSctions from "@/components/page-sections/home/productSctions";
import { mockProduct, products } from "@/constants/data";
import React from "react";

const page = () => {
  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      <div className="grid border-b border-input pb-5 grid-cols-1 gap-2 mt-5 md:grid-cols-2 lg:gap-12">
        <div className="w-full  mx-auto md:mx-0">
          <ProductGallery images={mockProduct.images} />
        </div>
        <div className="w-full max-w-[600px] mx-auto md:mx-0">
          <ProductDetails product={mockProduct} />
        </div>
      </div>
      <ProductSctions title="Related Products" products={products} />
    </div>
  );
};

export default page;
