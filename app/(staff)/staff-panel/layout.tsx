export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Yahan tera Sidebar ayega */}
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h2 className="text-xl font-bold mb-10">Staff Portal</h2>
        <nav className="space-y-4">
          <p className="text-gray-400 text-sm">Main Menu</p>
          {/* Links according to roles */}
          <div className="hover:text-blue-400 cursor-pointer">Dashboard</div>
          <div className="hover:text-blue-400 cursor-pointer">Settings</div>
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}