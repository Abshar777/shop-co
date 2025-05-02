"use client";

import { cn } from "@/lib/utils";
import { ISize } from "@/types/IProduct";



interface SizeSelectorProps {
  sizes: ISize[];
  selectedSize: string;
  onSelectSize: (sizeId: string) => void;
  className?: string;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-sm font-medium">Choose Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.size}
            className={cn(
              "flex py-2 cursor-pointer min-w-20 items-center justify-center rounded-full px-4 transition-all",
              selectedSize === size.size
                ? "bg-primary text-primary-foreground"
                : "bg-gray-300/60 text-secondary-foreground hover:scale-105 active:scale-95 transition-all duration-300"
            )}
            onClick={() => onSelectSize(size.size)}
          >
            {size.size}
          </button>
        ))}
      </div>
    </div>
  );
}