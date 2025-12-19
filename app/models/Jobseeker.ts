import mongoose, { Schema } from "mongoose";

const JobseekerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },

    profileHeadline: { type: String, default: "" },
    skills: { type: String, default: "" }, // comma separated
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

    resume: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    portfolio: { type: String, default: "" },

    socialLinks: { type: Map, of: String, default: {} },
    availability: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Jobseeker ||
  mongoose.model("Jobseeker", JobseekerSchema);
