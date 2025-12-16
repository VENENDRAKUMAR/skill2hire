"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Shield, Activity, TrendingUp, AlertCircle, CheckCircle,
  XCircle, Eye, Ban, Mail, Send, Search, Filter, Download,
  Menu, Home, Settings, LogOut, BarChart3, UserCheck, UserX,
  Briefcase, Award, MessageSquare, FileText, Calendar, Bell,
  X, ChevronRight, DownloadCloud, Trash2, Edit, Clock, Globe,
  CreditCard, Database, Server, ShieldCheck, AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showActivityDetail, setShowActivityDetail] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [notificationCount, setNotificationCount] = useState(23);

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "ADMIN") {
    router.push("/unauthorized");
    return null;
  }

  // Platform Stats
  const platformStats = [
    { label: 'Total Users', value: '2,847', change: '+142', color: 'from-blue-500 to-cyan-500', icon: Users },
    { label: 'Active Jobs', value: '347', change: '+28', color: 'from-purple-500 to-pink-500', icon: Briefcase },
    { label: 'Pending Verifications', value: '23', change: '-5', color: 'from-orange-500 to-red-500', icon: AlertCircle },
    { label: 'Platform Revenue', value: '$284k', change: '+12%', color: 'from-green-500 to-emerald-500', icon: TrendingUp }
  ];

  // Users by Role
  const usersByRole = [
    { role: 'Job Seekers', count: 1847, percentage: 65, color: 'bg-blue-500', status: 'active' },
    { role: 'Recruiters', count: 542, percentage: 19, color: 'bg-purple-500', status: 'active' },
    { role: 'Mentors', count: 458, percentage: 16, color: 'bg-pink-500', status: 'active' }
  ];

  // Pending Verifications
  const pendingUsers = [
    {
      id: 1,
      name: 'John Developer',
      email: 'john@example.com',
      role: 'JOBSEEKER',
      registeredAt: '2 hours ago',
      documents: 3,
      status: 'pending',
      profileComplete: 95,
      bio: 'Full-stack developer with 5+ years experience in React and Node.js',
      location: 'San Francisco, CA',
      company: 'Self-employed',
      verificationLevel: 'Standard',
      documentsList: ['ID Proof', 'Resume', 'Portfolio']
    },
    {
      id: 2,
      name: 'Tech Corp',
      email: 'hr@techcorp.com',
      role: 'RECRUITER',
      registeredAt: '5 hours ago',
      documents: 2,
      status: 'pending',
      profileComplete: 88,
      bio: 'Tech company specializing in AI solutions',
      location: 'New York, NY',
      company: 'Tech Corp Inc.',
      verificationLevel: 'Premium',
      documentsList: ['Business License', 'Company ID']
    },
    {
      id: 3,
      name: 'Sarah Mentor',
      email: 'sarah@mentor.com',
      role: 'MENTOR',
      registeredAt: '1 day ago',
      documents: 4,
      status: 'reviewing',
      profileComplete: 100,
      bio: 'Career coach specializing in tech industry transitions',
      location: 'Austin, TX',
      company: 'Career Growth Academy',
      verificationLevel: 'Premium',
      documentsList: ['Certifications', 'Resume', 'References', 'Portfolio']
    },
    {
      id: 4,
      name: 'Mike Recruiter',
      email: 'mike@company.com',
      role: 'RECRUITER',
      registeredAt: '2 days ago',
      documents: 3,
      status: 'pending',
      profileComplete: 92,
      bio: 'Technical recruiter with 8 years experience',
      location: 'Seattle, WA',
      company: 'StartupHub',
      verificationLevel: 'Standard',
      documentsList: ['ID Proof', 'Company Verification', 'Resume']
    }
  ];

  // All Users Management
  const allUsers = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'JOBSEEKER',
      status: 'active',
      joinedAt: 'Jan 15, 2024',
      lastActive: '2 mins ago',
      activity: 'High',
      jobsApplied: 24,
      profileViews: 156,
      verified: true
    },
    {
      id: 2,
      name: 'Google Inc',
      email: 'recruiter@google.com',
      role: 'RECRUITER',
      status: 'active',
      joinedAt: 'Feb 20, 2024',
      lastActive: '1 hour ago',
      activity: 'Medium',
      jobsPosted: 15,
      candidatesHired: 47,
      verified: true
    },
    {
      id: 3,
      name: 'David Mentor',
      email: 'david@mentor.com',
      role: 'MENTOR',
      status: 'active',
      joinedAt: 'Mar 10, 2024',
      lastActive: '5 mins ago',
      activity: 'High',
      sessionsCompleted: 89,
      rating: 4.9,
      verified: true
    },
    {
      id: 4,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'JOBSEEKER',
      status: 'blocked',
      joinedAt: 'Apr 05, 2024',
      lastActive: '2 days ago',
      activity: 'Low',
      jobsApplied: 3,
      profileViews: 12,
      verified: false
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'JOBSEEKER',
      status: 'active',
      joinedAt: 'May 12, 2024',
      lastActive: '30 mins ago',
      activity: 'Medium',
      jobsApplied: 8,
      profileViews: 45,
      verified: true
    },
    {
      id: 6,
      name: 'Microsoft Corp',
      email: 'careers@microsoft.com',
      role: 'RECRUITER',
      status: 'active',
      joinedAt: 'Jun 01, 2024',
      lastActive: '15 mins ago',
      activity: 'High',
      jobsPosted: 32,
      candidatesHired: 128,
      verified: true
    }
  ];

  // Recent Activities
  const recentActivities = [
    { id: 1, action: 'User Verified', user: 'John Developer', time: '5 mins ago', type: 'success', details: 'Manual verification completed', ip: '192.168.1.1' },
    { id: 2, action: 'Job Posted', user: 'Tech Corp', time: '15 mins ago', type: 'info', details: 'Senior React Developer position', ip: '203.0.113.1' },
    { id: 3, action: 'User Blocked', user: 'Spam Account', time: '1 hour ago', type: 'warning', details: 'Multiple policy violations', ip: '198.51.100.1' },
    { id: 4, action: 'Mentor Approved', user: 'Sarah Mentor', time: '2 hours ago', type: 'success', details: 'Premium mentor status granted', ip: '192.168.1.2' },
    { id: 5, action: 'Report Received', user: 'Anonymous', time: '3 hours ago', type: 'alert', details: 'Inappropriate content report', ip: 'N/A' },
    { id: 6, action: 'New Job Seeker Registered', user: 'Mike Johnson', time: '4 hours ago', type: 'info', details: 'Standard verification required', ip: '203.0.113.2' },
    { id: 7, action: 'Job Application Submitted', user: 'Sarah Wilson', time: '5 hours ago', type: 'info', details: 'Applied for Senior Developer role', ip: '198.51.100.2' },
    { id: 8, action: 'Mentor Session Completed', user: 'David Lee', time: '6 hours ago', type: 'success', details: 'Session rated 5 stars', ip: '192.168.1.3' },
    { id: 9, action: 'Payment Processed', user: 'Premium User', time: '7 hours ago', type: 'success', details: '$299 for annual subscription', ip: '203.0.113.3' },
    { id: 10, action: 'Account Suspended', user: 'Violation User', time: '8 hours ago', type: 'warning', details: 'TOS violation - spam activities', ip: '198.51.100.3' }
  ];

  // System Metrics
  const systemMetrics = [
    { label: 'Server Uptime', value: '99.9%', status: 'good', icon: Server },
    { label: 'API Response', value: '124ms', status: 'good', icon: Activity },
    { label: 'Database Load', value: '42%', status: 'normal', icon: Database },
    { label: 'Active Sessions', value: '1,247', status: 'normal', icon: Users },
    { label: 'Storage Used', value: '78%', status: 'warning', icon: Database },
    { label: 'Security Score', value: 'A+', status: 'good', icon: ShieldCheck }
  ];

  // Quick Actions
  const quickActions = [
    { label: 'Send Announcement', icon: Send, color: 'from-blue-500 to-cyan-500' },
    { label: 'Generate Report', icon: FileText, color: 'from-purple-500 to-pink-500' },
    { label: 'Backup Data', icon: DownloadCloud, color: 'from-green-500 to-emerald-500' },
    { label: 'Security Scan', icon: ShieldCheck, color: 'from-red-500 to-orange-500' }
  ];

  const handleVerifyUser = (userId, approve) => {
    console.log(`${approve ? 'Approved' : 'Rejected'} user ${userId}`);
    // API call would go here
    setShowModal(false);
    setNotificationCount(prev => prev - 1);
  };

  const handleBlockUser = (userId) => {
    console.log(`Blocked user ${userId}`);
    // API call would go here
  };

  const handleSendEmail = (userId) => {
    console.log(`Sending email to user ${userId}`);
    // API call would go here
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Export logic here
  };

  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    setShowActivityDetail(true);
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const filteredActivities = recentActivities.filter(activity =>
    activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50">
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
            className="fixed left-0 top-0 h-full w-20 bg-gradient-to-b from-slate-900 to-gray-900 shadow-2xl z-40 flex flex-col items-center py-8 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center cursor-pointer"
              onClick={() => setActiveTab('overview')}
            >
              <Shield className="w-6 h-6 text-white" />
            </motion.div>

            {[
              { icon: Home, tab: 'overview' },
              { icon: Users, tab: 'users' },
              { icon: BarChart3, tab: 'stats' },
              { icon: Activity, tab: 'activity' },
              { icon: Settings, tab: 'settings' }
            ].map(({ icon: Icon, tab }, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setActiveTab(tab);
                  if (!isLargeScreen) setSidebarOpen(false);
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-red-500 to-orange-600' 
                    : 'bg-slate-800 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-600'
                }`}
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                // Logout logic here
                router.push('/login');
              }}
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
                Admin <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Control Panel</span>
              </h1>
              <p className="text-gray-600">Complete platform monitoring & management 🛡️</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportData}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Report
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-3 bg-white rounded-xl shadow-lg"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {platformStats.map((stat, i) => (
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

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl text-white shadow-lg flex flex-col items-center justify-center gap-2`}
                >
                  <action.icon className="w-6 h-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <div className="flex flex-wrap gap-2">
              {['overview', 'users', 'verifications', 'activity', 'system', 'reports'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User Distribution */}
              <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">User Distribution</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Active: 2,804</span>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Pending: 23</span>
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>Blocked: 20</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {usersByRole.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                          <span className="font-semibold text-gray-700">{item.role}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">{item.count} users</span>
                          <span className="text-gray-500">({item.percentage}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`${item.color} h-3 rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">2,847</p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">2,804</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-xl">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">23</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">20</p>
                    <p className="text-sm text-gray-600">Blocked</p>
                  </div>
                </div>
              </motion.div>

              {/* System Metrics */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">System Metrics</h3>
                <div className="space-y-4">
                  {systemMetrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <metric.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">{metric.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${
                          metric.status === 'good' ? 'text-green-600' :
                          metric.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                        }`}>
                          {metric.value}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          metric.status === 'good' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold text-gray-800">Attention Required</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Storage usage is at 78%. Consider upgrading or cleaning up old data.</p>
                  <button className="text-sm text-red-600 font-semibold hover:underline">
                    Take Action →
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Users Management Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Filters */}
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">All Users Management</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="all">All Roles</option>
                      <option value="JOBSEEKER">Job Seekers</option>
                      <option value="RECRUITER">Recruiters</option>
                      <option value="MENTOR">Mentors</option>
                    </select>
                    <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                      <Filter className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">User</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="px6 py-4 text-left text-sm font-semibold text-gray-600">Joined</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Activity</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
                                </div>
                                {user.verified && (
                                  <ShieldCheck className="absolute -bottom-1 -right-1 w-4 h-4 text-green-500 bg-white rounded-full" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-800">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'JOBSEEKER' ? 'bg-blue-100 text-blue-600' :
                              user.role === 'RECRUITER' ? 'bg-purple-100 text-purple-600' :
                              'bg-pink-100 text-pink-600'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === 'active' ? 'bg-green-100 text-green-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{user.joinedAt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                user.activity === 'High' ? 'bg-green-500' :
                                user.activity === 'Medium' ? 'bg-yellow-500' : 'bg-gray-400'
                              }`} />
                              <span className="text-sm font-medium text-gray-700">{user.activity}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setSelectedUser(user);
                                  setShowModal(true);
                                }}
                                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleSendEmail(user.id)}
                                className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                                title="Send Email"
                              >
                                <Mail className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleBlockUser(user.id)}
                                className={`p-2 rounded-lg ${
                                  user.status === 'blocked'
                                    ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                    : 'bg-red-100 text-red-600 hover:bg-red-200'
                                }`}
                                title={user.status === 'blocked' ? 'Unblock' : 'Block'}
                              >
                                <Ban className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredUsers.length} of {allUsers.length} users
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl">
                      1
                    </button>
                    <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                      2
                    </button>
                    <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                      Next
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                    <h4 className="font-bold text-gray-800">New Users (30 days)</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-2">+342</p>
                  <p className="text-sm text-gray-600">↗ 12% increase from last month</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-gray-800">Active Rate</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-2">94.7%</p>
                  <p className="text-sm text-gray-600">↗ 2.3% increase from last week</p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="w-6 h-6 text-purple-600" />
                    <h4 className="font-bold text-gray-800">Premium Users</h4>
                  </div>
                  <p className="text-3xl font-bold text-gray-800 mb-2">428</p>
                  <p className="text-sm text-gray-600">15% of total user base</p>
                </motion.div>
              </div>
            </div>
          )}

          {/* Pending Verifications Tab */}
          {activeTab === 'verifications' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Pending Verifications</h3>
                  <p className="text-gray-600 mt-1">Review and approve user verification requests</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl font-semibold">
                    {pendingUsers.length} Pending
                  </span>
                  <span className="px-4 py-2 bg-green-100 text-green-600 rounded-xl font-semibold">
                    12 Approved Today
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ scale: 1.01 }}
                    className="border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start md:items-center gap-4 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{user.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                              <h4 className="text-lg font-bold text-gray-800">{user.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.role === 'JOBSEEKER' ? 'bg-blue-100 text-blue-600' :
                                user.role === 'RECRUITER' ? 'bg-purple-100 text-purple-600' :
                                'bg-pink-100 text-pink-600'
                              }`}>
                                {user.role}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                user.verificationLevel === 'Premium' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-gray-100 text-gray-600'
                              }`}>
                                {user.verificationLevel}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 text-sm">{user.bio}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">Registered</p>
                            <p className="text-sm font-semibold text-gray-800">{user.registeredAt}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-semibold text-gray-800">{user.location}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Documents</p>
                            <p className="text-sm font-semibold text-gray-800">{user.documents} files</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Status</p>
                            <p className={`text-sm font-semibold ${
                              user.status === 'pending' ? 'text-yellow-600' :
                              user.status === 'reviewing' ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-1">Documents Submitted:</p>
                          <div className="flex flex-wrap gap-2">
                            {user.documentsList.map((doc, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full"
                            style={{ width: `${user.profileComplete}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 text-right">{user.profileComplete}% Profile Complete</p>
                      </div>

                      <div className="flex md:flex-col gap-2 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          className="flex-1 md:flex-none px-6 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleVerifyUser(user.id, true)}
                          className="flex-1 md:flex-none px-6 py-2 bg-green-100 text-green-600 rounded-xl font-semibold hover:bg-green-200 flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleVerifyUser(user.id, false)}
                          className="flex-1 md:flex-none px-6 py-2 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSendEmail(user.id)}
                          className="flex-1 md:flex-none px-6 py-2 bg-orange-100 text-orange-600 rounded-xl font-semibold hover:bg-orange-200 flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Contact
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Activity Log</h3>
                  <div className="flex gap-3">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>Last 24 hours</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>All time</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>All Activities</option>
                      <option>User Actions</option>
                      <option>System Events</option>
                      <option>Security Events</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      whileHover={{ x: 5 }}
                      onClick={() => handleViewActivity(activity)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' :
                        activity.type === 'warning' ? 'bg-yellow-500' :
                        activity.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Showing {filteredActivities.length} of {recentActivities.length} activities
                  </p>
                  <button className="px-4 py-2 text-red-600 font-semibold hover:underline">
                    Load More Activities
                  </button>
                </div>
              </motion.div>

              {/* Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">1,247</p>
                      <p className="text-sm text-gray-600">Successful Actions</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="w-4/5 bg-green-500 h-2 rounded-full"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">43</p>
                      <p className="text-sm text-gray-600">Warnings</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="w-1/5 bg-yellow-500 h-2 rounded-full"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">18</p>
                      <p className="text-sm text-gray-600">Alerts</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="w-1/10 bg-red-500 h-2 rounded-full"></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">5,832</p>
                      <p className="text-sm text-gray-600">Total Activities</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="w-full bg-blue-500 h-2 rounded-full"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">System Configuration</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700">Platform Settings</h4>
                  {[
                    { label: 'Allow New Registrations', value: true },
                    { label: 'Require Email Verification', value: true },
                    { label: 'Enable Two-Factor Auth', value: false },
                    { label: 'Maintenance Mode', value: false },
                    { label: 'Allow User Deletion', value: true },
                    { label: 'Enable API Access', value: true }
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="font-medium text-gray-700">{setting.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={setting.value} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-700">Security Settings</h4>
                  <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                      <div>
                        <h5 className="font-bold text-gray-800">Security Score: 94/100</h5>
                        <p className="text-sm text-gray-600">Your platform security is excellent</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Password Strength</span>
                        <span className="text-sm font-semibold text-green-600">Strong</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">SSL Certificate</span>
                        <span className="text-sm font-semibold text-green-600">Valid</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Firewall</span>
                        <span className="text-sm font-semibold text-green-600">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h5 className="font-bold text-gray-800 mb-2">Database Backup</h5>
                    <p className="text-sm text-gray-600 mb-3">Last backup: 2 hours ago</p>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
                      Backup Now
                    </button>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <h5 className="font-bold text-gray-800 mb-2">Cache Management</h5>
                    <p className="text-sm text-gray-600 mb-3">Cache size: 245 MB</p>
                    <button className="w-full py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700">
                      Clear Cache
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Reports & Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'User Growth Report', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
                  { label: 'Revenue Analytics', icon: CreditCard, color: 'from-green-500 to-emerald-500' },
                  { label: 'Security Audit', icon: Shield, color: 'from-red-500 to-orange-500' }
                ].map((report, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-br ${report.color} p-6 rounded-2xl text-white`}
                  >
                    <report.icon className="w-8 h-8 mb-4" />
                    <h4 className="font-bold mb-2">{report.label}</h4>
                    <p className="text-sm opacity-90 mb-4">Generate detailed PDF report</p>
                    <button className="px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30">
                      Generate
                    </button>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-700">Recent Reports</h4>
                {[
                  { name: 'Monthly User Report - Nov 2024', date: 'Dec 1, 2024', size: '2.4 MB' },
                  { name: 'Security Audit Report', date: 'Nov 28, 2024', size: '1.8 MB' },
                  { name: 'Revenue Analytics Q3', date: 'Nov 25, 2024', size: '3.2 MB' },
                  { name: 'System Performance Report', date: 'Nov 20, 2024', size: '4.1 MB' }
                ].map((report, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-800">{report.name}</p>
                        <p className="text-sm text-gray-600">Generated on {report.date} • {report.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">
                        Download
                      </button>
                      <button className="px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
                    <p className="text-gray-600">Complete user information and actions</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{selectedUser.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h4>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedUser.role === 'JOBSEEKER' ? 'bg-blue-100 text-blue-600' :
                          selectedUser.role === 'RECRUITER' ? 'bg-purple-100 text-purple-600' :
                          'bg-pink-100 text-pink-600'
                        }`}>
                          {selectedUser.role}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedUser.status === 'active' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {selectedUser.status}
                        </span>
                        {selectedUser.verified && (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedUser.bio && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Bio</h5>
                      <p className="text-gray-600">{selectedUser.bio}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Joined At</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedUser.joinedAt || selectedUser.registeredAt}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedUser.lastActive}</p>
                    </div>
                    {selectedUser.location && (
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-lg font-semibold text-gray-800">{selectedUser.location}</p>
                      </div>
                    )}
                    {selectedUser.company && (
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="text-lg font-semibold text-gray-800">{selectedUser.company}</p>
                      </div>
                    )}
                  </div>

                  {selectedUser.documentsList && (
                    <div>
                      <h5 className="font-semibold text-gray-700 mb-2">Documents</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.documentsList.map((doc, idx) => (
                          <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSendEmail(selectedUser.id)}
                          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                        >
                          Send Message
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBlockUser(selectedUser.id)}
                          className={`px-6 py-3 rounded-xl font-semibold ${
                            selectedUser.status === 'blocked'
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {selectedUser.status === 'blocked' ? 'Unblock User' : 'Block User'}
                        </motion.button>
                      </div>
                      {selectedUser.status === 'pending' && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVerifyUser(selectedUser.id, false)}
                            className="px-6 py-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200"
                          >
                            Reject
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleVerifyUser(selectedUser.id, true)}
                            className="px-6 py-3 bg-green-100 text-green-600 rounded-xl font-semibold hover:bg-green-200"
                          >
                            Approve
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {showActivityDetail && selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowActivityDetail(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Activity Details</h3>
                    <p className="text-gray-600">Complete activity information</p>
                  </div>
                  <button
                    onClick={() => setShowActivityDetail(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedActivity.type === 'success' ? 'bg-green-500' :
                      selectedActivity.type === 'warning' ? 'bg-yellow-500' :
                      selectedActivity.type === 'alert' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <span className={`font-semibold ${
                      selectedActivity.type === 'success' ? 'text-green-600' :
                      selectedActivity.type === 'warning' ? 'text-yellow-600' :
                      selectedActivity.type === 'alert' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {selectedActivity.type.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Action</p>
                    <p className="text-lg font-semibold text-gray-800">{selectedActivity.action}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Details</p>
                    <p className="text-gray-700">{selectedActivity.details}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">User</p>
                    <p className="text-gray-700">{selectedActivity.user}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-gray-700">{selectedActivity.time}</p>
                  </div>

                  {selectedActivity.ip && (
                    <div>
                      <p className="text-sm text-gray-500">IP Address</p>
                      <p className="text-gray-700">{selectedActivity.ip}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowActivityDetail(false)}
                      className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:opacity-90"
                    >
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="lg:ml-20 mt-8 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 Admin Dashboard. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-red-600 text-sm">Support</a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">
            Version 2.1.4 • Last updated: Dec 16, 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;