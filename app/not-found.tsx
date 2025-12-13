"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const router = useRouter();

  // Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-yellow-200">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <img
          src="https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lost illustration"
          className="mx-auto mb-6 w-48 h-auto object-contain drop-shadow-lg"
        />
        <h1 className="text-5xl font-extrabold text-amber-700 mb-4">
          404 — Page Not Found
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Oops! You seem lost. Redirecting you home...
        </p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        >
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 rounded-md bg-amber-600 text-white shadow-md hover:bg-amber-700 transition"
          >
            Go Home Now
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
