"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const OrderDetailsSkeleton = () => {
  return (
    <div className="space-y-6 mt-5 animate-pulse px-4 md:px-8 py-6">
      {/* Top Section: Header + Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-36" /> {/* Back to Orders */}
          <Skeleton className="h-6 w-64" /> {/* Order ID */}
          <Skeleton className="h-4 w-32" /> {/* Placed on */}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 md:items-center">
          <Skeleton className="h-10 w-36 rounded-md" /> {/* Contact Support */}
          <Skeleton className="h-10 w-36 rounded-md" /> {/* Track Order */}
        </div>
      </div>

      {/* Order Progress */}
      <div className="p-4 rounded-xl border bg-muted overflow-x-auto">
        <div className="flex justify-between items-center gap-6 min-w-[500px] sm:min-w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Order Items and Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Items */}
        <div className="p-4 rounded-xl border bg-muted space-y-4">
          <Skeleton className="h-6 w-40" /> {/* Title */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-md" /> {/* Image */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>

        {/* Shipping Info */}
        <div className="p-4 rounded-xl border bg-muted space-y-4">
          <Skeleton className="h-6 w-48" /> {/* Title */}
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-3 w-48" />
            ))}
          </div>
          <Skeleton className="h-4 w-40" /> {/* Shipping method */}
          <Skeleton className="h-4 w-60" /> {/* Tracking number */}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsSkeleton;
