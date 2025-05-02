import React from "react";
import TestimonialsCarousel from "../../global/tetimonialsCarousle";
import { Testimonial } from "@/types";

interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}

const Testimonials = ({ title, testimonials }: TestimonialsProps) => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-center gap-4 mt-15 py-5 px-4">
      <h1 className="text-4xl text-center font-bold">{title}</h1>
      <TestimonialsCarousel testimonials={testimonials} />
    </div>
  );
};

export default Testimonials;
