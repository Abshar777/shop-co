"use client";

import { cn } from "@/lib/utils";

export interface ColorOption {
  id: string;
  name: string;
  value: string;
  className?: string;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (colorId: string) => void;
  className?: string;
}

export function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
  className,
}: ColorSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h3 className="text-sm font-medium">Select Colors</h3>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            className={cn(
              "relative h-10 w-10 overflow-hidden rounded-full",
              color.className,
              selectedColor === color.id &&
                "ring-2 ring-primary ring-offset-2"
            )}
            style={{ backgroundColor: color.value }}
            onClick={() => onSelectColor(color.id)}
            aria-label={color.name}
          >
            {selectedColor === color.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}