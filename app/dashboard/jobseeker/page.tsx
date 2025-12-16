

//  this is an  client side  dashboard  for jobseeker
"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, FileText, Award, TrendingUp, Calendar, Bell, 
  Search, MapPin, DollarSign, Clock, ChevronRight, Star,
  Upload, Check, X, Menu, Home, User, Settings, LogOut,
  BookOpen, Target, MessageSquare
} from 'lucide-react';

const JobSeekerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(60);

  // Dummy Data
  const stats = [
    { label: 'Total Jobs', value: '12', color: 'from-cyan-400 to-blue-500', icon: Briefcase, badge: 'New 4' },
    { label: 'Application Progress', value: '5', color: 'from-purple-400 to-pink-500', icon: FileText, badge: '3 In process' },
    { label: 'Upcoming Interview', value: '2', color: 'from-orange-400 to-red-500', icon: Calendar, badge: 'Tomorrow' },
    { label: 'Profile Score', value: '85%', color: 'from-green-400 to-emerald-500', icon: Award, badge: 'Good' }
  ];

  const upcomingInterview = {
    company: 'Google',
    position: '19 sec ago',
    salary: '$100,000/year',
    time: 'Tomorrow'
  };

  const recommendations = [
    { title: 'Full Stack', status: 'West an', time: '17 seqs. Filtil', tag: 'Hot' },
    { title: 'Job Designer', status: 'Added', time: '1 meath ago', tag: 'New' }
  ];

  const certifications = [
    'Complete Frontend Coding Camp',
    'Firebase Certification',
    'Azuro Certifications'
  ];

  const notifications = [
    { title: 'Important Notifications', message: '2 actions within your Jobs.', time: '2m ago', unread: true },
    { title: 'Application Update', message: 'Your application was reviewed', time: '1h ago', unread: true },
    { title: 'New Job Match', message: 'Senior React Developer', time: '3h ago', unread: false }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const calendar = [
    [1, 3, 4, 5, 9, 7],
    [8, 9, 10, 12, 10, 14],
    [15, 10, 17, 15, 10, 21],
    [23, 23, 21, 60, 29, 27],
    [29, 33, 31, 1, 2, 3]
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl z-40 flex flex-col items-center py-8 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center"
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>

            {[Home, Target, BookOpen, User, Settings].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.2 }}
              className="mt-auto w-12 h-12 bg-red-500/20 hover:bg-red-500 rounded-xl flex items-center justify-center transition-all"
            >
              <LogOut className="w-5 h-5 text-red-500 hover:text-white" />
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="lg:ml-20 p-4 lg:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Welcome, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Alice</span>
              </h1>
              <p className="text-gray-600">Welcome back! 👋</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 bg-white rounded-xl shadow-lg"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
              </motion.button>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-lg cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">Alice Wilsom</p>
                  <p className="text-xs text-gray-500">JobSeeker</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-3xl shadow-xl text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <stat.icon className="w-8 h-8" />
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">{stat.badge}</span>
                  </div>
                  <h3 className="text-sm opacity-90 mb-1">{stat.label}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full flex items-center justify-center relative"
                  >
                    <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-pink-600" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white"
                    ></motion.div>
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Allice Wilsom</h3>
                    <p className="text-purple-600 font-semibold mb-3">Welcome bach! →</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">React Developer</span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">Verified ✓</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </motion.div>

              {/* Notification Banner */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-3xl p-6 flex items-center gap-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0"
                >
                  <Bell className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Important Notifications</h4>
                  <p className="text-sm text-gray-600">2 actions within your Jobs.</p>
                </div>
              </motion.div>

              {/* Calendar & Performance */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Calendar */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Calendar</h3>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm font-semibold">Today</span>
                  </div>

                  <div className="flex justify-between items-center mb-4 text-sm">
                    <button className="p-1 hover:bg-gray-100 rounded">←</button>
                    <span className="font-semibold">July 2024</span>
                    <button className="p-1 hover:bg-gray-100 rounded">→</button>
                  </div>

                  <div className="grid grid-cols-6 gap-2 text-xs text-gray-500 mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-semibold">{day}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {calendar.flat().map((date, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedDate(date)}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                          date === selectedDate
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {date}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Performance Chart */}
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Performance</h3>
                    <button className="text-sm text-blue-600 font-semibold">View All →</button>
                  </div>

                  <div className="relative h-40">
                    <svg className="w-full h-full" viewBox="0 0 200 80">
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                        d="M 0 60 Q 30 30, 50 40 T 100 35 T 150 45 T 200 30"
                        stroke="url(#gradient1)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.3 }}
                        d="M 0 70 Q 30 50, 50 55 T 100 50 T 150 60 T 200 45"
                        stroke="url(#gradient2)"
                        strokeWidth="3"
                        fill="none"
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mt-4 text-xs text-gray-500 text-center">
                    {['M', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <div key={i}>{d}</div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Upcoming Interview */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Interview</h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
                      <span className="text-2xl">G</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{upcomingInterview.company}</h4>
                      <p className="text-xs text-gray-500">{upcomingInterview.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-gray-700">{upcomingInterview.salary}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-semibold">{upcomingInterview.time}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Join Now
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Recommended Jobs */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recommended</h3>
                <div className="space-y-3">
                  {recommendations.map((job, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-800">{job.title}</h4>
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">{job.tag}</span>
                        </div>
                        <p className="text-xs text-gray-500">{job.time}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">{job.status}</span>
                        <p className="text-xs text-gray-400">a media ago</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Certifications & Courses</h3>
                <div className="space-y-3">
                  {certifications.map((cert, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex justify-between items-center p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 rounded-xl transition-all cursor-pointer group"
                    >
                      <span className="text-gray-700 font-medium">{cert}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;