// app/Components/BenefitSection.tsx
// this is a component file for Benefits Section
"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = {
  Jobseekers: [
    {
      question: 'How does this platform help me get hired?',
      answer:
        'You follow a guided roadmap — from learning DSA and aptitude to submitting assessments, projects, and system design. Each step earns you ratings and validation, making you recruiter-ready.',
    },
    {
      question: 'What if I’m still learning?',
      answer:
        'You’re still job-ready. Learn, submit assessments, take tests, get reviews, and earn ratings — all modular and trackable.',
    },
    {
      question: 'Can I meet recruiters directly?',
      answer:
        'Yes. Once you complete the roadmap, you unlock recruiter interactions and scorecards that showcase your readiness.',
    },
  ],
  Mentors: [
    {
      question: 'What’s in it for mentors?',
      answer:
        'You share your expertise, guide jobseekers through technical and HR prep, and earn money for your time and insights.',
    },
    {
      question: 'How do I mentor someone?',
      answer:
        'You join as a verified expert, participate in discussions, review submissions, and offer career guidance.',
    },
    {
      question: 'Is mentorship flexible?',
      answer:
        'Absolutely. You choose when and how to engage — from live sessions to async reviews.',
    },
  ],
  Recruiters: [
    {
      question: 'How does this reduce hiring effort?',
      answer:
        'You get validated candidates with ratings, assessments, and project work — no guesswork, just proof of skill.',
    },
    {
      question: 'Can I filter by skill or rating?',
      answer:
        'Yes. You can search by tech stack, rating level, roadmap completion, and even mentorship feedback.',
    },
    {
      question: 'Is this cost-effective?',
      answer:
        'Hugely. You save time, reduce hiring costs, and get the best-fit talent without endless screening.',
    },
  ],
}

const FAQCard = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex justify-between items-center"
      >
        <h4 className="text-gray-900 font-semibold text-base">{question}</h4>
        <span className="text-amber-600 font-bold text-xl">{open ? '−' : '+'}</span>
      </button>
      {open && <p className="mt-3 text-gray-700 text-sm leading-relaxed">{answer}</p>}
    </motion.div>
  )
}

const BenefitsSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Platform Benefits</h2>
        <p className="text-lg text-gray-700">
          More than recruitment — we deliver readiness<br />
          <span className="text-amber-700 font-medium">
            Validated talent. Production-ready hires. Real impact.
          </span>
        </p>
      </div>

      {/* Dual Blocks */}
      <div className="grid md:grid-cols-2 gap-10 mb-24">
        {/* Seekers Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="bg-white border border-amber-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h4 className="text-sm font-semibold text-amber-600 uppercase mb-2 tracking-wide">For Talent</h4>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Industry-standard preparation & skill validation</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Go beyond learning — prove your skills through assessments, mentorship, and real-world projects. Get job-ready with confidence.
          </p>
          <a href="#" className="text-amber-600 font-medium hover:underline mt-4 inline-block">Explore pathways &gt;</a>
        </motion.div>

        {/* Recruiters Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white border border-amber-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h4 className="text-sm font-semibold text-amber-600 uppercase mb-2 tracking-wide">For Recruiters</h4>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Hire production-ready talent instantly</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            Skip the guesswork. Access candidates who’ve already been vetted, mentored, and tested — saving you time, cost, and onboarding effort.
          </p>
          <a href="#" className="text-amber-600 font-medium hover:underline mt-4 inline-block">See how it works &gt;</a>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">FAQs</h3>
        {Object.entries(faqs).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h4 className="text-xl font-semibold text-amber-700 mb-4">{category}</h4>
            <div className="space-y-4">
              {items.map((faq, index) => (
                <FAQCard key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSection
