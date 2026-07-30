import React from "react";

export default function KPICard({
  title,
  value,
  icon,
  color = "blue",
}) {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    red: "bg-red-50 border-red-200 text-red-600",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-600",
    green: "bg-green-50 border-green-200 text-green-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
  };

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colors[color]}`}
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium opacity-80">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>
    </div>
  );
}