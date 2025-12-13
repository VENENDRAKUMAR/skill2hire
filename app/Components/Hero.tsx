
"use client";

import { motion } from "framer-motion"

// Dummy JobSearchBox
const JobSearchBox = () => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search for jobs..."
      className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
)

export default function Hero() {
  return (
    <section className="w-full px-4 md:px-12 py-20 bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-2 gap-6 sm:grid-cols-2"
          >
            {/* Dashboard Image */}
            <div className="col-span-2 relative">
              <img
                src="https://ik.imagekit.io/y8vbhvt7s/Screenshot%20from%202025-10-31%2016-28-50.png"
                alt="Verified Candidate Dashboard"
                className="w-full h-auto rounded-xl shadow-2xl border-4 border-white transition-shadow duration-300 hover:scale-[1.01] transform"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              />
            </div>

            {/* Job Details Card */}
            <div className="col-span-1 bg-black text-white rounded-xl p-4 text-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Weekly Hours</span>
                  <span>40/40</span>
                </div>
                <div className="flex justify-between">
                  <span>Employee Type</span>
                  <span>Full-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Location</span>
                  <span>Remote</span>
                </div>
              </div>
            </div>

            {/* Pattern Card */}
            <div className="col-span-1 bg-orange-100 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.05) 20px, rgba(0,0,0,0.05) 40px)",
                  minHeight: "160px",
                }}
              />
            </div>

            {/* Open Jobs Card */}
            <div className="col-span-2 bg-gradient-to-r from-amber-100 to-yellow-200 rounded-xl p-6 flex items-center justify-between shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                  <span className="text-2xl">💼</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Open Roles</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">32 jobs found</p>
                <p className="text-sm text-gray-700">matching your profile</p>
                <a href="#" className="text-xs text-gray-600 mt-1 inline-block hover:underline">
                  View all →
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Search Box */}
            <motion.div whileFocus={{ scale: 1.02 }} className="relative w-full max-w-md">
              <JobSearchBox />
            </motion.div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Land your dream job <br className="hidden sm:block" /> with industry-standard skills
            </h1>

            {/* Description */}
            <p className="text-base text-gray-700 max-w-md leading-relaxed">
              The largest pool of remote job offers tailored to your skillset. Join great teams and build the future together.
            </p>

            {/* Animated Dual Growth Curve */}
          {/* Cinematic Gradient Growth Curve */}
<div className="w-full max-w-md">
  <motion.svg
    viewBox="0 0 300 100"
    className="w-full h-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <defs>
      <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ec4899" /> {/* Pink */}
        <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
      </linearGradient>
    </defs>

    {/* Growth Curve */}
    <motion.path
      d="M 10 90 Q 40 95, 70 85 T 130 70 T 190 50 T 250 30 T 290 10"
      stroke="url(#growthGradient)"
      strokeWidth="4"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    />
  </motion.svg>
</div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition">
                <span className="inline-flex items-center justify-center w-5 h-5">
                  <span className="text-xs">▶</span>
                </span>
                <span className="text-sm font-medium">Watch video</span>
              </button>
              <button className="px-6 py-2 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition">
                Find a job
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
