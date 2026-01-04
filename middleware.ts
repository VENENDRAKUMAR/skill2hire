import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const hostname = req.headers.get("host");
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    console.log("--- Middleware Check ---");
    console.log("Path:", path);
    console.log("User Role:", token?.role);

    // 1. Agar path /unauthorized hai, toh kuch mat karo, seedha page dikhao
    if (path === "/unauthorized" || path.startsWith("/api/auth") || path.includes(".")) {
      return NextResponse.next();
    }

    const isStaffSubdomain = hostname?.startsWith("staff.localhost");

    if (isStaffSubdomain) {
      // 2. Agar token nahi mila (Role undefined), matlab session share nahi ho raha
      if (!token || (token.role !== "ADMIN" && token.role !== "MANAGER")) {
        console.log("Access Denied for Role:", token?.role);
        // Redirect to main domain login or unauthorized
        return NextResponse.redirect(new URL("http://localhost:3000/unauthorized", req.url));
      }

      const rewritePath = path === "/" ? "/staff-dashboard/admin" : path;
      return NextResponse.rewrite(new URL(`/(staff)${rewritePath}`, req.url));
    }
  },
  {
    callbacks: { authorized: () => true }
  }
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};