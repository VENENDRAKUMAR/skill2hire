import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },

    userId: {
      type: String, // jobseekerId
      required: true,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
