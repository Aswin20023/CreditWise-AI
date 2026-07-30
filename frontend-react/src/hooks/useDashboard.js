import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getRiskDistribution,
  getRecentPredictions,
} from "../services/dashboardApi";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [riskData, setRiskData] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const [statsRes, riskRes, recentRes] =
        await Promise.all([
          getDashboardStats(),
          getRiskDistribution(),
          getRecentPredictions(),
        ]);

      setStats(statsRes);
      setRiskData(riskRes);
      setRecent(recentRes);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    stats,
    riskData,
    recent,
    loading,
    refresh: loadDashboard,
  };
}