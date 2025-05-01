"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
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
              "relative aspect-square h-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
              selectedImage === index
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground/30"
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-muted">
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          fill
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
    </div>
  );
}
