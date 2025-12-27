"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const NavBar = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginRedirect = (role: string) => {
    router.push(`/login?role=${role}`);
    setShowDropdown(false);
    setMenuOpen(false);
  };

  // Framer Motion variants
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.5 } }
  };

  const dropdownVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
    open: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <div className="h-24 w-full flex items-center justify-between px-6 md:px-12 bg-amber-50 font-sans relative z-50 border-b border-amber-200 shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
    Skill 2 Hire 
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-6 text-sm md:text-base font-medium text-gray-800">
          <li><Link href="/telent" className="hover:text-amber-600 transition">Telent</Link></li>
          <li><Link href="/mentor" className="hover:text-amber-600 transition">Mentors</Link></li>
          <li><Link href="/Recruiters" className="hover:text-amber-600 transition">Recruiters</Link></li>
          <li><Link href="/Jobs" className="hover:text-amber-600 transition">Jobs</Link></li>
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-4 relative">
          {/* Login Dropdown Toggle */}
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 border border-gray-400 rounded-lg flex items-center gap-1 hover:border-black transition text-sm font-medium text-gray-800"
          >
            Login <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? "rotate-180" : "rotate-0"}`} />
          </button>

          {/* Animated Login Dropdown */}
          <motion.div
            initial="closed"
            animate={showDropdown ? "open" : "closed"}
            variants={dropdownVariants}
            className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 origin-top-right"
            onClick={(e) => e.stopPropagation()}
          >
            {showDropdown && (
              <div>
                {["Mentor", "Candidate", "Recruiter"].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleLoginRedirect(role.toLowerCase())}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-amber-50 transition"
                  >
                    {role} Login
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Hire Button */}
          <button
            onClick={() => router.push("/hire")}
            className="px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-md text-sm font-semibold"
          >
            Hire Talent
          </button>
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-gray-800 p-2 rounded-md hover:bg-amber-100 transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <motion.div
        initial="closed"
        animate={menuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className={`absolute top-24 left-0 w-full bg-white border-t border-amber-200 shadow-lg z-40 px-6 py-4 md:hidden overflow-hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col gap-4 text-gray-800 text-base font-medium">
          <motion.li><Link href="/talent" onClick={() => setMenuOpen(false)}>Talent</Link></motion.li>
          <motion.li><Link href="/mentors" onClick={() => setMenuOpen(false)}>Mentors</Link></motion.li>
          <motion.li><Link href="/recruiters" onClick={() => setMenuOpen(false)}>Recruiters</Link></motion.li>
          <motion.li><Link href="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link></motion.li>
        </ul>

        <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
          {["Mentor", "Candidate", "Recruiter"].map((role) => (
            <motion.button
              key={role}
              onClick={() => handleLoginRedirect(role.toLowerCase())}
              className="w-full text-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-amber-50 transition text-sm font-semibold"
            >
              {role} Login
            </motion.button>
          ))}
          <motion.button
            onClick={() => {
              router.push("/hire");
              setMenuOpen(false);
            }}
            className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-md text-sm font-semibold"
          >
            Hire Talent
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBar;
