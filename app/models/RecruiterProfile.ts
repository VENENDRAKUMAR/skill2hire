import mongoose, { Schema, Document } from "mongoose";

export interface IRecruiterProfile extends Document {
  userId: mongoose.Types.ObjectId;
  companyName: string;
  companyLogo?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RecruiterProfileSchema = new Schema<IRecruiterProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyLogo: String,
    companySize: String,
    industry: String,
    website: String,
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.RecruiterProfile ||
  mongoose.model<IRecruiterProfile>("RecruiterProfile", RecruiterProfileSchema);