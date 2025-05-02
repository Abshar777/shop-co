"use client";
import React, { useState } from "react";
import AnimatedButton from "../animation/animatedButton";
import { Input } from "../ui/input";
import { Button } from "@heroui/button";
import { toast } from "sonner";

const Cta = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    setEmail("");
    toast.success("Email subscribed successfully", {
      description: "You will receive our latest offers and news in your inbox",
    });
  };
  return (
    <div className="w-full transform translate-y-10 grid place-items-center">
      <div className="w-[90%] md:w-[70%] rounded-lg bg-black px-4 py-7 grid md:grid-cols-2 ">
        <div className="flex flex-col justify-center gap-2 md:px-10 px-4">
          <h1 className="text-white text-3xl ">
            stay upto to date about our latest offers
          </h1>
        </div>
        <div className="flex md:mt-0 md:px-0 px-4 mt-10 flex-col items-center justify-center gap-2">
          <Input
            value={email}
            onChange={handleChange}
            type="text"
            placeholder="Enter your email"
            className="w-full bg-white md:text-base text-sm  p-2 rounded-md"
          />
          <Button
            onPress={handleSubmit}
            size="sm"
            className="w-full text-black/70 text-sm capitalize py-5 cursor-pointer hover:bg-gray-100 active:scale-95 transition-all duration-300 font-medium  rounded-lg bg-white "
          >
            <p>Subscribe to our newsletter</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cta;
