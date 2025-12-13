import mongoose, { Schema } from "mongoose";

const JobseekerSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profileHeadline: { type: String, default: "" },
    skills: { type: String, default: "" },
    experience: { type: String, default: "" },
    education: { type: String, default: "" },
    projects: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    certification: { type: String, default: "" },
    achievements: { type: String, default: "" },
    languages: { type: [String], default: [] },
    careerProfile: { type: String, default: "" },
    jobRole: { type: String, default: "" },
    employmentType: { type: String, default: "" },
    resume: { type: String, default: "" },       // resume file path / URL
    profilePic: { type: String, default: "" },   // profile picture path / URL
    portfolio: { type: String, default: "" },    // portfolio link
    socialLinks: { type: Map, of: String, default: {} }, // flexible social links
    availability: { type: String, default: "" }, // e.g. "Immediate", "2 weeks notice"
  },
  { timestamps: true }
);

const Jobseeker =
  mongoose.models.Jobseeker || mongoose.model("Jobseeker", JobseekerSchema);

export default Jobseeker;
