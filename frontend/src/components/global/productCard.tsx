"use client";
import { cn } from "@/lib/utils";
import type { IProduct } from "@/types/IProduct";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@heroui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useAddtoCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const image =
    product.images?.length && product.images[0].startsWith("/")
      ? process.env.NEXT_PUBLIC_BACKEND_URL + product.images[0]
      : product.images[0];
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = async () => {
    try {
      await axios.get(image).then((res: any) => {
        setImageLoading(false);
      });
    } catch (error) {
      console.log(error);
      toast.error(`Error loading image of ${product.name}`);
    }
  };

  const { mutate, isPending } = useAddtoCart();
  const handleAddToCart = () => {
    mutate({ productId: product._id, size: product.sizes[0].size, quantity: 1 });
  };

  useEffect(() => {
    handleImageLoad();
  }, []);

  return (
    <div
      onClick={() => router.push(`/home/shop/${product._id}`)}
      className="bg-gray-200/50 shrink-0 hover:bg-gray-400/20 transition-all cursor-pointer hover:scale-95 duration-300 rounded-lg p-1 h-full flex flex-col"
    >
      <div className="relative mb-4 w-full aspect-square">
        {imageLoading ? (
          <Skeleton className="w-full bg-gray-400/30 h-full rounded-lg" />
        ) : (
          <Image
            src={image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>
      <div className="w-full p-1  grid grid-cols-2 gap-2">
        <div className="col-span-1">
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
            <span className="text-sm text-gray-600 ml-1">
              {product.rating}/5
            </span>
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
        <div className="col-span-1 flex items-center justify-end">
          <Button
            onPress={handleAddToCart}
            size="sm"
            className="bg-muted-foreground/30 cursor-pointer hover:bg-muted-foreground/50 transition-all duration-300 active:scale-95 border-muted-foreground/50 border rounded-full w-[3rem] h-[3rem] text-white"
          >
            <MdOutlineShoppingBag />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
