"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 mt-5 gap-6 animate-pulse">
      {/* Left side - Images */}
      <div className="md:col-span-2 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          {/* Thumbnail list */}
          <div className="flex md:flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-lg" />
            ))}
          </div>
          {/* Main image */}
          <Skeleton className="w-full aspect-square rounded-xl" />
        </div>
      </div>

      {/* Right side - Details */}
      <div className="md:col-span-3 flex flex-col gap-4">
        <Skeleton className="h-8 w-3/4 rounded" /> {/* Title */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-10" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
          <Skeleton className="h-4 w-10" />
        </div>
        {/* Description */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
        {/* Sizes */}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <div className="flex gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-20 rounded-full" />
            ))}
          </div>
        </div>
        {/* Stock */}
        <Skeleton className="h-4 w-32" />
        {/* Quantity and Button */}
        <div className="flex items-center gap-4 mt-4">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
