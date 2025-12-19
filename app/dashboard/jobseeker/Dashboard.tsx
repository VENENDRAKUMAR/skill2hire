"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function JobSeekerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session && session.user.role !== "JOBSEEKER") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <p>Loading dashboard...</p>;
  }

  if (!session) return null;

  return (
    <div>
      <h1>Jobseeker Dashboard</h1>
      <p>Name: {session.user.name}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}
