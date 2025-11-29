import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    hiringRole: {
      type: String,
      required: true,
    },

    jobDesc: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "internship", "contract", "remote", "hybrid"],
    },

    payoutScale: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    website: {
      type: String,
      default: "",
    },

    postedBy: {
      type: String, // recruiterId
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
export default Job;
