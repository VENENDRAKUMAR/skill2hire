import mongoose, { Schema } from "mongoose";

const RecruiterSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    companyDesc: {
      type: String,
      default: "",
    },

    postedJobs: {
      type: [String], // Array of jobIds
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Recruiter = mongoose.model("Recruiter", RecruiterSchema);
export default Recruiter;
