"use client";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import TooltipChildren from "../ui/TooltipChildren";

const AiButton = () => {
  return (
    <TooltipChildren message="AI Help">
      <button className="relative bg-slate-200 dark:bg-slate-800 shadow-lg rounded-full w-10 h-10 overflow-hidden hover:scale-95 transition-all">
        <div className="z-10 absolute inset-0 flex justify-center items-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          >
            <Bot className="w-6 h-6 text-primary" />
          </motion.div>
        </div>

        {/* Energy surge effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-400/50 to-green-500/40"
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />

          {/* Radial rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-green-400/70 h-px origin-center"
              style={{
                width: "50%",
                left: "50%",
                top: "50%",
                rotate: `${i * 45}deg`,
                transformOrigin: "left center",
              }}
              animate={{
                scaleX: [0.3, 1, 0.3],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Pulsing circle */}
          <motion.div
            className="absolute bg-gradient-to-r from-green-400/50 to-green-500/50 blur-sm rounded-full"
            style={{
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: ["70%", "110%", "70%"],
              height: ["70%", "110%", "70%"],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </div>
      </button>
    </TooltipChildren>
  );
};

export default AiButton;
