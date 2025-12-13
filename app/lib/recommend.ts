import Job from "@/models/Job";

export const getRecommendations = async (userId: string) => {
  // For now: return jobs where recruiter is active
  const jobs = await Job.find({}).limit(5);
  return jobs;
};
