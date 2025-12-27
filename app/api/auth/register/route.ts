import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import Jobseeker from "@/app/models/Jobseeker";
import RecruiterProfile from "../../../models/RecruiterProfile";
import MentorProfile  from  "../../../models/Mentorprofile";
import { sendMail, emailTemplates } from "../../../lib/mail";

export async function POST(req: NextRequest) {
  try {
    // database connection
    await connectDB();

    const { name, email, password, role } = await req.json();

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!["JOBSEEKER", "RECRUITER", "MENTOR"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists. Please login." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      provider: "CREDENTIALS",
    });

    console.log("✅ User created:", user._id);

    // Create role-specific profile
    if (role === "JOBSEEKER") {
      await Jobseeker.create({
        userId: user._id,
        skills: [],
      });
    } else if (role === "RECRUITER") {
      await RecruiterProfile.create({
        userId: user._id,
        companyName: "Not Set",
      });
    } else if (role === "MENTOR") {
      await MentorProfile.create({
        userId: user._id,
        expertise: [],
        yearsExperience: 0,
      });
    }

    // Send welcome email
    try {
      await sendMail(
        user.email,
        "Welcome to JobBoard!",
        emailTemplates.welcome(user.name, user.role)
      );
    } catch (err) {
      console.error("Email failed:", err);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful! Please login.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Registration error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
