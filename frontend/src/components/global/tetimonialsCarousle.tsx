"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCard from "./productCard";
import { Testimonial } from "@/types";

// Product data

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

const renderStars = (count: number) => {
  return Array(count)
    .fill(0)
    .map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-yellow-400 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
      </svg>
    ));
};

export default function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const isMobile = useIsMobile();

  const getItemsPerView = () => {
    if (isMobile) return 1;
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 4;
    }
    return 4; // Default for SSR
  };

  const itemsPerView = getItemsPerView();
  const totalSlides = Math.ceil(testimonials.length / itemsPerView);

  return (
    <div className="relative">
      <Carousel
        className="md:w-full w-[90vw]"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className=" basis-1/1 md:basis-1/2 lg:basis-1/4"
            >
              <Card
                key={testimonial.id}
                className="border border-gray-100 shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex mb-2">
                    {renderStars(testimonial.stars)}
                  </div>
                  <div className="flex items-center mb-3">
                    <h3 className="text-lg font-semibold">
                      {testimonial.name}
                    </h3>
                    {testimonial.verified && (
                      <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
      </Carousel>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" className="rounded-full px-8">
          View All
        </Button>
      </div>
    </div>
  );
}
