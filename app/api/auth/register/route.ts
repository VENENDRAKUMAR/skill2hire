import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import Jobseeker from "../../../models/Jobseeker"; // Path sahi kar lena
import RecruiterProfile from "../../../models/RecruiterProfile";
import MentorProfile from "../../../models/Mentorprofile";
import { sendMail } from "../../../lib/mail"; // 👈 Real mail helper

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password, role } = await req.json();

    // 1. Basic Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Oye! Saare fields bharo pehle." }, { status: 400 });
    }

    // 2. Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return NextResponse.json({ error: "Email pehle se register hai bhai!" }, { status: 400 });
    }

    // 3. Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create User
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role,
      provider: "CREDENTIALS",
    });

    // 5. Create Role-Specific Profile (Scalable way)
    try {
      if (role === "JOBSEEKER") {
        await Jobseeker.create({ userId: user._id, skills: [] });
      } else if (role === "RECRUITER") {
        await RecruiterProfile.create({ userId: user._id, companyName: "Pending Update" });
      } else if (role === "MENTOR") {
        await MentorProfile.create({ userId: user._id, expertise: [], yearsExperience: 0 });
      }
    } catch (profileErr) {
      console.error("Profile Creation Failed:", profileErr);
      // Optional: User delete kar sakte ho agar profile must hai
    }

    // 6. Send Welcome Email (Non-blocking)
    sendMail(user.email, "Welcome to Skill2Hire!", `Hi ${user.name}, your account as ${user.role} is ready!`)
      .catch(err => console.log("Mail error ignored for now"));

    return NextResponse.json({ success: true, message: "Mubarak ho! Registration ho gaya." }, { status: 201 });

  } catch (error: any) {
    console.error("❌ Registration Error:", error);
    return NextResponse.json({ error: "Kuch toh phat gaya backend pe." }, { status: 500 });
  }
}