import { useMemo } from "react";

import {
    Database,
    AlertTriangle,
    ShieldCheck,
    BarChart3,
} from "lucide-react";

export default function HistoryStats({ history }) {

    const stats = useMemo(() => {

        const total = history.length;

        const highRisk = history.filter(
            (item) => item.probability_default >= 0.7
        ).length;

        const lowRisk = history.filter(
            (item) => item.probability_default < 0.4
        ).length;

        const average =
            total > 0
                ? (
                      history.reduce(
                          (sum, item) => sum + item.probability_default,
                          0
                      ) /
                      total *
                      100
                  ).toFixed(1)
                : "0.0";

        return {
            total,
            highRisk,
            lowRisk,
            average,
        };

    }, [history]);

    const cards = [

        {
            title: "Total Predictions",
            value: stats.total,
            icon: Database,
            bg: "bg-blue-50",
            iconColor: "text-blue-600",
        },

        {
            title: "High Risk",
            value: stats.highRisk,
            icon: AlertTriangle,
            bg: "bg-red-50",
            iconColor: "text-red-600",
        },

        {
            title: "Low Risk",
            value: stats.lowRisk,
            icon: ShieldCheck,
            bg: "bg-green-50",
            iconColor: "text-green-600",
        },

        {
            title: "Average Risk",
            value: `${stats.average}%`,
            icon: BarChart3,
            bg: "bg-amber-50",
            iconColor: "text-amber-600",
        },

    ];

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-6"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm font-medium text-gray-500">
                                    {card.title}
                                </p>

                                <h3 className="text-3xl font-bold text-slate-800 mt-3">
                                    {card.value}
                                </h3>

                            </div>

                            <div
                                className={`${card.bg} p-4 rounded-2xl`}
                            >

                                <Icon
                                    size={28}
                                    className={card.iconColor}
                                />

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}