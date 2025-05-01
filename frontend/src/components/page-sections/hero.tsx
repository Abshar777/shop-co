"use client";
import { heroItems } from "@/constants";
import { Button } from "@heroui/button";
import React from "react";
import CountDown from "../animation/countDown";
import NumberCounter from "../animation/counter";
const Hero = () => {
  return (
    <div className=" relative grid md:grid-cols-2  w-full bg-[#F2F0F1]">
      <div className="flex md:py-0 py-10 flex-col gap-4 items-start px-5 md:px-20 justify-center">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold">
          FIND&nbsp;CLOTHES
          <br /> THAT&nbsp;MATCHES <br /> YOUR&nbsp;STYLE
        </h1>
        <p className="text-gray-500 md:text-base text-sm w-[90%]">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button className="bg-primary md:w-fit w-full px-7 text-white rounded-full cursor-pointer active:scale-95 transition-all duration-300">
          Shop Now
        </Button>
        <div className="flex  gap-4 items-start mt-10 justify-center">
          {heroItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="flex items-center gap-2 font-bold text-xl md:text-4xl">
                <NumberCounter
                  className="text-2xl md:text-4xl "
                  target={item.count}
                />
                +
              </p>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex relative  items-center justify-end md:px-10 px-0">
        <div className="w-full h-full overflow-hidden">
          <img
            src="/images/hero.jpeg"
            alt="hero"
            className="w-full object-cover h-full"
          />
          <div className="absolute top-0  w-full h-full">
            <div className="relative top-[50%] left-[10%] w-10 h-10 overflow-hidden">
              <img
                src="/star.svg"
                alt="hero"
                className="w-full object-cover h-full"
              />
            </div>
            <div className="relative top-[20%] left-[70%] w-20 h-20 overflow-hidden">
              <img
                src="/star.svg"
                alt="hero"
                className="w-full object-cover h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
