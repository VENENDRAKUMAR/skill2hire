import Assignment from "@/models/Assignment";
import User from "@/models/User";

export const verifyAssignment = async (assignmentId: string) => {
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) throw new Error("Assignment not found");

  assignment.status = "verified";
  await assignment.save();

  // Mark user as verified
  await User.findByIdAndUpdate(assignment.userId, { verified: true });

  return assignment;
};
