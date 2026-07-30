import React from "react";
import {
  Activity,
  AlertTriangle,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

import useDashboard from "../../hooks/useDashboard";

import KPICard from "./KPICard";
import RiskPieChart from "./RiskPieChart";
import RecentPredictions from "./RecentPredictions";

export default function Dashboard() {
  const {
    stats,
    riskData,
    recent,
    loading,
  } = useDashboard();

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          CreditWise AI Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor credit risk predictions and analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <KPICard
          title="Total Predictions"
          value={stats.total_predictions}
          color="blue"
          icon={<Activity />}
        />

        <KPICard
          title="High Risk"
          value={stats.high_risk}
          color="red"
          icon={<AlertTriangle />}
        />

        <KPICard
          title="Average Probability"
          value={`${stats.average_probability}%`}
          color="yellow"
          icon={<ShieldCheck />}
        />

        <KPICard
          title="Average Limit"
          value={`₹${stats.average_limit.toLocaleString("en-IN")}`}
          color="green"
          icon={<CreditCard />}
        />

      </div>      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RiskPieChart
          data={riskData}
        />

        <RecentPredictions
          data={recent}
        />

      </div>

    </div>
  );
}