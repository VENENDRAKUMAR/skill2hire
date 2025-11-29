import mongoose, { Schema } from "mongoose";

const MentorSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    experience: {
      type: Number,
      default: 0,
    },

    company: {
      type: String,
      default: "",
    },

    domains: {
      type: [String],
      default: [],
    },

    techStack: {
      type: [String],
      default: [],
    },

    expertise: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    problemsSolved: {
      type: Number,
      default: 0,
    },

    dsaSolved: {
      type: Number,
      default: 0,
    },

    mentorshipCount: {
      type: Number,
      default: 0,
    },

    referralConnections: {
      type: Number,
      default: 0,
    },

    scoreCard: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Mentor = mongoose.model("Mentor", MentorSchema);
export default Mentor;
