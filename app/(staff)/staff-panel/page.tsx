import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
  const session = await getServerSession();

  if (session?.user?.role === "ADMIN") {
    redirect("/dashboard/admin");
  } else if (session?.user?.role === "MANAGER") {
    redirect("/dashboard/manager");
  } else {
    redirect("/"); // Agar kuch nahi mila toh home par
  }
}