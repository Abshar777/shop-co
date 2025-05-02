"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MyOrdersSkeleton = () => {
  return (
    <div className="space-y-6 md:col-span-3 mt-5 w-full animate-pulse">
      {/* Header */}
      <div className="flex w-full justify-between items-center">
        <Skeleton className="h-8 w-40" /> {/* MY ORDERS */}
        <Skeleton className="h-6 w-32" /> {/* Continue Shopping */}
      </div>

      {/* Search + Tabs */}
      <div className="space-y-3 w-full">
        <Skeleton className="h-10 w-full rounded-md" /> {/* Search */}
        <div className="md:flex hidden gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-full" />
          ))}
        </div>
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 border rounded-xl bg-muted"
          >
            <div className="flex md:flex-row flex-col items-center gap-4">
              <Skeleton className="h-6 w-32" /> {/* Order ID */}
              <Skeleton className="h-6 w-24" /> {/* Date */}
            </div>
            <div className="flex md:flex-row flex-col items-center gap-4">
              <Skeleton className="h-4 w-16" /> {/* Items count */}
              <Skeleton className="h-6 w-20 rounded-full" /> {/* Status */}
              <Skeleton className="h-6 w-16" /> {/* Amount */}
              <Skeleton className="h-10 w-24 rounded-full" /> {/* View Order */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersSkeleton;
