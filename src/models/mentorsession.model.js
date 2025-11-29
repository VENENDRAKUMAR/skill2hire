import mongoose, { Schema } from "mongoose";

const MentorSessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    mode: {
      type: String,  // Online / Offline
      required: true,
    },

    platform: {
      type: String, // Zoom / Google Meet / etc
      default: "",
    },

    maxParticipants: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MentorSession", MentorSessionSchema);
