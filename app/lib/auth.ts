import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// Token generate karne ka helper
export const generateToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

// Token verify karne ka helper
export const verifyToken = (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
};

// Role check karne ka helper
export const requireRole = (user: any, roles: string[]) => {
  if (!roles.includes(user.role)) {
    throw new Error("Unauthorized");
  }
};

// Role ke hisaab se redirect path decide karne ka helper
export const redirectByRole = (role: string, email?: string): string => {
  if (role === "ADMIN" && email === "patler044@gmail.com") return "/admin";
  if (role === "JOBSEEKER") return "/jobseeker";
  if (role === "RECRUITER") return "/recruiter";
  if (role === "MENTOR") return "/mentor";
  return "/welcome";
};
