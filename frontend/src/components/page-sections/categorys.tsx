import React from "react";

const Categorys = () => {
  const categories = [
    {
      id: 1,
      name: "Category 1",
      image: "/images/category1.jpg",
    },
    {
      id: 2,
      name: "Category 2",
      image: "/images/category2.jpg",
    },
    {
      id: 3,
      name: "Category 3",
      image: "/images/category3.jpg",
    },
    {
      id: 4,
      name: "Category 4",
      image: "/images/category4.jpg",
    },
  ];
  return (
    <div className="w-full py-10 grid place-items-center">
      <div className="md:w-[70%] w-[90%] rounded-lg bg-gray-300/30 p-4">
        <h1 className="text-4xl text-center font-bold">Categories</h1>
        <div className="grid mt-5 md:grid-cols-3 grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={` md:h-[15rem] h-[10rem] w-full rounded-lg bg-zinc-600/10 ${
                index % 3 === 0 ? "md:col-span-2" : "md:col-span-1"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorys;
