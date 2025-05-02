"use client";
import { useFilterStore } from "@/store/filterStore";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";

import React from "react";

const Categorys = () => {
  const categories = [
    {
      id: 1,
      name: "jacket",
      image: "/images/jacket.jpg",
    },
    {
      id: 2,
      name: "pant",
      image: "/images/pants.jpg",
    },
    {
      id: 3,
      name: "shirt",
      image: "/images/shirt.jpg",
    },
    {
      id: 4,
      name: "tshirt",
      image: "/images/tshirt.jpg",
    },
  ];
  const router = useRouter();
  const { setCategories } = useFilterStore();
  const handleCategoryClick = (category: string) => {
    setCategories([category]);
    router.push(`/home/shop`);
  };
  return (
    <div className="w-full py-10 grid place-items-center">
      <div className="md:w-[70%] w-[90%] rounded-lg bg-gray-300/30 p-4">
        <h1 className="text-4xl text-center font-bold">Categories</h1>
        <div className="grid mt-5 md:grid-cols-3 grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={` md:h-[15rem] cursor-pointer hover:scale-95 transition-all duration-300 overflow-hidden h-[10rem] w-full rounded-lg bg-zinc-600/10 ${
                index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative w-full h-full">
                <img
                  className="object-cover w-full h-full"
                  src={category.image}
                  alt={category.name}
                />
                <h1 className="absolute bottom-1 left-2 text-white text-2xl font-bold">
                  {category.name}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorys;
