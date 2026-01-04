"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "JOBSEEKER" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { id: "JOBSEEKER", label: "Candidate", icon: <User size={18} /> },
    { id: "RECRUITER", label: "Recruiter", icon: <Briefcase size={18} /> },
    { id: "MENTOR", label: "Mentor", icon: <GraduationCap size={18} /> },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      router.push(`/login?email=${form.email}&registered=true`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-amber-600 p-8 text-white text-center">
          <h1 className="text-3xl font-black italic">Skill 2 Hire</h1>
          <p className="text-amber-100 text-sm mt-2">Create your professional profile</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Role Selection Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setForm({...form, role: r.id})}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${form.role === r.id ? "bg-white text-amber-600 shadow-sm" : "text-gray-400"}`}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          <input type="text" placeholder="Full Name" required className="w-full border-b-2 border-gray-100 focus:border-amber-600 outline-none py-2 transition-all" onChange={(e)=>setForm({...form, name: e.target.value})} />
          <input type="email" placeholder="Email Address" required className="w-full border-b-2 border-gray-100 focus:border-amber-600 outline-none py-2 transition-all" onChange={(e)=>setForm({...form, email: e.target.value})} />
          <input type="password" placeholder="Password" required className="w-full border-b-2 border-gray-100 focus:border-amber-600 outline-none py-2 transition-all" onChange={(e)=>setForm({...form, password: e.target.value})} />

          {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-2 rounded">{error}</p>}

          <button disabled={loading} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black hover:bg-amber-600 transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "CREATE ACCOUNT"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}