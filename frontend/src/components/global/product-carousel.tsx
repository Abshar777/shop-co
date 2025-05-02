"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "./productCard";
import { IProduct } from "@/types";
import ProductCardSkeleton from "../loading/ProductCardSkeleton";
import { useRouter } from "nextjs-toploader/app";

// Product data

interface ProductCarouselProps {
  products: IProduct[];
  isLoading: boolean;
}
export default function ProductCarousel({
  products,
  isLoading,
}: ProductCarouselProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const getItemsPerView = () => {
    if (isMobile) return 1;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4; // Default for SSR
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(products.length / itemsPerView);

  return (
    <div className="relative">
      <Carousel
        className="  w-[90vw]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {!isLoading &&
            products.map((product) => (
              <CarouselItem
                key={product._id}
                className=" basis-1/2 shrink-0  lg:basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}

          {isLoading &&
            Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="shrink-0 basis-1/2 lg:basis-1/4"
              >
                <ProductCardSkeleton />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
      </Carousel>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => router.push("/home/shop")}
          variant="outline"
          className="rounded-full px-8 active:scale-95 transition-all duration-300"
        >
          View All
        </Button>
      </div>
    </div>
  );
}
