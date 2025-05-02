"use client";

import { useEffect, useState } from "react";
import { IMockProduct } from "@/constants/data";
import { ColorSelector } from "@/components/global/color-selector";
import { SizeSelector } from "@/components/global/size-selector";
import { QuantityPicker } from "@/components/global/quantity-picker";
import { StarRating } from "@/components/global/star-rating";
import { Button } from "@heroui/button";
import { IProduct } from "@/types/IProduct";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useUIStore } from "@/store/uiStore";
import { useAddtoCart } from "@/hooks/useCart";
import AnimatedButton from "@/components/animation/animatedButton";
interface ProductDetailsProps {
  product: IProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].size);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data: session } = useSession();
  const { setIsAuthModalOpen, setPreviewsFunction, previewsFunction } =
    useUIStore();
  const { mutate, isPending, isSuccess, error } = useAddtoCart();
  const handleAddToCart = () => {
    console.log("handleAddToCart");
    if (!session) {
      toast.error("Please login to add to cart");
      setIsAuthModalOpen(true);

     
      return;
    }
    mutate({ productId: product._id, size: selectedSize, quantity });
    toast.success("Added to cart");
    // Here you would typically dispatch an action to your cart state management
  };

  console.log("previewsFunction", previewsFunction);
  useEffect(() => {
    setSelectedSize(product.sizes[0].size);
  }, [product, id]);

  const addeDesc = (name: string) => {
    return `This  ${name} which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This  ${name} which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This  ${name} which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.This  ${name} which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.`;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl  ">{product.name}</h1>
        <div className="flex flex-wrap items-baseline gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-medium text-red-600">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="pt-1">
          <StarRating rating={product.rating} maxRating={5} />
        </div>
      </div>
      <div className="w-full h-1 border-input border-b"></div>
      <p className="text-muted-foreground">{addeDesc(product.name)}</p>

      <div className="w-full h-1 border-input border-b"></div>

      {/* stock avaible */}

      <SizeSelector
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />
      <div className="flex w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Stock Available</span>
          <span className="text-sm text-muted-foreground">{product.sizes.find(size => size.size === selectedSize)?.stock}</span>
        </div>
      </div>
      <div className="w-full h-1 border-input border-b"></div>
      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
        <QuantityPicker
          quantity={quantity}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrement={() => setQuantity((q) => q + 1)}
          max={product.sizes.find(size => size.size === selectedSize)?.stock}
          onQuantityChange={setQuantity}
        />
        {/* <Button
          onPress={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-xl active:scale-95 transition-all cursor-pointer sm:w-auto flex-1"
          size="lg"
        >
          Add to Cart
        </Button> */}
        <AnimatedButton
          text="Add to Cart"
          type="submit"
          isLoading={isPending}
          className="w-full bg-primary text-white py-3 text-sm font-normal rounded-xl active:scale-95 transition-all cursor-pointer sm:w-auto flex-1"
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
}
