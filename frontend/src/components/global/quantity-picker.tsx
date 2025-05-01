"use client";

import { cn } from "@/lib/utils";

interface QuantityPickerProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onQuantityChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityPicker({
  quantity,
  onDecrement,
  onIncrement,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}: QuantityPickerProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      onQuantityChange(min);
    } else {
      onQuantityChange(Math.max(min, Math.min(max, value)));
    }
  };

  return (
    <div
      className={cn(
        "flex h-12 md:max-w-[120px] bg-gray-300/20  w-fullitems-center rounded-md border",
        className
      )}
    >
      <button
        type="button"
        className="flex h-full w-12 items-center justify-center text-lg transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        onClick={onDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <span className="sr-only">Decrease quantity</span>−
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className="h-full w-full border-none bg-transparent text-center text-base focus:outline-none focus:ring-0"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Quantity"
      />

      <button
        type="button"
        className="flex h-full w-12 items-center justify-center text-lg transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
        onClick={onIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <span className="sr-only">Increase quantity</span>+
      </button>
    </div>
  );
}