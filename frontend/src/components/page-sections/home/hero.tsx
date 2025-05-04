"use client";
import { heroItems } from "@/constants";
import { Button } from "@heroui/button";
import React from "react";
import CountDown from "../../animation/countDown";
import NumberCounter from "../../animation/counter";
import { motion } from "framer-motion";
import { item_variants } from "@/constants/framer-motion";
const Hero = () => {
  const text = "FIND CLOTHES THAT MATCHES YOUR STYLE";
  return (
    <div className=" relative grid md:grid-cols-2  w-full bg-[#F2F0F1]">
      <div className="flex md:py-0 py-10 flex-col gap-4 items-start px-5 md:px-20 justify-center">
        <motion.h1
          className="text-4xl md:text-4xl lg:text-6xl font-bold leading-tight"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          {text.split(" ").map((word, idx) => (
            <motion.span
              key={idx}
              className="inline-block mr-2"
              variants={item_variants}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={item_variants}
          className="text-gray-500 md:text-base text-sm w-[90%]"
        >
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={item_variants}
        >
          <Button className="bg-primary md:w-fit w-full px-7 text-white rounded-full cursor-pointer active:scale-95 transition-all duration-300">
            Shop Now
          </Button>
        </motion.div>
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
