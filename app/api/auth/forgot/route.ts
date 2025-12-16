import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { sendMail, emailTemplates } from "../../../lib/mail";
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success (security best practice)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, you will receive a reset link.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(resetTokenExpiry);
    await user.save();

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Send email
    await sendMail(
      user.email,
      "Password Reset Request",
      emailTemplates.passwordReset(user.name, resetLink)
    );

    return NextResponse.json({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error: any) {
    console.error("❌ Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}