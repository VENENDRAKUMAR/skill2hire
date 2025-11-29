import mongoose, { Schema } from "mongoose";

const JobseekerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    nickName: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },

    country: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    profileHeadline: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    skills: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    itSkills: {
      type: String,
      default: "",
    },

    projects: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    certification: {
      type: String,
      default: "",
    },

    achievements: {
      type: String,
      default: "",
    },

    languages: {
      type: [String], // array of string
      default: [],
    },

    careerProfile: {
      type: String,
      default: "",
    },

    jobRole: {
      type: String,
      default: "",
    },

    employmentType: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Jobseeker = mongoose.model("Jobseeker", JobseekerSchema);

export default Jobseeker;
