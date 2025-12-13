"use client";
import { useRouter } from "next/navigation";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-700 mb-4">
          Welcome to VBizGro JobBoard 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Let's build your career profile and unlock your dashboard.
        </p>
        <button
          onClick={() => router.push("/jobseeker/register")}
          className="px-6 py-3 bg-amber-600 text-white rounded-md shadow-md hover:bg-amber-700 transition"
        >
          Start Your Journey
        </button>
      </div>
    </div>
  );
}
