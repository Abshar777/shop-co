"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const CartPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-6 animate-pulse">
      {/* Cart items */}
      <div className="md:col-span-2 flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center p-4 border rounded-xl bg-muted">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-xl" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" /> {/* Product name */}
                <Skeleton className="h-4 w-16" /> {/* Size */}
                <Skeleton className="h-4 w-20" /> {/* Price */}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24 rounded" /> {/* Quantity buttons */}
              <Skeleton className="h-10 w-10 rounded-full" /> {/* Delete button */}
              <Skeleton className="h-4 w-20" /> {/* Total */}
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="border rounded-xl p-6 bg-muted space-y-4 h-fit">
        <Skeleton className="h-6 w-32" /> {/* Cart Summary title */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between font-semibold">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-12 w-full rounded-full" /> {/* Checkout button */}
      </div>
    </div>
  );
};

export default CartPageSkeleton;
