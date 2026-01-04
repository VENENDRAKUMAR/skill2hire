"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, User, LayoutDashboard, LogOut, Briefcase } from "lucide-react";
import { HiCube } from "react-icons/hi"; // 👈 Import fix

const NavBar = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLoginRedirect = (role: string) => {
    router.push(`/login?role=${role}`);
    setShowDropdown(false);
  };

  // Roles ko display name mein convert karne ke liye helper
  const getRoleName = (role: string) => {
    if (role === "JOBSEEKER") return "Candidate";
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  return (
    <nav className="h-20 w-full flex items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-md sticky top-0 z-[100] border-b border-amber-100 shadow-sm">
      {/* Logo Section */}
      <Link href="/" className="group flex items-center gap-2">
        <div className="bg-amber-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
          <HiCube className="text-white text-2xl" />
        </div>
        <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
          Skill<span className="text-amber-600">2</span>Hire
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-10">
        <ul className="flex gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <li><Link href="/jobs" className="hover:text-amber-600 transition">Jobs</Link></li>
          <li><Link href="/mentors" className="hover:text-amber-600 transition">Mentors</Link></li>
          
          {/* Recruiter specific link */}
          {session?.user?.role === "RECRUITER" && (
            <li>
              <Link href="/post-job" className="text-amber-600 hover:text-amber-700 font-black decoration-2 underline-offset-4 flex items-center gap-1">
                <Briefcase size={14} /> Post Job
              </Link>
            </li>
          )}
        </ul>

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-full"></div>
          ) : session?.user ? (
            /* ✅ Authenticated User View */
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 pr-3 bg-amber-50 rounded-full border border-amber-200 hover:shadow-md transition-all duration-300"
              >
                <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center text-white overflow-hidden shadow-inner">
                  {session.user.image ? (
                    <img src={session.user.image} alt="avatar" className="h-full w-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-bold text-amber-700 uppercase">{getRoleName(session.user.role || "")}</span>
                  <span className="text-sm font-bold text-gray-800">{session.user.name?.split(" ")[0]}</span>
                </div>
                <ChevronDown size={14} className={`transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-[-1]" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-60 bg-white border border-amber-100 rounded-2xl shadow-2xl p-2 origin-top-right overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-amber-50/50 rounded-xl mb-1">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Connected as</p>
                        <p className="text-sm font-black text-gray-800 truncate">{session.user.email}</p>
                      </div>

                      {/* Onboarding Alert for New Users */}
                      {session.user.isNewUser && (
                        <Link href="/onboarding" className="flex items-center gap-3 px-4 py-3 bg-yellow-100 text-yellow-800 rounded-xl mb-1 text-xs font-bold animate-pulse">
                          ⚠️ Complete Onboarding
                        </Link>
                      )}

                      <Link 
                        href={`/dashboard/${session.user.role?.toLowerCase()}`} 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 rounded-xl transition text-gray-700 font-bold text-sm"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard size={18} className="text-amber-600" /> Dashboard
                      </Link>

                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition text-red-600 font-bold text-sm"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ✅ Guest User View */
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-amber-600 transition flex items-center gap-1"
                >
                  Login <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-white border border-amber-50 rounded-xl shadow-xl py-1 overflow-hidden"
                    >
                      {["Candidate", "Recruiter", "Mentor"].map((r) => (
                        <button
                          key={r}
                          onClick={() => handleLoginRedirect(r.toLowerCase())}
                          className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-amber-50 hover:text-amber-700 transition"
                        >
                          {r} Portal
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/register" className="px-6 py-2.5 bg-gray-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-200">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Icon */}
      <button className="lg:hidden p-2 text-gray-900 bg-amber-50 rounded-lg" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
};

export default NavBar;