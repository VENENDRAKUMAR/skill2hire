"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  FileText,
  Calendar,
  Bell,
  Plus,
  MapPin,
  DollarSign,
  Clock,
  Eye,
  Edit,
  Trash2,
  Menu,
  Home,
  Settings,
  LogOut,
  UserCheck,
  BarChart3,
  Filter,
  Download,
  ChevronRight,
} from "lucide-react";

export default function RecruiterDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  /* -------------------- AUTH GUARD -------------------- */
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    router.replace("/login");
    return null;
  }

  if (session.user.role !== "RECRUITER") {
    router.replace("/unauthorized");
    return null;
  }

  /* -------------------- DATA -------------------- */
  const recruiterName = session.user.name;
  const recruiterRole = session.user.role;

  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase },
    { label: "Applications", value: "342", icon: FileText },
    { label: "Hired", value: "18", icon: UserCheck },
    { label: "Interviews", value: "27", icon: Calendar },
  ];

  const jobs = [
    {
      id: "1",
      title: "Senior React Developer",
      location: "Remote",
      salary: "₹20–30 LPA",
      applications: 145,
      status: "active",
      posted: "2 days ago",
    },
    {
      id: "2",
      title: "Backend Engineer (Node)",
      location: "Bangalore",
      salary: "₹15–25 LPA",
      applications: 98,
      status: "active",
      posted: "4 days ago",
    },
  ];

  const applications = [
    {
      name: "Aman Verma",
      position: "Senior React Developer",
      status: "pending",
      time: "2h ago",
      match: "92%",
    },
    {
      name: "Neha Sharma",
      position: "Backend Engineer",
      status: "interview",
      time: "1d ago",
      match: "88%",
    },
  ];

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-slate-50">
      {/* MOBILE MENU */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-3 rounded-xl shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu />
      </button>

      {/* SIDEBAR */}
      <AnimatePresence>
        {(sidebarOpen || isLargeScreen) && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            className="fixed top-0 left-0 h-full w-20 bg-indigo-900 flex flex-col items-center py-6 gap-6 z-40"
          >
            <div className="text-white text-center">
              <Briefcase />
              <p className="text-xs mt-2 font-semibold truncate">
                {recruiterName}
              </p>
              <p className="text-[10px] text-indigo-300">{recruiterRole}</p>
            </div>

            {[Home, BarChart3, Users, Settings].map((Icon, i) => (
              <button
                key={i}
                className="w-12 h-12 bg-indigo-800 hover:bg-indigo-600 rounded-xl flex items-center justify-center"
              >
                <Icon className="text-white w-5 h-5" />
              </button>
            ))}

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="mt-auto w-12 h-12 bg-red-500/20 hover:bg-red-500 rounded-xl flex items-center justify-center"
            >
              <LogOut className="text-red-400 hover:text-white" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="lg:ml-20 p-6 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome,{" "}
              <span className="text-indigo-600">{recruiterName}</span>
            </h1>
            <p className="text-gray-600">
              Manage jobs & applications efficiently
            </p>
          </div>

          <button
            onClick={() => setShowJobModal(true)}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl flex items-center gap-2"
          >
            <Plus size={18} /> Post Job
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500 text-sm">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
              <s.icon className="text-indigo-600" />
            </div>
          ))}
        </div>

        {/* JOBS */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-2xl shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <div className="flex gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign size={14} /> {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {job.applications}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <Eye size={16} />
                </button>
                <button className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Edit size={16} />
                </button>
                <button className="p-2 bg-red-100 text-red-600 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* APPLICATIONS */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-bold mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {applications.map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-4 rounded-xl"
              >
                <div>
                  <p className="font-semibold">{a.name}</p>
                  <p className="text-sm text-gray-500">{a.position}</p>
                </div>
                <div className="text-sm text-gray-600">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POST JOB MODAL */}
      <AnimatePresence>
        {showJobModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowJobModal(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded-2xl w-full max-w-xl"
            >
              <h2 className="text-xl font-bold mb-4">Post New Job</h2>
              <div className="space-y-3">
                <input className="w-full p-3 border rounded-xl" placeholder="Job title" />
                <input className="w-full p-3 border rounded-xl" placeholder="Location" />
                <input className="w-full p-3 border rounded-xl" placeholder="Salary" />
                <textarea
                  className="w-full p-3 border rounded-xl"
                  placeholder="Description"
                />
                <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
                  Publish Job
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
