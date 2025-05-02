"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useGetAvailableCategories } from "@/hooks/useProducts";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilterStore } from "@/store/filterStore";

export default function FilterSidebar() {
  const {
    categories: selectedCategories,
    priceRange: selectedPriceRange,
    sizes: selectedSizes,
    setCategories,
    setPriceRange,
    setSizes,
    resetFilters,
  } = useFilterStore();

  // Handle price change
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const toggleSize = (size: string) => {
    const newSizes = [...selectedSizes];
    if (newSizes.includes(size)) {
      newSizes.splice(newSizes.indexOf(size), 1);
    } else {
      newSizes.push(size);
    }
    setSizes(newSizes);
  };

  const toggleCategory = (category: string) => {
    const newCategories = [...selectedCategories];
    if (newCategories.includes(category)) {
      newCategories.splice(newCategories.indexOf(category), 1);
    } else {
      newCategories.push(category);
    }
    setCategories(newCategories);
  };

  const sizes = ["S", "M", "L", "XL", "XXL", "32", "34"];
  const { data, isPending: isCategoriesPending } = useGetAvailableCategories();
  const categories = data?.categories || [];

  return (
    <div className="w-full md:max-w-[300px] p-4 md:border-input border-transparent border md:mt-5 rounded-lg">
      <div className="flex items-center border-b border-border pb-2 justify-between mb-4">
        <h2 className="text-base font-medium">Filters</h2>
        <button className="text-gray-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.86009 8.28967 8 9.5 8C10.7103 8 11.7198 8.86009 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <Accordion
        className="w-full -mt-4"
        type="multiple"
        defaultValue={["categories"]}
      >
        <AccordionItem value="categories">
          <AccordionTrigger>
            <h3 className="text-base  text-primary font-medium">Categories</h3>
          </AccordionTrigger>
          {/* Categories */}
          <AccordionContent>
            {isCategoriesPending && (
              <div className="mb-2 w-full grid place-items-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            {!isCategoriesPending && (
              <div className="mb-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="py-2 border-b border-gray-100 flex items-center justify-between"
                  >
                    <span className="text-sm">{category}</span>
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-gray-400"
                    />
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Price */}
      <div className="mb-4">
        <Accordion
          className="w-full -mt-4"
          type="multiple"
          defaultValue={["price"]}
        >
          <AccordionItem value="price">
            <AccordionTrigger>
              <h3 className="text-base font-medium">Price</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4">
                <div className="px-1">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    min={0}
                    step={1}
                    onValueChange={handlePriceChange}
                    className="my-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">${selectedPriceRange[0]}</span>
                    <span className="text-sm">${selectedPriceRange[1]}</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Size */}
      <div className="mb-4">
        <Accordion
          className="w-full -mt-4"
          type="multiple"
          defaultValue={["size"]}
        >
          <AccordionItem value="size">
            <AccordionTrigger>
              <h3 className="text-base  text-primary font-medium">Size</h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className={cn(
                      "h-10 rounded-full cursor-pointer text-sm",
                      selectedSizes.includes(size)
                        ? "bg-black  text-white hover:bg-black hover:text-white"
                        : "bg-gray-100 border-input border text-gray-800  hover:bg-gray-200"
                    )}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Apply Button */}
      <Button
        className="w-full bg-black cursor-pointer text-white hover:bg-black/90 rounded-lg py-6 mt-2"
        onClick={resetFilters}
      >
        Remove Filters
      </Button>
    </div>
  );
}
