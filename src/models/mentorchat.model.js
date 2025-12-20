import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    workspaceId: {
      type: String, // session ID or room ID
      required: true,
    },

    duration: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
