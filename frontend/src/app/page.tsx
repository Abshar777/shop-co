"use client";

import Hero from "@/components/page-sections/home/hero";
import Marque from "@/components/page-sections/home/marque";
import ProductSctions from "@/components/page-sections/home/productSctions";
import { testimonials } from "@/constants/data";
import Categorys from "@/components/page-sections/home/categorys";
import Testimonials from "@/components/page-sections/home/testimonials";
import { useProducts } from "@/hooks/useProducts";
import { useEffect } from "react";
import { useState } from "react";
import { IProduct } from "@/types/IProduct";
export default function Home() {
  const { data, isPending } = useProducts();
  const products = data?.products || [];

  return (
    <>
      <Hero />
      <Marque />
    {  <ProductSctions
        isLoading={isPending}
        title="Featured Products"
        products={products.slice(0, 5)}
      />}
      <ProductSctions
        isLoading={isPending}
        title="Top Selling Products"
        products={products.slice(5, 10)}
      />
      <Categorys />
      <Testimonials title="Testimonials" testimonials={testimonials} />
    </>
  );
}
