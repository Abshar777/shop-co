"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex md:flex-row flex-col-reverse gap-4">
      <div className="flex gap-2 md:flex-col  overflow-x-auto py-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative cursor-pointer aspect-square h-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
              selectedImage === index
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/30"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`}
              alt={image}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-400/30">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${images[selectedImage]}`}
          alt={images[selectedImage]}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
    </div>
  );
}
