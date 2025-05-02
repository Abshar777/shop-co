"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-gray-200/50 rounded-lg p-1 h-full flex flex-col">
      <div className="relative mb-4 w-full aspect-square">
        <Skeleton className="h-full bg-gray-400/30 w-full absolute inset-0 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-3/4 bg-gray-400/30 mb-2 rounded" />
      <div className="flex items-center mb-2 space-x-1">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-4 bg-gray-400/30 rounded-full" />
        ))}
        <Skeleton className="h-4 w-10 ml-1 bg-gray-400/30" />
      </div>
      <div className="mt-auto flex items-center space-x-2">
        <Skeleton className="h-6 w-12 bg-gray-400/30 rounded" />
        <Skeleton className="h-4 w-10 bg-gray-400/30 rounded" />
        <Skeleton className="h-5 w-10 bg-gray-400/30 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
