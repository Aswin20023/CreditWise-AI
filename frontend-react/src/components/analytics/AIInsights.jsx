import {
    Users,
    AlertTriangle,
    ShieldCheck,
    Activity,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

import KPICard from "./KPICard";

export default function AnalyticsKPIs({ history = [] }) {

    const total = history.length;

    const high = history.filter(
        item => Number(item.probability_default || 0) >= 70
    ).length;

    const medium = history.filter(
        item => {
            const probability = Number(item.probability_default || 0);
            return probability >= 40 && probability < 70;
        }
    ).length;

    const low = history.filter(
        item => Number(item.probability_default || 0) < 40
    ).length;

    const average =
        total === 0
            ? 0
            : (
                history.reduce(
                    (sum, item) => sum + Number(item.probability_default || 0),
                    0
                ) / total
            ).toFixed(1);

    const highest =
        total === 0
            ? 0
            : Math.max(
                ...history.map(
                    item => Number(item.probability_default || 0)
                )
            ).toFixed(1);

    const lowest =
        total === 0
            ? 0
            : Math.min(
                ...history.map(
                    item => Number(item.probability_default || 0)
                )
            ).toFixed(1);

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            <KPICard
                title="Total Predictions"
                value={total}
                subtitle="Records analyzed"
                icon={Users}
                color="blue"
            />

            <KPICard
                title="Average Risk"
                value={`${average}%`}
                subtitle="Across all predictions"
                icon={Activity}
                color="purple"
            />

            <KPICard
                title="High Risk"
                value={high}
                subtitle="≥ 70% probability"
                icon={AlertTriangle}
                color="red"
            />

            <KPICard
                title="Medium Risk"
                value={medium}
                subtitle="40% - 69%"
                icon={TrendingUp}
                color="yellow"
            />

            <KPICard
                title="Low Risk"
                value={low}
                subtitle="< 40%"
                icon={ShieldCheck}
                color="green"
            />

            <KPICard
                title="Lowest Risk"
                value={`${lowest}%`}
                subtitle={`Highest: ${highest}%`}
                icon={TrendingDown}
                color="blue"
            />

        </div>

    );

}