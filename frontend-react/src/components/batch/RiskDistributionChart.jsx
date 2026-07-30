import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function RiskDistributionChart({ results }) {
  if (!results || results.length === 0) return null;

  const high = results.filter((r) => r.risk === "High").length;
  const medium = results.filter((r) => r.risk === "Medium").length;
  const low = results.filter((r) => r.risk === "Low").length;

  const data = [
    { name: "High Risk", value: high },
    { name: "Medium Risk", value: medium },
    { name: "Low Risk", value: low },
  ];

  const total = high + medium + low;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 h-full">

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <PieChartIcon className="text-blue-700" size={24} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Risk Distribution
              </h2>

              <p className="text-gray-500 text-sm">
                Portfolio segmentation by risk level
              </p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Customers</p>
          <h3 className="text-3xl font-bold text-gray-800">
            {total}
          </h3>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={4}
              dataKey="value"
              label={({ percent }) =>
                `${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [`${value} Customers`, "Count"]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-red-600 text-sm font-medium">
            High
          </p>

          <h3 className="text-2xl font-bold text-red-700">
            {high}
          </h3>
        </div>

        <div className="bg-amber-50 rounded-xl p-4 text-center">
          <p className="text-amber-600 text-sm font-medium">
            Medium
          </p>

          <h3 className="text-2xl font-bold text-amber-700">
            {medium}
          </h3>
        </div>

        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-green-600 text-sm font-medium">
            Low
          </p>

          <h3 className="text-2xl font-bold text-green-700">
            {low}
          </h3>
        </div>

      </div>
    </div>
  );
}