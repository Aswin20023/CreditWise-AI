import { useState } from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardFilter from "./DashboardFilter";
import StatsCards from "./StatsCards";
import HistoryStats from "./HistoryStats";
import RecentPredictions from "./RecentPredictions";
import AnalyticsOverview from "./AnalyticsOverview";

import RiskTrendChart from "./charts/RiskTrendChart";
import RiskPieChart from "./charts/RiskPieChart";

import useHistory from "../hooks/useHistory";

export default function Dashboard() {
  const { history, loading } = useHistory();

  const [filter, setFilter] = useState("All Time");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">

            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

          </div>

          <h2 className="mt-6 text-xl font-bold text-slate-800">
            Loading Dashboard
          </h2>

          <p className="mt-2 text-slate-500">
            Fetching portfolio analytics...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl space-y-8 px-6 py-8 xl:px-8">

        <DashboardHeader
          title="CreditWise AI Dashboard"
          subtitle="Portfolio monitoring and credit risk analytics"
        />

        <DashboardFilter
          selected={filter}
          setSelected={setFilter}
        />

        <StatsCards history={history} />

        <HistoryStats history={history} />

        {/* Charts */}

        <section className="grid gap-8 xl:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg">

            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Risk Trend
            </h2>

            <RiskTrendChart history={history} />

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg">

            <h2 className="mb-6 text-xl font-bold text-slate-800">
              Risk Distribution
            </h2>

            <RiskPieChart history={history} />

          </div>

        </section>

        {/* Tables */}

        <section className="grid gap-8 xl:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg">

            <RecentPredictions history={history} />

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg">

            <AnalyticsOverview history={history} />

          </div>

        </section>

      </div>

    </div>
  );
}