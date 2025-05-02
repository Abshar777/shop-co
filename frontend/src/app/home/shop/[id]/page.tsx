"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import { ProductDetails } from "@/components/page-sections/shop/product-details";
import { ProductGallery } from "@/components/page-sections/shop/product-gallery";
import ProductSctions from "@/components/page-sections/home/productSctions";
import { mockProduct, products } from "@/constants/data";
import React, { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import ProductDetailSkeleton from "@/components/loading/ProductDetailSkeleton";
import { IProduct } from "@/types/IProduct";
const page = () => {
  const { id } = useParams();
  const { data, isPending } = useProducts(id as string);
  const { data: productsData, isPending: isProductsPending } = useProducts();
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const product = data?.product as IProduct;
  const products = productsData?.products || [];
  useEffect(() => {
    setRelatedProducts(products.filter((product) => product._id !== id).reverse().slice(0, 6));
  }, [products, id]);



    
  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      {isPending && <ProductDetailSkeleton />}
      {!isPending && product && (
        <div className="grid border-b border-input pb-5 grid-cols-1 gap-2 mt-5 md:grid-cols-2 lg:gap-12">
          <div className="w-full  mx-auto md:mx-0">
            <ProductGallery images={product.images} />
          </div>
          <div className="w-full max-w-[600px] mx-auto md:mx-0">
            <ProductDetails product={product} />
          </div>
        </div>
      )}

      <ProductSctions isLoading={isProductsPending} title="Related Products" products={relatedProducts} />
    </div>
  );
};

export default page;
