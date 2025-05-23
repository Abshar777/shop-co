"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import { products } from "@/constants/data";
import ProductCard from "@/components/global/productCard";
import { PaginationDemo } from "@/components/global/pagination";
import { CgOptions } from "react-icons/cg";
import { Button } from "@heroui/button";
import FilterSidebar from "@/components/page-sections/shop/filterSidbar";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Suspense } from "react";
import { useFilterProducts, useProducts } from "@/hooks/useProducts";
import ProductCardSkeleton from "@/components/loading/ProductCardSkeleton";
import { motion } from "framer-motion";
import { container_variants, item_variants } from "@/constants/framer-motion";
const page = () => {
  const { data, isPending } = useFilterProducts();
  const products = data?.products || [];
  return (
    <div
    
      className="w-full py-5 md:px-8 px-5"
    >
      <Breadcrumbs />
      <div className="w-full grid md:mt-0 mt-5 grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:block hidden">
          <FilterSidebar />
        </div>
        <div className="md:col-span-3 flex flex-col gap-5 col-span-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                {products?.length || 0}&nbsp;products&nbsp;found
              </p>
              <Drawer>
                <DrawerTrigger className="bg-gray-300/30 md:hidden flex cursor-pointer rounded-full hover:scale-105 transition-all duration-300 border-input border-1 p-1">
                  <CgOptions className="rotate-90" />
                </DrawerTrigger>
                <DrawerTitle className="hidden">Filters</DrawerTitle>
                <DrawerContent>
                  <ScrollArea className="h-[calc(100vh-10rem)]">
                    <FilterSidebar />
                  </ScrollArea>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          <motion.div
            variants={container_variants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-4 grid-cols-2 gap-5"
          >
            {!isPending &&
              products.length > 0 &&
              products.map((product, index) => (
                <motion.div
                  variants={item_variants}
                  key={product._id + "product"}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            {isPending &&
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index + "skeleton"} />
              ))}
            {products.length === 0 && !isPending && (
              <div className="col-span-4 md:h-[90vh] flex flex-col justify-center items-center ">
                <div className="md:w-[30rem] overflow-hidden">
                  <img
                    src="/noData.png"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </motion.div>
          <div className="w-full border-t border-border pt-5">
            <Suspense fallback={<div>Loading...</div>}>
              <PaginationDemo
                totalPages={10}
                currentPage={1}
                onPageChange={() => {}}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
