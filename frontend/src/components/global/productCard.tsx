"use client";
import { cn } from "@/lib/utils";
import { IProduct } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "nextjs-toploader/app";

interface ProductCardProps {
    product: IProduct;
}






const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div onClick={() => router.push(`/home/shop/${product.id}`)} className="bg-gray-200/50 hover:bg-gray-400/20 transition-all cursor-pointer hover:scale-95 duration-300 rounded-lg p-1 h-full flex flex-col">
      <div className="relative mb-4 w-full aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
       
          className="object-cover rounded-lg"
        />
      </div>
      <h3 className="font-medium text-lg mb-2">{product.name}</h3>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={cn(
              "fill-current",
              i < Math.floor(product.rating)
                ? "text-yellow-400"
                : i < product.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">{product.rating}/5</span>
      </div>
      <div className="mt-auto flex items-center">
        <span className="font-bold text-lg">${product.price}</span>
        {product.discount > 0 && (
          <>
            <span className="text-gray-400 line-through ml-2">
              ${product.originalPrice}
            </span>
            <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded">
              -{product.discount}%
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
