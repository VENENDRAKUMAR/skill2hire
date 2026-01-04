// app/onboarding/page.tsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();

  const handleRoleSelection = async (role: string) => {
    // API call to update role in DB
    const res = await fetch("/api/user/update-role", {
      method: "POST",
      body: JSON.stringify({ role }),
    });

    if (res.ok) {
      router.push(`/dashboard/${role.toLowerCase()}`);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-amber-50">
      <h1 className="text-3xl font-bold mb-8">How do you plan to use JobBoard?</h1>
      <div className="flex gap-6">
        {/* Card 1: Job Seeker */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => handleRoleSelection("JOBSEEKER")}
          className="p-8 bg-white border-2 border-amber-200 rounded-2xl shadow-lg cursor-pointer w-64 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="font-bold text-xl">I'm a Job Seeker</h2>
          <p className="text-sm text-gray-500 mt-2">I want to find my dream job</p>
        </motion.div>

        {/* Card 2: Recruiter */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => handleRoleSelection("RECRUITER")}
          className="p-8 bg-white border-2 border-amber-200 rounded-2xl shadow-lg cursor-pointer w-64 text-center"
        >
          <div className="text-4xl mb-4">💼</div>
          <h2 className="font-bold text-xl">I'm a Recruiter</h2>
          <p className="text-sm text-gray-500 mt-2">I want to hire top talent</p>
        </motion.div>
      </div>
    </div>
  );
}