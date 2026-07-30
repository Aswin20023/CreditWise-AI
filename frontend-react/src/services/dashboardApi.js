import api from "./api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

export const getRiskDistribution = async () => {
  const { data } = await api.get("/dashboard/risk-distribution");
  return data;
};

export const getRecentPredictions = async () => {
  const { data } = await api.get("/dashboard/recent");
  return data;
};