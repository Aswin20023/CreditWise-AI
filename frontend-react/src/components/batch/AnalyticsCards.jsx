import {
  TrendingUp,
  CreditCard,
  ShieldAlert,
  ShieldCheck,
  Target,
} from "lucide-react";

export default function AnalyticsCards({ results = [] }) {
  if (results.length === 0) return null;

  const avgProbability =
    results.reduce(
      (sum, r) => sum + Number(r.probability_default || 0),
      0
    ) / results.length;

  const avgLimit =
    results.reduce(
      (sum, r) => sum + Number(r.LIMIT_BAL || 0),
      0
    ) / results.length;

  const highestRisk = Math.max(
    ...results.map((r) => Number(r.probability_default || 0))
  );

  const lowestRisk = Math.min(
    ...results.map((r) => Number(r.probability_default || 0))
  );

  const predictedDefaults = results.filter(
    (r) => r.prediction === 1
  ).length;

  const analytics = [
    {
      title: "Average Probability",
      value: `${avgProbability.toFixed(2)}%`,
      icon: TrendingUp,
      bg: "bg-indigo-50",
      iconBg: "bg-indigo-100",
      color: "text-indigo-700",
    },
    {
      title: "Average Credit Limit",
      value: `$${avgLimit.toLocaleString()}`,
      icon: CreditCard,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Highest Risk",
      value: `${highestRisk.toFixed(2)}%`,
      icon: ShieldAlert,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Lowest Risk",
      value: `${lowestRisk.toFixed(2)}%`,
      icon: ShieldCheck,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Predicted Defaults",
      value: predictedDefaults,
      icon: Target,
      bg: "bg-orange-50",
      iconBg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {analytics.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`${item.bg} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.iconBg} p-4 rounded-2xl`}>
                <Icon
                  size={32}
                  className={item.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}