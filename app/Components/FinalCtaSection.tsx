import React from 'react'

const FinalCTASection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
            Hiring shouldn’t feel like guesswork
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Our platform delivers <span className="text-amber-700 font-semibold">validated, production-ready talent</span> — so you can skip the noise and hire with confidence. 
            From sourcing to onboarding, we help you cut down <span className="font-medium">time, cost, and energy</span> — without compromising on quality.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition">
              Start free trial
            </button>
            <button className="border border-amber-600 text-amber-700 px-6 py-3 rounded-md hover:bg-amber-100 transition">
              Book demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200">
          <img
            src="https://imgs.search.brave.com/hGkbZnfpHAvf0aG9vB0i8aqJi-lTwffDUyXDn_GdwWc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/dmlydHVhbGxhdGlu/b3MuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9WTC1TSVRFLUlN/QUdFUy9ibG9nLzIw/MjUvanVseS8wN18z/MV9oaXJpbmdfcHJv/Y2Vzc19zdGVwcy0w/MS53ZWJw"
            alt="Hiring visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default FinalCTASection
