

// this is  a client component
"use client"  
import React from 'react';
import { motion } from 'framer-motion';
// Importing Lucide icons for a clean, modern look
import { FlaskConical, Users, Trophy } from 'lucide-react'; 

// Map icon names to components for easy rendering
const iconMap = {
  Test: FlaskConical,
  Interview: Users,
  Scorecard: Trophy,
};

const features = [
  {
    label: 'Test',
    title: 'Online candidate screening',
    description: 'Precise technical and aptitude evaluation methods.',
    button: 'Demo',
    icon: 'Test', // Key for iconMap
  },
  {
    label: 'Interview',
    title: 'HR assessment process',
    description: 'Comprehensive candidate performance tracking.',
    button: 'Review',
    icon: 'Interview', // Key for iconMap
  },
  {
    label: 'Scorecard',
    title: 'Detailed performance metrics and insights',
    description: 'Comprehensive candidate evaluation framework.',
    button: 'Analyze',
    icon: 'Scorecard', // Key for iconMap
  },
];

const IntelligentHiring = () => {
  return (
    // Background updated to a smoother amber gradient for glass effect visibility
    <section className="w-full px-6 md:px-12 py-20 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 font-sans">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Intelligent Hiring Solutions
        </h2>
        <p className="text-lg text-gray-700">
          Streamline recruitment with data-driven technology.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.15 }}
              viewport={{ once: true }}
              // Glassmorphism effect: semi-transparent white background, blur, and light border
              className="relative p-8 rounded-3xl border border-white/60 bg-white/70 shadow-xl backdrop-blur-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/90"
            >
              
              {/* Decorative Background Icon (Large and subtle) */}
              <div className="absolute -top-10 -right-10 opacity-10 text-amber-500/50 transform scale-[3.5] rotate-[-10deg]">
                {IconComponent && <IconComponent size={256} strokeWidth={1} />}
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon in a small amber circle */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500 text-white mb-4 shadow-lg ring-4 ring-amber-200/50">
                    {IconComponent && <IconComponent size={24} />}
                </div>

                <div className="text-xs uppercase text-amber-700 mb-2 tracking-wider font-semibold">
                  {feature.label}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                {/* Button styled for contrast and premium feel */}
                <button className="px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-700 transition font-semibold text-sm shadow-md">
                  {feature.button}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default IntelligentHiring;
