import mongoose, { Schema, Document } from "mongoose";

export interface IMentorProfile extends Document {
  userId: mongoose.Types.ObjectId;
  expertise: string[];
  yearsExperience: number;
  bio?: string;
  hourlyRate?: number;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MentorProfileSchema = new Schema<IMentorProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    expertise: [String],
    yearsExperience: {
      type: Number,
      default: 0,
    },
    bio: String,
    hourlyRate: Number,
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.MentorProfile ||
  mongoose.model<IMentorProfile>("MentorProfile", MentorProfileSchema);