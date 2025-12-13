// this is  a client component
"use client"
import { motion } from "framer-motion"

const steps = [
  { title: "DSA Learn", description: "Free or paid with referral training content & Concept of all the Modules related to the job role." },
  { title: "Aptitude Preparation & Test", description: "First learn concept from recommended referral then Test and earn ratings" },
  { title: "Technical Concept Building", description: "First learn tech concepts from recommended referral then discuss with Industry experts and then achieve ratings" },
  {title:"Web Development",description:"build the backern,frontend based "},

  { title: "Assessment Submission", description: "Earn Assessment Ratings" },
  { title: "Project Work Submission", description: "Submit your project work" },
  { title: "System Design Solutions", description: "Submit System Design Solutions" },
  { title: "Mentorship", description: "Mentorship with Industry Experts" },
  { title: "Internship Work", description: "Get hands-on internship experience" },
  { title: "Online Tests & Score Card", description: "Online Tests & Score Card Generation" },
  
  { title: "Meet Recruiters", description: "Meet with companies recruiters & Get Your Dream Job" },
    { title: "HR & Managerial Discussions", description: "Learn from Industry experts and then Test and earn ratings" },
]

const stillReadySteps = [
  { title: "Learn", description: "Upskill with curated content and referral-backed modules." },
  { title: "Assessment Submission", description: "Submit assessments to validate your learning." },
  { title: "Test", description: "Take structured tests to benchmark your skills." },
  { title: "Review", description: "Get expert feedback and peer reviews." },
  { title: "Rating", description: "Earn ratings to showcase your job-readiness." },
]

export default function Roadmap() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-amber-50 via-green-100 to-yellow-50 p-8 md:p-16 overflow-hidden">
      {/* Header */}
      <div className="mb-24">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-2 leading-tight text-center">
          Become the <br /> Top 1% Talent
        </h1>
        <p className="text-amber-700 text-lg font-medium text-center">Industry-ready skilled talent roadmap</p>
      </div>

      {/* Roadmap Tray */}
      <div className="relative w-full pb-32 overflow-hidden">
        <motion.div
          className="flex gap-16 min-w-max px-8 relative"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {/* SVG Wave Path */}
          <svg
            className="absolute top-0 left-0 w-full h-64 pointer-events-none z-0"
            viewBox="0 0 2400 280"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 180 Q 300 80, 520 140 T 960 100 T 1400 160 T 1840 120 T 2320 180"
              stroke="#D4A574"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>

          {/* Steps */}
          {[...steps, ...steps].map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0 w-56 z-10">
              <div className="w-10 h-10 bg-amber-200 rounded-full border-4 border-amber-300 shadow-xl mb-12 hover:scale-110 transition-transform duration-300 ease-out"></div>
              <div className="w-1 h-12 bg-amber-300 mb-6"></div>
              <div className="text-center">
                <div className="text-amber-600 font-bold text-xs mb-2 tracking-wider">
                  STEP {String((index % steps.length) + 1).padStart(2, "0")}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3 leading-snug">{step.title}</h3>
                {/* <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p> */}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Still Job-Ready Tray */}
      <div className="mb-24">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 leading-tight text-center">
          You’re Still Job-Ready
        </h2>
        <p className="text-amber-700 text-lg font-medium text-center">Modular process for continuous validation</p>
      </div>

      <div className="relative w-full pb-32 overflow-hidden">
        <motion.div
          className="flex gap-16 min-w-max px-8 relative"
          animate={{ x: ["0%", "50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
          {/* SVG Wave Path */}
          <svg
            className="absolute top-0 left-0 w-full h-64 pointer-events-none z-0"
            viewBox="0 0 2400 280"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 180 Q 300 80, 520 140 T 960 100 T 1400 160 T 1840 120 T 2320 180"
              stroke="#D4A574"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>

          {/* Steps */}
          {[...stillReadySteps, ...stillReadySteps].map((step, index) => (
            <div key={index} className="flex flex-col items-center flex-shrink-0 w-56 z-10">
              <div className="w-10 h-10 bg-amber-100 rounded-full border-4 border-amber-300 shadow-xl mb-12 hover:scale-110 transition-transform duration-300 ease-out"></div>
              <div className="w-1 h-12 bg-amber-300 mb-6"></div>
              <div className="text-center">
                <div className="text-amber-600 font-bold text-xs mb-2 tracking-wider">
                  STEP {String((index % stillReadySteps.length) + 1).padStart(2, "0")}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-3 leading-snug">{step.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
