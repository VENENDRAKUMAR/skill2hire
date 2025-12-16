import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { sendMail, emailTemplates } from "../../../lib/mail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Find user with valid token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Send confirmation email
    try {
      await sendMail(
        user.email,
        "Password Changed Successfully",
        emailTemplates.passwordChanged(user.name)
      );
    } catch (err) {
      console.error("Email failed:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Password reset successful! You can now login.",
    });
  } catch (error: any) {
    console.error("❌ Reset password error:", error);
    return NextResponse.json(
      { error: "Failed to reset password. Please try again." },
      { status: 500 }
    );
  }
}

