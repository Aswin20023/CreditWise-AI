import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import RiskPieChart from "../components/charts/RiskPieChart";
import RiskTrendChart from "../components/charts/RiskTrendChart";
import RecentPredictions from "../components/RecentPredictions";
import AnalyticsOverview from "../components/AnalyticsOverview";

import useHistory from "../hooks/useHistory";

export default function Dashboard() {

    const {
        history,
        loading,
        refresh,
    } = useHistory();

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto p-8 space-y-8">

                {/* Header */}

                <DashboardHeader
                    totalRecords={history.length}
                    refresh={refresh}
                />

                {/* Statistics */}

                <StatsCards history={history} />

                {/* Row 1 */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    <RiskPieChart history={history} />

                    <RecentPredictions history={history} />

                </div>

                {/* Row 2 */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                    <RiskTrendChart history={history} />

                    <AnalyticsOverview history={history} />

                </div>

                {/* Footer */}

                <div className="text-center text-gray-500 text-sm">

                    CreditWise AI © 2026

                    <br />

                    {loading
                        ? "Loading..."
                        : `${history.length} Predictions Loaded`}

                </div>

            </div>

        </div>

    );

}