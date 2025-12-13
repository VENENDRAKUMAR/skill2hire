import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from ".././lib/auth";

export function middleware(req: NextRequest) {
  const payload = verifyToken(req);

  // Agar token missing hai → login pe bhej do
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { role, email } = payload as any;
  const pathname = req.nextUrl.pathname;

  // Role-based checks
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN" || email !== "admin@vbizgro.com") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/jobseeker") && role !== "JOBSEEKER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/recruiter") && role !== "RECRUITER") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/mentor") && role !== "MENTOR") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Agar sab sahi hai → request continue kare
  return NextResponse.next();
}

// Matcher: middleware kin routes pe chalega
export const config = {
  matcher: ["/admin/:path*", "/jobseeker/:path*", "/recruiter/:path*", "/mentor/:path*"],
};
