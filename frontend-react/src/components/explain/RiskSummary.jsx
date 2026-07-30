import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Target,
  BadgeCheck,
} from "lucide-react";

const RiskSummary = ({ prediction }) => {
  const probability = prediction?.probability_default || 0;
  const percent = Math.round(probability * 100);

  const confidence = Math.max(percent, 100 - percent);

  const recommendation =
    percent >= 70
      ? "Decline"
      : percent >= 40
      ? "Manual Review"
      : "Approve";

  const risk =
    percent >= 70
      ? {
          label: "HIGH RISK",
          color: "bg-red-500",
          bg: "bg-red-100",
          text: "text-red-600",
          border: "border-red-200",
          icon: <AlertTriangle size={24} />,
        }
      : percent >= 40
      ? {
          label: "MEDIUM RISK",
          color: "bg-yellow-500",
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          border: "border-yellow-200",
          icon: <ShieldCheck size={24} />,
        }
      : {
          label: "LOW RISK",
          color: "bg-green-500",
          bg: "bg-green-100",
          text: "text-green-600",
          border: "border-green-200",
          icon: <CheckCircle2 size={24} />,
        };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h3 className="text-2xl font-bold text-slate-800">
            Credit Risk Assessment
          </h3>

          <p className="mt-2 text-slate-500">
            AI evaluation based on repayment history, billing behaviour and customer profile.
          </p>

        </div>

        <div
          className={`flex items-center gap-3 rounded-full border px-5 py-3 font-bold ${risk.bg} ${risk.text} ${risk.border}`}
        >
          {risk.icon}
          {risk.label}
        </div>

      </div>

      {/* KPI Cards */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={20}
              className="text-blue-600"
            />

            <span className="font-semibold text-slate-700">
              Default Probability
            </span>

          </div>

          <p className="mt-4 text-4xl font-extrabold text-slate-900">
            {percent}%
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

          <div className="flex items-center gap-2">

            <Target
              size={20}
              className="text-green-600"
            />

            <span className="font-semibold text-slate-700">
              Confidence
            </span>

          </div>

          <p className="mt-4 text-4xl font-extrabold text-slate-900">
            {confidence}%
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

          <div className="flex items-center gap-2">

            <BadgeCheck
              size={20}
              className="text-indigo-600"
            />

            <span className="font-semibold text-slate-700">
              Recommendation
            </span>

          </div>

          <p className={`mt-4 text-2xl font-bold ${risk.text}`}>
            {recommendation}
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-semibold text-slate-700">
            Risk Meter
          </span>

          <span className="font-bold text-slate-800">
            {percent}%
          </span>

        </div>

        <div className="h-5 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`${risk.color} h-full rounded-full transition-all duration-1000`}
            style={{
              width: `${percent}%`,
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-sm text-slate-500">

          <span>Low Risk</span>

          <span>High Risk</span>

        </div>

      </div>

      {/* AI Assessment */}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <h4 className="text-lg font-bold text-slate-800">
          AI Assessment
        </h4>

        <p className="mt-4 leading-8 text-slate-600">

          {prediction.summary ||
            "The model evaluated repayment behaviour, payment history, outstanding bills and demographic attributes to estimate the likelihood of future credit default. This recommendation should be considered alongside business rules and human review when necessary."}

        </p>

      </div>

    </section>
  );
};

export default RiskSummary;