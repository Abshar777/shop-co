"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  className,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => (
          <span key={i} className="text-xl text-yellow-400">
            {i < fullStars ? (
              "★"
            ) : i === fullStars && hasHalfStar ? (
              <span className="relative inline-block overflow-hidden">
                <span className="absolute text-yellow-400">★</span>
                <span
                  className="absolute text-yellow-400 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  ★
                </span>
              </span>
            ) : (
              "☆"
            )}
          </span>
        ))}
      </div>
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}/{maxRating}</span>
    </div>
  );
}