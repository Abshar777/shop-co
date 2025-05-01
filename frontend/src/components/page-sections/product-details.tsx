"use client";

import { useState } from "react";
import { IMockProduct } from "@/constants/data";
import { ColorSelector } from "@/components/global/color-selector";
import { SizeSelector } from "@/components/global/size-selector";
import { QuantityPicker } from "@/components/global/quantity-picker";
import { StarRating } from "@/components/global/star-rating";
import { Button } from "@heroui/button";

interface ProductDetailsProps {
  product: IMockProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].id);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2].id); // Large is selected by default
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    // Here you would typically dispatch an action to your cart state management
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
          {product.discountPercentage && (
            <span className="rounded-md bg-red-100 px-2 py-0.5 text-sm font-medium text-red-600">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
        <div className="pt-1">
          <StarRating rating={product.rating} maxRating={product.maxRating} />
        </div>
      </div>
      <div className="w-full h-1 border-input border-b"></div>
      <p className="text-muted-foreground">{product.description}</p>

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
          <span className="text-sm text-muted-foreground">10</span>
        </div>
      </div>
      <div className="w-full h-1 border-input border-b"></div>
      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
        <QuantityPicker
          quantity={quantity}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
          onIncrement={() => setQuantity((q) => q + 1)}
          onQuantityChange={setQuantity}
        />
        <Button
          onPress={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-xl active:scale-95 transition-all cursor-pointer sm:w-auto flex-1"
          size="lg"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
