import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef4444",
  "#facc15",
  "#22c55e",
];

export default function RiskDistributionChart({ results }) {
  if (!results || results.length === 0) return null;

  const data = [
    {
      name: "High",
      value: results.filter((r) => r.risk === "High").length,
    },
    {
      name: "Medium",
      value: results.filter((r) => r.risk === "Medium").length,
    },
    {
      name: "Low",
      value: results.filter((r) => r.risk === "Low").length,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        Risk Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
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