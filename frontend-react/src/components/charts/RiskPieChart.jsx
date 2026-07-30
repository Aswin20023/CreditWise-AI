import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function RiskPieChart({ history }) {
  const low = history.filter(
    (item) => item.probability_default < 0.4
  ).length;

  const medium = history.filter(
    (item) =>
      item.probability_default >= 0.4 &&
      item.probability_default < 0.7
  ).length;

  const high = history.filter(
    (item) => item.probability_default >= 0.7
  ).length;

  const data = [
    { name: "Low Risk", value: low },
    { name: "Medium Risk", value: medium },
    { name: "High Risk", value: high },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-4">
        Risk Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={3}
          >

            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}