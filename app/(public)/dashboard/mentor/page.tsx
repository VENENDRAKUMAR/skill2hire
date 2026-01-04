"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, Video, FileText, BookOpen, Star, 
  Clock, MessageSquare, Award, TrendingUp, Bell, Plus,
  Menu, Home, Settings, LogOut, Target, Send, Eye,
  CheckCircle, XCircle, Edit, Trash2, Download
} from 'lucide-react';

const MentorDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSessionModal, setShowSessionModal] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Route protection
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "MENTOR") {
    router.push("/unauthorized");
    return null;
  }

  // Stats Data
  const stats = [
    { label: 'Total Mentees', value: '42', change: '+8', color: 'from-purple-500 to-pink-500', icon: Users },
    { label: 'Sessions Completed', value: '156', change: '+23', color: 'from-blue-500 to-cyan-500', icon: Video },
    { label: 'Resources Shared', value: '89', change: '+12', color: 'from-green-500 to-emerald-500', icon: BookOpen },
    { label: 'Avg Rating', value: '4.8', change: '+0.3', color: 'from-orange-500 to-red-500', icon: Star }
  ];

  // Mentees Data
  const mentees = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      progress: 75, 
      sessions: 12, 
      lastSession: '2 days ago',
      status: 'active',
      goal: 'Frontend Developer',
      avatar: 'AJ'
    },
    { 
      id: 2, 
      name: 'Maria Garcia', 
      progress: 60, 
      sessions: 8, 
      lastSession: '1 week ago',
      status: 'active',
      goal: 'Full Stack Dev',
      avatar: 'MG'
    },
    { 
      id: 3, 
      name: 'David Lee', 
      progress: 90, 
      sessions: 18, 
      lastSession: '3 days ago',
      status: 'completed',
      goal: 'React Specialist',
      avatar: 'DL'
    },
    { 
      id: 4, 
      name: 'Sarah Wilson', 
      progress: 45, 
      sessions: 5, 
      lastSession: '5 days ago',
      status: 'active',
      goal: 'UI/UX Developer',
      avatar: 'SW'
    }
  ];

  // Upcoming Sessions
  const upcomingSessions = [
    { 
      mentee: 'Alex Johnson', 
      topic: 'React State Management', 
      date: 'Today', 
      time: '2:00 PM',
      duration: '1 hour',
      type: 'video'
    },
    { 
      mentee: 'Maria Garcia', 
      topic: 'Career Guidance', 
      date: 'Tomorrow', 
      time: '10:00 AM',
      duration: '45 mins',
      type: 'chat'
    },
    { 
      mentee: 'Sarah Wilson', 
      topic: 'Portfolio Review', 
      date: 'Dec 18', 
      time: '4:00 PM',
      duration: '1 hour',
      type: 'video'
    }
  ];

  // Session Notes
  const sessionNotes = [
    {
      id: 1,
      mentee: 'Alex Johnson',
      topic: 'Redux Toolkit Implementation',
      date: 'Dec 14, 2024',
      notes: 'Covered Redux basics, middleware, and async thunks. Assigned mini-project.',
      resources: ['Redux Docs', 'Tutorial Video'],
      status: 'completed'
    },
    {
      id: 2,
      mentee: 'David Lee',
      topic: 'React Performance Optimization',
      date: 'Dec 13, 2024',
      notes: 'Discussed memo, useMemo, useCallback. Code review of his project.',
      resources: ['React Docs', 'Performance Guide'],
      status: 'completed'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Mobile Menu */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || isLargeScreen) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-purple-900 to-pink-900 shadow-2xl z-40 flex flex-col items-center py-8 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center"
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>

            {[Home, Users, Calendar, BookOpen, Settings].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-purple-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.2 }}
              className="mt-auto w-12 h-12 bg-red-500/20 hover:bg-red-500 rounded-xl flex items-center justify-center transition-all"
            >
              <LogOut className="w-5 h-5 text-red-400 hover:text-white" />
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
                Mentor <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-600">Guide & empower your mentees 🚀</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSessionModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Schedule Session
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative p-3 bg-white rounded-xl shadow-lg"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">5</span>
              </motion.button>
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
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{stat.change}</span>
                  </div>
                  <h3 className="text-sm opacity-90 mb-1">{stat.label}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Mentees & Sessions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex gap-2 mb-6">
                  {['overview', 'mentees', 'notes'].map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>

                {/* Mentees List */}
                {activeTab === 'mentees' && (
                  <div className="space-y-4">
                    {mentees.map((mentee) => (
                      <motion.div
                        key={mentee.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">{mentee.avatar}</span>
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-800">{mentee.name}</h3>
                              <p className="text-sm text-gray-600">{mentee.goal}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            mentee.status === 'active' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-blue-100 text-blue-600'
                          }`}>
                            {mentee.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Sessions</p>
                            <p className="text-lg font-bold text-gray-800">{mentee.sessions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Progress</p>
                            <p className="text-lg font-bold text-gray-800">{mentee.progress}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Session</p>
                            <p className="text-sm font-semibold text-gray-800">{mentee.lastSession}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all"
                              style={{ width: `${mentee.progress}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 px-4 py-2 bg-pink-100 text-pink-600 rounded-xl font-semibold hover:bg-pink-200 flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Session Notes */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {sessionNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{note.topic}</h3>
                            <p className="text-sm text-gray-600">{note.mentee}</p>
                          </div>
                          <span className="text-xs text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">{note.notes}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {note.resources.map((resource, i) => (
                            <span key={i} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold">
                              📎 {resource}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl text-sm font-semibold hover:bg-purple-200 flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-200 flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Overview */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">This Week's Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-purple-600">8</p>
                          <p className="text-sm text-gray-600">Sessions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-pink-600">12</p>
                          <p className="text-sm text-gray-600">Hours</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-indigo-600">24</p>
                          <p className="text-sm text-gray-600">Messages</p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-600">5</p>
                          <p className="text-sm text-gray-600">Resources</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {['Completed session with Alex', 'Shared React tutorial with Maria', 'Reviewed David\'s portfolio', 'Scheduled session with Sarah'].map((activity, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-sm text-gray-700">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Sessions */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Sessions</h3>
                <div className="space-y-3">
                  {upcomingSessions.map((session, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-purple-600" />
                        <h4 className="font-semibold text-gray-800 text-sm">{session.mentee}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{session.topic}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-600 font-semibold">{session.date} • {session.time}</span>
                        <span className="text-gray-500">{session.duration}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Resources */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Resource Library</h3>
                <div className="space-y-3">
                  {['React Docs', 'Interview Prep', 'Coding Challenges', 'Career Guide'].map((resource, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl text-left font-semibold flex items-center justify-between backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {resource}
                      </div>
                      <Send className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Session Modal */}
      <AnimatePresence>
        {showSessionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSessionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Session</h2>
              <div className="space-y-4">
                <select className="w-full p-3 border border-gray-300 rounded-xl">
                  <option>Select Mentee</option>
                  {mentees.map(m => <option key={m.id}>{m.name}</option>)}
                </select>
                <input type="text" placeholder="Session Topic" className="w-full p-3 border border-gray-300 rounded-xl" />
                <input type="date" className="w-full p-3 border border-gray-300 rounded-xl" />
                <input type="time" className="w-full p-3 border border-gray-300 rounded-xl" />
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold">
                    Schedule
                  </button>
                  <button 
                    onClick={() => setShowSessionModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorDashboard;