"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AnimatedDashboardPage = ({ children, className }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }} // Start with opacity 0 and slide up from 50px
      animate={{
        opacity: 1,
        y: [-100, -20, 10, 0], // Create a bounce effect (up and down motion)
      }}
      exit={{ opacity: 0, y: 50 }} // Optional: add an exit animation for when it unmounts
      transition={{
        duration: 0.6, // Total animation duration
        ease: "easeInOut", // Smooth transition for fade
        y: { type: "spring", stiffness: 300, damping: 20 }, // Bouncy effect on the Y-axis
        opacity: { duration: 0.2 }, // Faster fade-in
      }}
      className={cn("mx-auto max-w-[1920px] container page", className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDashboardPage;
