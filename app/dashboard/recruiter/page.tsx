"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Users, FileText, TrendingUp, Calendar, Bell, 
  Plus, Search, MapPin, DollarSign, Clock, ChevronRight, 
  Eye, Edit, Trash2, Menu, Home, Settings, LogOut,
  UserCheck, Target, BarChart3, Filter, Download
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showJobModal, setShowJobModal] = useState(false);

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

  if (session.user.role !== "RECRUITER") {
    router.push("/unauthorized");
    return null;
  }

  // Stats Data
  const stats = [
    { label: 'Active Jobs', value: '24', change: '+5', color: 'from-blue-500 to-cyan-500', icon: Briefcase },
    { label: 'Total Applications', value: '847', change: '+127', color: 'from-purple-500 to-pink-500', icon: FileText },
    { label: 'Candidates Hired', value: '38', change: '+8', color: 'from-green-500 to-emerald-500', icon: UserCheck },
    { label: 'Interview Scheduled', value: '52', change: '+12', color: 'from-orange-500 to-red-500', icon: Calendar }
  ];

  // Jobs Data
  const jobs = [
    { 
      id: 1, 
      title: 'Senior React Developer', 
      department: 'Engineering',
      location: 'Remote', 
      salary: '$120k - $150k',
      applications: 145,
      status: 'active',
      posted: '2 days ago',
      type: 'Full-time'
    },
    { 
      id: 2, 
      title: 'Product Manager', 
      department: 'Product',
      location: 'San Francisco', 
      salary: '$130k - $160k',
      applications: 98,
      status: 'active',
      posted: '5 days ago',
      type: 'Full-time'
    },
    { 
      id: 3, 
      title: 'UI/UX Designer', 
      department: 'Design',
      location: 'New York', 
      salary: '$90k - $120k',
      applications: 203,
      status: 'closed',
      posted: '1 week ago',
      type: 'Full-time'
    },
    { 
      id: 4, 
      title: 'DevOps Engineer', 
      department: 'Engineering',
      location: 'Remote', 
      salary: '$110k - $140k',
      applications: 67,
      status: 'active',
      posted: '3 days ago',
      type: 'Full-time'
    }
  ];

  // Recent Applications
  const recentApplications = [
    { name: 'John Doe', position: 'React Developer', status: 'pending', time: '2 hours ago', match: '95%' },
    { name: 'Sarah Smith', position: 'Product Manager', status: 'reviewing', time: '5 hours ago', match: '88%' },
    { name: 'Mike Johnson', position: 'UI/UX Designer', status: 'interviewed', time: '1 day ago', match: '92%' },
    { name: 'Emma Wilson', position: 'DevOps Engineer', status: 'pending', time: '2 days ago', match: '85%' }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
            className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-indigo-900 to-blue-900 shadow-2xl z-40 flex flex-col items-center py-8 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center"
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>

            {[Home, Target, BarChart3, Users, Settings].map((Icon, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-indigo-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group"
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
                Recruiter <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-600">Manage jobs & applications efficiently 🎯</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowJobModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Post New Job
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="relative p-3 bg-white rounded-xl shadow-lg"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">8</span>
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
            {/* Jobs List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    {['all', 'active', 'closed', 'draft'].map((tab) => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          activeTab === tab
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                      <Filter className="w-5 h-5 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Jobs Cards */}
              <motion.div variants={itemVariants} className="space-y-4">
                {jobs.map((job) => (
                  <motion.div
                    key={job.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                            <p className="text-sm text-gray-500">{job.department}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            job.status === 'active' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {job.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{job.salary}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{job.applications} Applied</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{job.posted}</span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Applications Progress</span>
                            <span>{job.applications}/200</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                              style={{ width: `${(job.applications / 200) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 md:flex-none px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 md:flex-none px-4 py-2 bg-indigo-100 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-200 flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Recent Applications */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {recentApplications.map((app, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="p-4 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{app.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{app.name}</h4>
                          <p className="text-xs text-gray-500">{app.position}</p>
                        </div>
                        <span className="text-xs font-semibold text-green-600">{app.match}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          app.status === 'reviewing' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {app.status}
                        </span>
                        <span className="text-xs text-gray-400">{app.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {['Schedule Interview', 'Send Offer Letter', 'View Analytics', 'Export Reports'].map((action, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-3 bg-white/20 hover:bg-white/30 rounded-xl text-left font-semibold flex items-center justify-between transition-all backdrop-blur-sm"
                    >
                      {action}
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Job Modal (Simple placeholder) */}
      <AnimatePresence>
        {showJobModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowJobModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Post New Job</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Job Title" className="w-full p-3 border border-gray-300 rounded-xl" />
                <input type="text" placeholder="Department" className="w-full p-3 border border-gray-300 rounded-xl" />
                <input type="text" placeholder="Location" className="w-full p-3 border border-gray-300 rounded-xl" />
                <input type="text" placeholder="Salary Range" className="w-full p-3 border border-gray-300 rounded-xl" />
                <textarea placeholder="Job Description" rows={5} className="w-full p-3 border border-gray-300 rounded-xl" />
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold">
                    Post Job
                  </button>
                  <button 
                    onClick={() => setShowJobModal(false)}
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

export default RecruiterDashboard;