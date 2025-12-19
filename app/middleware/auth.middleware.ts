import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = (token as any).role;
  const pathname = req.nextUrl.pathname;

  // ✅ ADMIN
  if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ JOBSEEKER (FIXED)
  if (pathname.startsWith("/dashboard/jobseeker") && role !== "JOBSEEKER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ RECRUITER
  if (pathname.startsWith("/dashboard/recruiter") && role !== "RECRUITER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ✅ MENTOR
  if (pathname.startsWith("/dashboard/mentor") && role !== "MENTOR") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
