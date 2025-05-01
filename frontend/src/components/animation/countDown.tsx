"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

export default function CountDown({ initialTime }: { initialTime: number }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Countdown logic
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex gap-2 p-0 leading-none items-center text-sm overflow-hidden  font-bold">
      <TimeUnit value={days} label="Days" />
      <span>:</span>
      <TimeUnit value={hours} label="Hrs" />
      <span>:</span>
      <TimeUnit value={minutes} label="Min" />
      <span>:</span>
      <TimeUnit value={seconds} label="Sec" />
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex text-black flex-col items-center">
      <Digit value={value} />
      {/* <span className="text-xs">{label}</span> */}
    </div>
  );
}

function Digit({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      <AnimatedDigit place={10} value={value} />
      <AnimatedDigit place={1} value={value} />
    </div>
  );
}

function AnimatedDigit({ place, value }: { place: number; value: number }) {
  const placeValue = Math.floor(value / place) % 10;
  const animatedValue = useSpring(placeValue, {
    stiffness: 100,
    damping: 15,
  });

  useEffect(() => {
    animatedValue.set(placeValue);
  }, [placeValue]);

  return (
    <div style={{ height }} className="relative w-[1ch] tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: any; number: number }) {
  const y = useTransform(mv, (latest: number) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center  font-bold justify-center"
    >
      {number}
    </motion.span>
  );
}
