import {
  Users,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function SummaryCards({ results }) {
  if (!results.length) return null;

  const total = results.length;

  const high = results.filter((r) => r.risk === "High").length;
  const medium = results.filter((r) => r.risk === "Medium").length;
  const low = results.filter((r) => r.risk === "Low").length;

  const cards = [
    {
      title: "Total Customers",
      value: total,
      percent: "100%",
      icon: Users,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "High Risk",
      value: high,
      percent: `${((high / total) * 100).toFixed(1)}%`,
      icon: ShieldAlert,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Medium Risk",
      value: medium,
      percent: `${((medium / total) * 100).toFixed(1)}%`,
      icon: AlertTriangle,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Low Risk",
      value: low,
      percent: `${((low / total) * 100).toFixed(1)}%`,
      icon: ShieldCheck,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`${card.bg} rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6`}
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>

                <p className="text-sm mt-2 text-gray-500">
                  {card.percent} of portfolio
                </p>
              </div>

              <div
                className={`${card.iconBg} p-4 rounded-2xl`}
              >
                <Icon
                  size={34}
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