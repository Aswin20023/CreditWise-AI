import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e", // Low
  "#facc15", // Medium
  "#ef4444", // High
];

export default function RiskPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">
          Risk Distribution
        </h2>

        <div className="h-72 flex items-center justify-center text-slate-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Risk Distribution
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="risk"
              outerRadius={110}
              innerRadius={55}
              paddingAngle={3}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}