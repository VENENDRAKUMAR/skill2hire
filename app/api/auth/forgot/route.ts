import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
  await sendMail(email, "Password Reset", `Click here to reset: ${resetLink}`);

  return NextResponse.json({ message: "Reset email sent" });
}
