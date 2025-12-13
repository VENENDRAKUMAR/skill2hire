"use client"
import { motion } from "framer-motion"
import {
  Search,
  ClipboardList,
  Zap,
  Upload,
  BarChart,
  MonitorPlay,
} from "lucide-react"
import React from "react"

// --- STAGE DATA ---
const recruitmentStages = [
  { name: "Sourcing", icon: <Search />, color: "from-cyan-400 to-blue-600", shadow: "shadow-cyan-500/70" },
  { name: "Screening", icon: <ClipboardList />, color: "from-green-400 to-emerald-600", shadow: "shadow-emerald-500/70" },
  { name: "Assessment", icon: <Zap />, color: "from-yellow-400 to-amber-600", shadow: "shadow-amber-500/70" },
  { name: "Project Submission", icon: <Upload />, color: "from-red-400 to-pink-600", shadow: "shadow-pink-500/70" },
  { name: "Online Test", icon: <Zap />, color: "from-indigo-400 to-indigo-600", shadow: "shadow-indigo-500/70" },
  { name: "Scorecard Review", icon: <BarChart />, color: "from-purple-400 to-violet-600", shadow: "shadow-violet-500/70" },
  { name: "Interview & Offer", icon: <MonitorPlay />, color: "from-pink-400 to-rose-600", shadow: "shadow-rose-500/70" },
]

// --- Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.8 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
    },
  },
}

// --- Icon Block ---
const IconBlock = ({ icon, name, color, shadow }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.07, rotate: 1, transition: { duration: 0.3 } }}
    className="flex flex-col items-center gap-3 cursor-pointer p-2"
  >
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
      className={`w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center text-4xl sm:text-5xl ${shadow} shadow-2xl p-4 border border-white/10`}
    >
      {React.cloneElement(icon, { size: "70%" })}
    </motion.div>
    <p className="text-sm sm:text-base font-semibold text-center mt-3 max-w-[120px] tracking-wide">{name}</p>
  </motion.div>
)

// --- Line Connector ---
const LineConnector = () => (
  <motion.div
    variants={itemVariants}
    className="relative h-1.5 w-16 sm:w-20 mx-4 bg-gray-700 rounded-full origin-left overflow-hidden"
  >
    <motion.div
      animate={{ x: ["-100%", "100%"] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent"
    />
  </motion.div>
)

// --- Main Component ---
export default function App() {
  return (
    <section className="min-h-screen flex items-center justify-center overflow-hidden font-sans relative bg-gradient-to-b from-amber-50 via-green-100 to-yellow-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 10, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-green-300 to-black tracking-tighter leading-snug drop-shadow-lg">
           Follow the Path to Become SDLC-Ready
          </h1>
          <p className="text-lg sm:text-xl mt-4 max-w-3xl mx-auto font-light">
            Experience the candidate journey visualized: <strong>speed, clarity, and precision</strong> at every stage.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center py-4 space-x-0 lg:space-x-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {recruitmentStages.map((stage, index) => (
            <div key={index} className="flex items-center">
              <IconBlock {...stage} />
              {index < recruitmentStages.length - 1 && (
                <motion.div className="hidden lg:block">
                  <LineConnector />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-40 bg-radial-gradient from-transparent via-gray-950 to-gray-950 opacity-80 pointer-events-none z-0"></div>
      </div>

      {/* Blob Animation */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-sky-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -70px) scale(1.15) rotate(10deg); }
          66% { transform: translate(-50px, 30px) scale(0.9) rotate(-10deg); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 12s infinite cubic-bezier(0.42, 0, 0.58, 1);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .mix-blend-screen {
          mix-blend-mode: screen;
        }
      `}</style>
    </section>
  )
}
