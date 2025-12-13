//  this is  a client component
"use client"
import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Basic",
    price: "₹1,599",
    billing: "billed annually",
    features: [
      "Job posting access",
      "Basic candidate screening",
      "Limited profile views",
    ],
    button: "Start basic",
    // Removed specific color/buttonColor props as we are using a unified amber theme
  },
  {
    name: "Business",
    price: "₹2,499",
    billing: "billed annually",
    features: [
      "Advanced job matching",
      "Comprehensive candidate insights",
      "Unlimited profile access",
      "Interview scheduling tools",
    ],
    button: "Go pro",
    // Removed specific color/buttonColor props
  },
  {
    name: "Enterprise",
    price: "₹4,199",
    billing: "billed annually",
    features: [
      "Full platform access",
      "Custom integration support",
      "Dedicated account manager",
      "Advanced analytics",
      "Priority support",
    ],
    button: "Contact us",
    // Removed specific color/buttonColor props
  },
];

const PricingSection = () => {
  // Common classes for the amber-themed button
  const buttonClass = `w-full bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-75 focus:ring-amber-500 shadow-lg`;

  return (
    <section className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20 relative overflow-hidden">
      
      {/* Background circles for subtle visual interest on light background */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-amber-600 opacity-5 rounded-full mix-blend-multiply animate-blob filter blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600 opacity-5 rounded-full mix-blend-multiply animate-blob animation-delay-2000 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-600 opacity-5 rounded-full mix-blend-multiply animate-blob animation-delay-4000 filter blur-3xl"></div>


      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-5xl font-extrabold text-amber-800 mb-4">
          Flexible Pricing
        </h2>
        <p className="text-xl text-gray-700">
          Choose the perfect plan to elevate your recruitment strategy.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-10 relative z-10">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03, 
              y: -10, 
              // Darker shadow for a light background
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
              transition: { duration: 0.3 }
            }}
            // Adjusted glassmorphism for light background (bg-white/50 and amber border)
            className={`bg-white/50 backdrop-filter backdrop-blur-lg border border-amber-300 border-opacity-70 rounded-3xl p-8 shadow-xl flex flex-col justify-between transform transition-all duration-300`}
            style={{
              // Subtle shadow for depth on a light card
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div>
              <h3 className="text-3xl font-bold text-amber-800 mb-3 tracking-wide">
                {plan.name}
              </h3>
              <p className="text-5xl font-extrabold text-amber-600 mb-2">
                {plan.price}
              </p>
              <p className="text-sm text-gray-600 mb-6 font-light">{plan.billing}</p>
              <ul className="text-lg text-gray-700 mb-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {/* Checkmark icon changed to amber color */}
                    <svg className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(180,83,9,0.4)" }} // Amber shadow on hover
              whileTap={{ scale: 0.98 }}
              className={buttonClass}
            >
              {plan.button}
            </motion.button>
          </motion.div>
        ))}
      </div>
      <style>{`
        /* Keyframe animation for the background blobs (kept for movement) */
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
