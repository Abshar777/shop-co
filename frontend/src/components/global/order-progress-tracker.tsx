"use client"
import React from "react";
import { useEffect, useState } from "react";
import { Clock, PackageOpen, Truck, Check } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface OrderStep {
  icon: React.ElementType;
  label: string;
  date: string;
  completed: boolean;
}

interface OrderProgressTrackerProps {
  steps: OrderStep[];
  currentStatus: string;
}

export function OrderProgressTracker({ steps, currentStatus }: OrderProgressTrackerProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const currentStepIndex = steps.findIndex(step => step.label === currentStatus) !== -1 
    ? steps.findIndex(step => step.label === currentStatus) 
    : steps.filter(step => step.completed).length;
  
  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Calculate segment widths - equal segments between steps
  const segmentWidth = 100 / (steps.length - 1);

  return (
    <div className="relative py-6 px-4">
      {/* Background progress line */}
      <div className="absolute top-[2.6rem] left-8 right-8 h-1.5 bg-gray-200 rounded-full"></div>
      
      {/* Step markers and segments */}
      <div className="absolute top-[2.6rem] left-8 right-8 h-1.5">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            {/* Progress line segments - only show between steps */}
            {i < steps.length - 1 && (
              <motion.div 
                className={cn(
                  "absolute h-full rounded-full",
                  steps[i].completed ? "bg-gradient-to-r from-green-400 to-green-500" : "bg-gray-200"
                )}
                style={{ 
                  left: `${i * segmentWidth}%`, 
                  width: `${segmentWidth}%`,
                  boxShadow: steps[i].completed ? "0 0 8px rgba(34, 197, 94, 0.4)" : "none"
                }}
                initial={{ scaleX: 0, opacity: steps[i].completed ? 0 : 1 }}
                animate={{ 
                  scaleX: animationComplete && steps[i].completed ? 1 : 0,
                  opacity: 1 
                }}
                transition={{ 
                  duration: 0.7, 
                  ease: "easeInOut", 
                  delay: 0.3 + (i * 0.2) 
                }}
              />
            )}
            
            {/* Step junction markers */}
            <motion.div
              className={cn(
                "absolute w-4 h-4 rounded-full -ml-2 -mt-[5px]",
                step.completed 
                  ? "bg-green-500 border-2 border-white" 
                  : "bg-white border-2 border-gray-300"
              )}
              style={{ 
                left: `${i * segmentWidth}%`,
                boxShadow: step.completed ? "0 0 8px rgba(34, 197, 94, 0.5)" : "0 1px 3px rgba(0,0,0,0.1)"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                delay: 0.2 + (i * 0.1) 
              }}
            />
            
            {/* Pulse animation for current step */}
            {i === currentStepIndex && (
              <motion.div
                className="absolute w-6 h-6 rounded-full -ml-3 -mt-[9px] bg-green-400 opacity-50"
                style={{ left: `${i * segmentWidth}%` }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.4, 0.2] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Steps content */}
      <div className="relative flex justify-between">
        {steps.map((step, i) => (
          <div 
            key={i} 
            className={cn(
              "flex flex-col items-center text-center relative",
              i === 0 ? "ml-0 mr-auto" : 
              i === steps.length - 1 ? "mr-0 ml-auto" : 
              "mx-auto"
            )}
            style={{ 
              width: `${100 / steps.length}%`,
              maxWidth: "120px" 
            }}
          >
            {/* Step circle with icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-md transition-all duration-300",
                step.completed 
                  ? "bg-green-500 text-white" 
                  : i === currentStepIndex
                    ? "bg-white border-2 border-green-400 text-green-500"
                    : "bg-white border-2 border-gray-200 text-gray-400"
              )}
              style={{
                boxShadow: step.completed 
                  ? "0 4px 12px rgba(34, 197, 94, 0.2)" 
                  : "0 2px 6px rgba(0, 0, 0, 0.08)"
              }}
            >
              {step.completed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 + 0.15 * i }}
                >
                  <Check size={20} />
                </motion.div>
              ) : (
                <step.icon size={20} />
              )}
            </motion.div>
            
            {/* Step label */}
            <motion.p 
              className={cn(
                "font-medium text-sm transition-colors",
                step.completed 
                  ? "text-green-600" 
                  : i === currentStepIndex
                    ? "text-green-600 font-semibold"
                    : "text-gray-600"
              )}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + 0.1 * i }}
            >
              {step.label}
            </motion.p>
            
            {/* Step date */}
            <motion.p 
              className={cn(
                "text-xs",
                step.completed 
                  ? "text-gray-500" 
                  : i === currentStepIndex
                    ? "text-green-600"
                    : "text-gray-400"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + 0.1 * i }}
            >
              {step.date}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
}