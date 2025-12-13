import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "JOBSEEKER" | "RECRUITER" | "MENTOR" | "ADMIN";
  verified: boolean;
  resetToken?: string;
  resetTokenExpiry?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["JOBSEEKER", "RECRUITER", "MENTOR", "ADMIN"], required: true },
  verified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
