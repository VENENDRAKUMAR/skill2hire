import React from 'react'

const JobSearchSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Smart Job Search</h2>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold text-amber-700">Find roles that match your readiness</span><br />
            Our intelligent search connects validated talent with verified opportunities — instantly.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Matching</h3>
          <p className="text-gray-700 mb-6">
            Real-time job and company recommendations<br />
            Tailored to your skills, assessments, and career goals.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition">
              Start Searching
            </button>
            <button className="text-amber-700 font-medium hover:underline">
              Browse Roles &gt;
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200">
          <img
            src="https://imgs.search.brave.com/wFFUQUYXY1hz6zBS_i1PBdiRHocKhdZzQRYhayqun_c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/OC84NS9qb2ItaW50/ZXJ2aWV3LXdpdGgt/aHItdmVjdG9yLTQ2/OTU0ODg1LmpwZw"
            alt="Job search visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default JobSearchSection
