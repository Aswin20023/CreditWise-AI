import {
  TrendingUp,
  Wallet,
  Users,
  Brain,
} from "lucide-react";

export default function AnalyticsOverview({ history = [] }) {
  const total = history.length;

  const averageRisk =
    total === 0
      ? 0
      : (
          history.reduce(
            (sum, item) =>
              sum + item.probability_default,
            0
          ) /
          total *
          100
        ).toFixed(1);

  const averageCredit =
    total === 0
      ? 0
      : Math.round(
          history.reduce(
            (sum, item) =>
              sum + Number(item.limit_bal),
            0
          ) / total
        );

  const averageAge =
    total === 0
      ? 0
      : (
          history.reduce(
            (sum, item) =>
              sum + Number(item.age),
            0
          ) / total
        ).toFixed(1);

  const approvalRate =
    total === 0
      ? 0
      : (
          history.filter(
            (item) => item.prediction === 0
          ).length /
          total *
          100
        ).toFixed(1);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Portfolio Analytics
      </h2>

      <div className="grid grid-cols-2 gap-5">

        <Metric
          icon={<TrendingUp className="text-blue-600" />}
          label="Average Risk"
          value={`${averageRisk}%`}
        />

        <Metric
          icon={<Wallet className="text-green-600" />}
          label="Average Credit"
          value={`₹${averageCredit.toLocaleString()}`}
        />

        <Metric
          icon={<Users className="text-purple-600" />}
          label="Average Age"
          value={averageAge}
        />

        <Metric
          icon={<Brain className="text-orange-600" />}
          label="Approval Rate"
          value={`${approvalRate}%`}
        />

      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
          {icon}
        </div>

        <div>

          <p className="text-sm text-slate-500">
            {label}
          </p>

          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}