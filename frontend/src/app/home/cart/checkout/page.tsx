"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import React from "react";
import { cartItems } from "@/constants/data";
import { Button } from "@heroui/button";
import { useRouter } from "nextjs-toploader/app";
import AddressForm from "@/components/forms/addressForm";
import { useGetCart } from "@/hooks/useCart";
import AnimatedButton from "@/components/animation/animatedButton";
import { toast } from "sonner";
import { useOrder } from "@/hooks/useOrder";
const page = () => {
  const { form, onFormSubmit, control, errors, formRef, handleCheckout } = useOrder();
  const router = useRouter();
 
  const { data: response, isLoading } = useGetCart();
  const cartItems = response?.cart?.items || [];

  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      <h1 className="text-4xl mt-3 font-bold">Checkout</h1>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        <div className="w-full col-span-2 rounded-lg bg-gray-300/10 border-input border-1 h-min py-4 px-4 mt-4">
          <AddressForm
            form={form}
            onFormSubmit={onFormSubmit}
            control={control}
            errors={errors}
            formRef={formRef as any}
          />
        </div>
        <div className="w-full rounded-lg bg-gray-300/10 border-input border-1 py-7 mt-4 flex flex-col gap-4 md:px-4 px-2">
          <div className="w-full">
            <p className="text-xl font-medium border-b border-dashed">
              Order Summary
            </p>

            <div className="w-full border-b border-dashed flex flex-col gap-2">
              <p className="text-lg text-primary/80 mt-2 font-medium border-b border-dashed">
                Items
              </p>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex flex-col pb-2">
                    <p className="text-base text-muted-foreground font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      ${item.product.price}x{item.quantity}
                    </p>
                  </div>
                  <p className="text-base text-muted-foreground font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex mt-4 flex-col gap-2">
              <div className="w-full  flex items-center text-primary/90 justify-between">
                <p className="text-lg  font-medium">Subtotal</p>
                <p className="text-lg  font-medium">
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="w-full flex items-center text-primary/90 justify-between">
                <p className="text-lg  font-medium">Shipping</p>
                <p className="text-lg  font-medium">Free</p>
              </div>
              <div className="w-full flex flex-col">
                <p className="text-lg  font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground font-medium">
                  Cash on Delivery
                </p>
              </div>
              <div className="w-full mt-3 border-t border-b border-dashed flex items-center justify-between">
                <p className="text-xl  font-medium">Total</p>
                <p className="text-lg   font-medium">
                  $
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>

              <AnimatedButton
                disabled={cartItems.length === 0 || isLoading}
                className="w-full hover:bg-primary/90 cursor-pointer mt-3 bg-primary text-white rounded-lg  "
                isLoading={isLoading}
                loadingText="Checking out..."
                onClick={() => {
                  if (cartItems.length > 0) {
                    handleCheckout();
                  } else {
                    toast.error("No items in cart", {
                      description: "Please add some items to your cart",
                    });
                    router.push("/home/shop");
                  }
                }}
                text={cartItems.length > 0 ? "Checkout" : "No items in cart"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
