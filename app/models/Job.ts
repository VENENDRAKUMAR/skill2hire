import mongoose, { Schema, models } from "mongoose";

const JobSchema = new Schema(
  {
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: String,

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Remote",
    },

    salaryRange: String,

    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"],
      default: "FULL_TIME",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "CLOSED", "DRAFT"],
      default: "ACTIVE",
    },

    totalApplications: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

export default models.Job || mongoose.model("Job", JobSchema);
