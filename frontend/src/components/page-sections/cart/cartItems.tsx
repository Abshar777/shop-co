"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { QuantityPicker } from "../../global/quantity-picker";
import { FaTrashAlt } from "react-icons/fa";
import { IProduct } from "@/types";
import { useAddtoCart, useRemoveFromCart } from "@/hooks/useCart";

interface CartItemsProps {
  product: IProduct;
  qty: number;
  size: string;
}

const CartItems = ({ product, qty, size }: CartItemsProps) => {
  const [quantity, setQuantity] = useState(qty);
  const [disabled, setDisabled] = useState(false);
  const { mutate: cartUpdate, isPending } = useAddtoCart("update");
  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveFromCart();
  useEffect(() => {
    setDisabled(isPending);
  }, [isPending]);
  const handleQuantityChange = (qty: number) => {
    cartUpdate({
      productId: product._id,
      size: size,
      quantity: qty,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart({
      productId: product._id,
      size: size,
    });
  };
  return (
    <div className="w-full flex items-center ">
      <div className="flex flex-1  w-full items-center gap-2">
        <div className="w-[5rem] h-[5rem] bg-zinc-700  rounded-lg overflow-hidden">
          <img
            src={process.env.NEXT_PUBLIC_BACKEND_URL + product.images[0]}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="flex  flex-col gap-1">
          <p className="  font-semibold">{product.name}</p>
          <p className="text-sm font-medium">
            Size: <span className="font-normal text-zinc-500">{size}</span>
          </p>
          <p className="text-base font-medium">${product.price}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex  flex-row  h-full gap-2 items-end md:justify-between justify-end">
          <QuantityPicker
            disabled={disabled}
            quantity={quantity}
            onDecrement={() => {
              setQuantity((q) => Math.max(1, q - 1));
              handleQuantityChange(quantity - 1);
            }}
            onIncrement={() => {
              setQuantity((q) => q + 1);
              handleQuantityChange(quantity + 1);
            }}
            min={1}
            max={product.sizes.find((e) => e.size === size)?.stock as number}
            onQuantityChange={handleQuantityChange}
            className="md:w-auto w-1/2"
          />
          <Button
            variant="outline"
            className="py-6 md:text-base text-xs px-6 hover:text-red-800 active:scale-95 transition-all duration-300 cursor-pointer"
            size="icon"
            onClick={handleRemoveFromCart}
          >
            <FaTrashAlt />
          </Button>
        </div>
        <div className="w-full mt-1 flex items-center justify-end">
          <p className="text-sm font-medium">
            Total:{" "}
            <span className="font-normal text-zinc-500">
              ${product.price * quantity}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
