"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import React from "react";
import { cartItems } from "@/constants/data";
import { Button } from "@heroui/button";
import { useRouter } from "nextjs-toploader/app";
import AddressForm from "@/components/forms/addressForm";
const page = () => {
  const router = useRouter();
  const handleCheckout = () => {
    router.push("/home/cart/checkout");
  };

  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      <h1 className="text-4xl mt-3 font-bold">Order Confirmation</h1>
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        <div className="w-full col-span-2 rounded-lg bg-gray-300/10 border-input border-1 py-4 px-4 mt-4">
         
          <AddressForm />
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
                      {item.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      ${item.price}x{item.quantity}
                    </p>
                  </div>
                  <p className="text-base text-muted-foreground font-medium">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex mt-4 flex-col gap-2">
              <div className="w-full  flex items-center text-primary/90 justify-between">
                <p className="text-lg  font-medium">Subtotal</p>
                <p className="text-lg  font-medium">
                  ${cartItems.reduce((acc, item) => acc + item.price, 0)}
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
                  ${cartItems.reduce((acc, item) => acc + item.price, 0)}
                </p>
              </div>
              <Button
                onPress={handleCheckout}
                className="w-full active:scale-95 transition-all duration-300 hover:bg-primary/90 cursor-pointer mt-3 bg-primary text-white rounded-lg  "
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
