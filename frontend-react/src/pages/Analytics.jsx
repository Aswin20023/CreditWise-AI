// Analytics.jsx template
// NOTE: This file is a starter because the full generated version exceeds chat response limits.
// Paste your existing imports/components as needed and extend.

import { useState } from "react";

import AnalyticsFilter from "../components/analytics/AnalyticsFilter";
import AnalyticsKPIs from "../components/analytics/AnalyticsKPIs";
import AIInsights from "../components/analytics/AIInsights";
import SearchBar from "../components/analytics/SearchBar";

import RiskTrendChart from "../components/charts/RiskTrendChart";
import RiskPieChart from "../components/charts/RiskPieChart";

import RecentPredictions from "../components/RecentPredictions";
import AnalyticsOverview from "../components/AnalyticsOverview";

import useHistory from "../hooks/useHistory";

export default function Analytics() {
  const { history, loading } = useHistory();
  const [selectedFilter, setSelectedFilter] = useState("All Time");
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((item) => {
    const risk =
      item.probability_default >= 0.7
        ? "high"
        : item.probability_default >= 0.4
        ? "medium"
        : "low";

    return (
      item.id.toString().includes(search) ||
      item.age.toString().includes(search) ||
      risk.includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Analytics Dashboard
            </h1>
            <p className="text-slate-500 mt-2">
              Monitor credit risk trends, AI predictions and portfolio health.
            </p>
          </div>

          <div className="mt-6 lg:mt-0 flex gap-3">
            <button className="px-5 py-3 rounded-xl border hover:bg-slate-100 transition">
              Export Report
            </button>

            <button className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">
              Generate Insights
            </button>
          </div>
        </div>

        <AnalyticsFilter
          selected={selectedFilter}
          setSelected={setSelectedFilter}
        />

        <SearchBar search={search} setSearch={setSearch} />

        <AnalyticsKPIs history={filteredHistory} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Monthly Risk Trend</h2>
            <RiskTrendChart history={filteredHistory} />
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Risk Distribution</h2>
            <RiskPieChart history={filteredHistory} />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-sm p-6">
            <RecentPredictions history={filteredHistory} />
          </div>

          <div className="bg-white rounded-3xl shadow-sm p-6">
            <AnalyticsOverview history={filteredHistory} />
          </div>
        </div>

        <AIInsights history={filteredHistory} />

      </div>
    </div>
  );
}