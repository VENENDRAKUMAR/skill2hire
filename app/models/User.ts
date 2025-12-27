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
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["JOBSEEKER", "RECRUITER", "MENTOR", "ADMIN"],
      default: "JOBSEEKER",
    },
    verified: { type: Boolean, default: false },
    avatar: String,// cloudinary URL
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

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
