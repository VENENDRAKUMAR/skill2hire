import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function DashboardRedirect() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    redirect("/login");
  }

  switch (session.user.role) {
    case "JOBSEEKER":
      redirect("/dashboard/jobseeker");

    case "RECRUITER":
      redirect("/dashboard/recruiter");

    case "MENTOR":
      redirect("/dashboard/mentor");



    default:
      redirect("/login");
  }
}
