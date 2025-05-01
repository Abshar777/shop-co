"use client";
import { useEffect } from "react";
import { useSpring, useTransform, motion } from "framer-motion";

export default function NumberCounter({ target = 100,className }: { target: number,className?:string }) {
  const spring = useSpring(0, {
    stiffness: 50,
    damping: 20,
  });

  useEffect(() => {
    spring.set(target);
  }, [target]);

  const rounded = useTransform(spring, (val) => Math.floor(val));

  return (
    <motion.span className={` font-bold ${className}`}>
      {rounded} 
    </motion.span>
    
  );
}
