import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "JOBSEEKER" | "RECRUITER" | "MENTOR" | "ADMIN";
  verified: boolean;
  avatar?: string;
  provider: "CREDENTIALS" | "GOOGLE";
  loginCount: number;
  lastLoginAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      unique: true, 
      required: true, 
      lowercase: true, 
      trim: true 
    },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["JOBSEEKER", "RECRUITER", "MENTOR", "ADMIN"],
      default: "JOBSEEKER",
      index: true, // Role based search fast karne ke liye
    },
    verified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    provider: {
      type: String,
      enum: ["CREDENTIALS", "GOOGLE"],
      default: "CREDENTIALS",
    },
    loginCount: { type: Number, default: 0 },
    lastLoginAt: Date,
  },
  { timestamps: true }
);

// Scale optimization: Compound index for common queries
UserSchema.index({ email: 1, role: 1 });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);