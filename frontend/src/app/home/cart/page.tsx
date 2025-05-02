"use client";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import React from "react";
import CartItems from "@/components/page-sections/cart/cartItems";
import { Button } from "@heroui/button";
import { useRouter } from "nextjs-toploader/app";
import { MdShoppingCart } from "react-icons/md";
import { useClearCart, useGetCart } from "@/hooks/useCart";
import CartPageSkeleton from "@/components/loading/CartPageSkeleton";
import AnimatedButton from "@/components/animation/animatedButton";
const page = () => {
  const router = useRouter();
  const { data: response, isLoading } = useGetCart();
  const { mutate: clearCart, isPending } = useClearCart();
  const cartItems = response?.cart?.items || [];
  const handleCheckout = () => {
    router.push("/home/cart/checkout");
  };
  return (
    <div className="w-full py-5 md:px-10 px-5">
      <Breadcrumbs />
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl mt-3 font-bold">Your Cart</h1>
        <AnimatedButton
          className="w-min text-xs rounded-md bg-gray-300/20 border-input border-1 text-muted-foreground"
          size="sm"
          isLoading={isPending}
          onClick={() => {
            clearCart({});
          }}
          text="Clear Cart"
        />
      </div>
      {isLoading ? (
        <CartPageSkeleton />
      ) : (
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          <div className="w-full md:col-span-2 bg-gray-300/10 rounded-lg h-min border-input border-1 py-7 mt-4 flex flex-col gap-4 md:px-4 px-2">
            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <div key={item.product._id + index + "cart"}>
                  <CartItems
                    product={item.product}
                    qty={item.quantity}
                    size={item.size}
                  />
                  {index < cartItems.length - 1 && (
                    <div className="w-full h-1 border-input border-b"></div>
                  )}
                </div>
              ))}
            {cartItems.length === 0 && (
              <div className="w-full flex items-center justify-center h-full">
                <p className="text-muted-foreground flex items-center gap-2">
                  No items in cart{" "}
                  <span className="">
                    <MdShoppingCart />
                  </span>
                </p>
              </div>
            )}
          </div>
          <div className="w-full rounded-lg bg-gray-300/10 border-input border-1 py-7 mt-4 flex flex-col gap-4 md:px-4 px-2">
            <div className="w-full">
              <p className="text-lg font-medium border-b border-dashed">
                Cart Summary
              </p>

              <div className="flex mt-2 flex-col gap-2">
                <div className="w-full  flex items-center text-muted-foreground justify-between">
                  <p className="text-lg text-muted-foreground font-medium">
                    Subtotal
                  </p>
                  <p className="text-lg text-muted-foreground font-medium">
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between">
                  <p className="text-lg text-muted-foreground font-medium">
                    Shipping
                  </p>
                  <p className="text-lg text-muted-foreground font-medium">
                    Free
                  </p>
                </div>
                <div className="w-full mt-3 border-t border-b border-dashed flex items-center justify-between">
                  <p className="text-lg  font-medium">Total</p>
                  <p className="text-lg   font-medium">
                    $
                    {cartItems.reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )}
                  </p>
                </div>
                <Button
                  onPress={() => {
                    if (cartItems.length > 0) {
                      handleCheckout();
                    } else {
                      router.push("/home/shop");
                    }
                  }}
                  className="w-full active:scale-95 transition-all duration-300 hover:bg-primary/90 cursor-pointer mt-3 bg-primary text-white rounded-lg  "
                >
                  {cartItems.length > 0 ? "Checkout" : "Go to shop"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
