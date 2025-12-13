"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-yellow-200">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Animated Sun/Orb */}
        <motion.div
          className="w-24 h-24 rounded-full bg-amber-400 shadow-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Text shimmer */}
        <motion.h1
          className="mt-6 text-2xl font-bold text-amber-700"
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          Loading your experience...
        </motion.h1>

        {/* Bouncing dots */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-3 h-3 rounded-full bg-amber-600"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
