import React from 'react'

const ContactSection = () => {
  return (
    <section className="bg-gradient-to-b from-amber-50 via-yellow-100 to-beige-200 text-gray-800 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Let’s Connect</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're hiring or exploring, our team is here to guide you.<br />
            <span className="text-amber-700 font-medium">
              Precision, care, and clarity — every step of your recruitment journey.
            </span>
          </p>

          <div className="space-y-4 text-gray-800 text-base">
            <p><strong>Email:</strong> <a href="mailto:isispoet@isipoetalform.com" className="text-amber-700 hover:underline">isispoet@isipoetalform.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+14155306121" className="text-amber-700 hover:underline">+1 (415) 530-6121</a></p>
            <p><strong>Office:</strong> 727 Tech Lane, San Francisco, California 94105</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-amber-200">
          <img
            src="https://imgs.search.brave.com/RagrG_Duisq7qMnxN71HlUuIdprURc7b2vQGjN7ccK0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9saXJw/LmNkbi13ZWJzaXRl/LmNvbS9iYTYxYzg1/ZC9kbXMzcmVwL211/bHRpL29wdC9ob3ct/dG8tcGluLWEtbG9j/YXRpb24tb24tZ29v/Z2xlLW1hcHMtMTky/MHcud2VicA"
            alt="Map of San Francisco"
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </section>
  )
}

export default ContactSection
