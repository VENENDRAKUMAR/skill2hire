"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  Award,
  Calendar,
  Bell,
  ChevronRight,
  DollarSign,
  Menu,
  Home,
  User,
  Settings,
  LogOut,
  BookOpen,
  Target,
} from "lucide-react";
import LoaderAnimation from "@/app/Components/Loader";
/* ================================
   MAIN DASHBOARD COMPONENT
================================ */
export default function JobSeekerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(15);

  /* -------------------------------
     AUTH GUARD (CLIENT SIDE)
  -------------------------------- */
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
    if (session && session.user.role !== "JOBSEEKER") {
      router.replace("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <LoaderAnimation />;
  }

  if (!session) return null;

  const { name, email, role } = session.user;

  /* -------------------------------
     DUMMY DATA (UI ONLY)
  -------------------------------- */
  const stats = [
    { label: "Total Jobs", value: "12", color: "from-cyan-400 to-blue-500", icon: Briefcase },
    { label: "Applications", value: "5", color: "from-purple-400 to-pink-500", icon: FileText },
    { label: "Interviews", value: "2", color: "from-orange-400 to-red-500", icon: Calendar },
    { label: "Profile Score", value: "85%", color: "from-green-400 to-emerald-500", icon: Award },
  ];

  const calendar = [
    [1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24],
  ];

  /* ================================
     RENDER
  ================================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow"
      >
        <Menu />
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            exit={{ x: -100 }}
            className="fixed left-0 top-0 h-full w-20 bg-gray-900 flex flex-col items-center py-8 gap-8 text-white"
          >
            <Briefcase />
            {[Home, Target, BookOpen, User, Settings].map((Icon, i) => (
              <Icon key={i} className="opacity-70 hover:opacity-100 cursor-pointer" />
            ))}
            <LogOut className="mt-auto text-red-400" />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:ml-20 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="flex items-center gap-4">
            <Bell />
            <div className="bg-white px-4 py-2 rounded-xl shadow">
              <p className="font-semibold">{role}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${s.color} p-6 rounded-3xl text-white shadow`}
            >
              <s.icon className="mb-3" />
              <p className="text-sm opacity-80">{s.label}</p>
              <p className="text-3xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="bg-white p-6 rounded-3xl shadow md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Calendar</h3>
            <div className="grid grid-cols-6 gap-2">
              {calendar.flat().map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDate(d)}
                  className={`p-3 rounded-lg ${
                    selectedDate === d
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Interview */}
          <div className="bg-white p-6 rounded-3xl shadow">
            <h3 className="text-xl font-bold mb-4">Upcoming Interview</h3>
            <p className="font-semibold">Google</p>
            <p className="text-sm text-gray-500 mb-2">Frontend Developer</p>
            <div className="flex items-center gap-2 text-green-600">
              <DollarSign /> $100,000 / year
            </div>
            <button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-xl">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
