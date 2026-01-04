"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { HiCube } from "react-icons/hi";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      handleFinalRedirect(session.user);
    }
  }, [status, session]);

  const handleFinalRedirect = (user: any) => {
    // Agar naya user hai toh onboarding pe bhejo
    if (user.isNewUser) {
      router.push("/onboarding");
      return;
    }
    // Purana user hai toh role ke hisab se dashboard
    const routes: any = {
      ADMIN: "/dashboard/admin",
      RECRUITER: "/dashboard/recruiter",
      MENTOR: "/dashboard/mentor",
      JOBSEEKER: "/dashboard/jobseeker",
    };
    router.push(routes[user.role] || "/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email.toLowerCase(),
      password: form.password,
    });

    if (!res?.ok) {
      setError("Invalid Email or Password");
      setLoading(false);
    }
    // useEffect handle kar lega agar res.ok hai
  };

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-amber-50 to-beige-200 overflow-hidden">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white z-10">
        <div className="max-w-md mx-auto w-full">
          <HiCube className="text-6xl text-amber-600 mb-4" />
          <h2 className="text-3xl font-bold mb-6">Login</h2>
          
          <button 
            onClick={() => signIn("google")} 
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md mb-4 hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" /> Login with Google
          </button>

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" required className="w-full border p-2 rounded-md" onChange={(e)=>setForm({...form, email: e.target.value})} />
            <input type="password" placeholder="Password" required className="w-full border p-2 rounded-md" onChange={(e)=>setForm({...form, password: e.target.value})} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-amber-600 text-white py-2 rounded-md">
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-center">No account? <a href="/register" className="text-amber-600">Sign up</a></p>
        </div>
      </motion.div>
      <div className="hidden md:block w-1/2 bg-amber-100 relative">
          <div className="flex items-center justify-center h-full text-4xl font-bold text-amber-800">Skill to Hire</div>
      </div>
    </div>
  );
}