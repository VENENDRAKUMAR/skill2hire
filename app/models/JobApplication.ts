import mongoose, { Schema, models } from "mongoose";

const JobApplicationSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    jobSeekerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "REVIEWING", "INTERVIEW", "HIRED", "REJECTED"],
      default: "PENDING",
    },

    resumeUrl: String,
  },
  { timestamps: true }
);

export default models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);
