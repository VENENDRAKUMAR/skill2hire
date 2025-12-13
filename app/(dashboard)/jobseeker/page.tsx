"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function JobseekerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.user.role !== "JOBSEEKER") {
    router.push("/unauthorized");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-indigo-600">Hello Jobseeker 👋</h1>
    </div>
  );
}
