import {
  Users,
  AlertTriangle,
  ShieldCheck,
  GitBranch,
} from "lucide-react";

export default function StatsCards({ history = [] }) {
  const total = history.length;

  const highRisk = history.filter(
    (item) => item.probability_default >= 0.7
  ).length;

  const mediumRisk = history.filter(
    (item) =>
      item.probability_default >= 0.4 &&
      item.probability_default < 0.7
  ).length;

  const lowRisk = history.filter(
    (item) => item.probability_default < 0.4
  ).length;

  const highPercent =
    total === 0
      ? 0
      : ((highRisk / total) * 100).toFixed(1);

  const lowPercent =
    total === 0
      ? 0
      : ((lowRisk / total) * 100).toFixed(1);

  const cards = [
    {
      title: "Total Predictions",
      value: total,
      subtitle: `${mediumRisk} Medium Risk`,
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-700",
    },
    {
      title: "High Risk",
      value: highRisk,
      subtitle: `${highPercent}% of Dataset`,
      icon: AlertTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      valueColor: "text-red-700",
    },
    {
      title: "Low Risk",
      value: lowRisk,
      subtitle: `${lowPercent}% of Dataset`,
      icon: ShieldCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-700",
    },
    {
      title: "Prediction Engine",
      value: "RF",
      subtitle: "Random Forest",
      icon: GitBranch,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2
                  className={`mt-3 text-4xl font-bold ${card.valueColor}`}
                >
                  {card.value}
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  {card.subtitle}
                </p>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.iconBg}`}
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