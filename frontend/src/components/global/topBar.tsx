"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "Free shipping on all orders over $100 🎉",
  "New arrivals just dropped 🔥",
  "Sign up and get 10% off your first order 🎁",
];

const TopBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary relative overflow-hidden w-full py-1 text-sm text-white grid place-items-center  h-[30px]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{

            type: "spring",
            stiffness: 100,
          }}
          className="absolute"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default TopBar;
