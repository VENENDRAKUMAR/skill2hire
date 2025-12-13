// this is a client component for Testimonials Section
"use client"
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// --- Data Structure (kept as is) ---
const testimonialData = {
  candidates: [
    {
      quote: "I got hired within 2 weeks. The platform is a game changer. The platform is a game changer. The platform is a game changer. The platform is a game changer.",
      name: "Ayesha Khan",
      location: "Mumbai, India",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote: "The job matching was so accurate, I didn’t even need to apply twice.",
      name: "Ravi Mehta",
      location: "Delhi, India",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote: "Cinematic onboarding made me feel valued instantly.",
      name: "Sneha Roy",
      location: "Bangalore, India",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ],
  recruiters: [
    {
      quote: "We sourced top talent in half the time. Brilliant system. We sourced top talent in half the time. Brilliant system. We sourced top talent in half the time. Brilliant system.",
      name: "Neha Sharma",
      location: "Pune, India",
      image: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    {
      quote: "Candidate profiles were instantly usable.",
      name: "James Lee",
      location: "San Francisco, USA",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      quote: "Role-based routing saved us hours.",
      name: "Priya Desai",
      location: "Hyderabad, India",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
    },
  ],
  mentors: [
    {
      quote: "Mentoring here feels impactful. The flow is frictionless. Mentoring here feels impactful. The flow is frictionless. Mentoring here feels impactful. The flow is frictionless.",
      name: "Anita Verma",
      location: "Chennai, India",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
    },
    {
      quote: "Loved guiding candidates through real-world challenges.",
      name: "Karan Patel",
      location: "Ahmedabad, India",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      quote: "Finally a platform where mentorship scales.",
      name: "Arjun Rao",
      location: "Goa, India",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
    },
  ],
}

// Framer Motion variants for the fade-in animation
const FADE_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", damping: 12, stiffness: 100 } 
  },
};

/**
 * Component for a single category testimonial carousel that auto-plays.
 * Replaces the infinite horizontal scroller with a single-card fading view.
 */
const TestimonialCarousel = ({ title, items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play logic using useEffect and setInterval
  useEffect(() => {
    // Set an interval to change the index every 6 seconds
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000); 

    // Clear the interval when the component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <div className="w-full md:w-1/3 px-2">
      {/* Category Title */}
      <div className="text-center text-xl font-extrabold tracking-tight mb-6 text-amber-800">
        {title}
      </div>

      {/* Testimonial Card Container (Fixed Height) */}
      <div className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex} // Key change forces Framer Motion to see a new component and re-run animation
            variants={FADE_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute inset-0 p-6 bg-white flex flex-col items-center justify-between text-center"
          >
            {/* Quote */}
            <p className="text-lg italic text-gray-700 mb-6 leading-relaxed flex-grow">
                “{currentItem.quote}”
            </p>

            {/* Separator */}
            <div className="w-16 h-1 bg-amber-400 rounded-full my-4"></div>

            {/* Profile Info */}
            <div className="flex flex-col items-center mt-auto">
              <img
                src={currentItem.image}
                alt={currentItem.name}
                // Placeholder image for safety (e.g., if randomuser.me fails)
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/56x56/D1B876/ffffff?text=U" }}
                className="w-14 h-14 rounded-full mb-3 object-cover shadow-lg border-2 border-amber-500"
              />
              <p className="font-bold text-amber-800 text-base">{currentItem.name}</p>
              <p className="text-sm text-gray-500">{currentItem.location}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-amber-600 shadow-md' : 'bg-amber-200 hover:bg-amber-300'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


export default function App() {
  return (
    <section className="w-full min-h-screen bg-gray-50 font-sans py-20 px-4">
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-900">
          Real Impact Across Roles
        </h1>
        <p className="text-xl text-center mb-20 text-gray-600 max-w-3xl mx-auto">
          Hear directly from our community—candidates, recruiters, and mentors—on how our platform is changing the landscape.
        </p>

        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <TestimonialCarousel title="Talents" items={testimonialData.candidates} />
         
          <TestimonialCarousel title="Mentors" items={testimonialData.mentors} />
           <TestimonialCarousel title="Recruiters" items={testimonialData.recruiters} />
        </div>
      </div>
    </section>
  );
}
