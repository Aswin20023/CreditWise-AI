import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Eye,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react";

import ExplainModal from "./explain/ExplainModal";
import { generatePDF } from "../utils/pdfReport";

const PredictionCard = ({
  prediction,
  customerData,
}) => {

  const [openExplain, setOpenExplain] = useState(false);

  const handleDownloadReport = () => {
    generatePDF(customerData, prediction);
  };

  if (!prediction) return null;

  const probability = Number(
  (prediction.probability_default || 0).toFixed(2)
  );

  const confidence = Math.max(
    probability,
    100 - probability
  );

  const recommendation =
    probability >= 70
      ? "Decline"
      : probability >= 40
      ? "Manual Review"
      : "Approve";

  const risk =
    probability >= 70
      ? {
          label: "HIGH RISK",
          color: "text-red-600",
          bg: "bg-red-100",
          border: "border-red-200",
          progress: "bg-red-500",
          icon: <AlertTriangle size={22} />,
        }
      : probability >= 40
      ? {
          label: "MEDIUM RISK",
          color: "text-yellow-600",
          bg: "bg-yellow-100",
          border: "border-yellow-200",
          progress: "bg-yellow-500",
          icon: <ShieldCheck size={22} />,
        }
      : {
          label: "LOW RISK",
          color: "text-green-600",
          bg: "bg-green-100",
          border: "border-green-200",
          progress: "bg-green-500",
          icon: <CheckCircle2 size={22} />,
        };

  // Safe handling of backend response
  const topFactors = prediction?.top_features ?? [];

  const safeTopFactors = topFactors.map((item) => {
    if (typeof item === "string") {
      return {
        feature: item,
        value: "-",
        impact: "-",
      };
    }

    return {
      feature: item?.feature ?? "Unknown",
      value: item?.value ?? "-",
      impact: item?.impact ?? "-",
    };
  });

  const formattedDate = new Date().toLocaleString();

  return (
    <>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

        {/* ================= Header ================= */}

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                <Brain
                  size={28}
                  className="text-blue-600"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  Prediction Result
                </h2>

                <p className="mt-1 text-slate-500">
                  AI-powered credit risk assessment
                </p>

              </div>

            </div>

          </div>

          <div
            className={`flex items-center gap-3 rounded-full border px-5 py-3 font-bold shadow-sm ${risk.bg} ${risk.color} ${risk.border}`}
          >

            {risk.icon}

            <span>{risk.label}</span>

          </div>

        </div>

        {/* ================= Analytics ================= */}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* Probability */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">             

            <div className="flex items-center gap-2">

              <TrendingUp
                size={20}
                className="text-blue-600"
              />

              <h3 className="font-semibold text-slate-700">
                Default Probability
              </h3>

            </div>

            <p className="mt-5 text-4xl font-extrabold text-slate-800">
              {probability}%
            </p>

            <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`${risk.progress} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{
                  width: `${probability}%`,
                }}
              />

            </div>

            <div className="mt-3 flex justify-between text-sm text-slate-500">

              <span>Low Risk</span>

              <span>High Risk</span>

            </div>

          </div>

          {/* Confidence */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center gap-2">

              <Target
                size={20}
                className="text-green-600"
              />

              <h3 className="font-semibold text-slate-700">
                Confidence
              </h3>

            </div>

            <p className="mt-5 text-4xl font-extrabold text-slate-800">
              {confidence}%
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">

              Indicates how confidently the model predicts the customer's
              likelihood of default.

            </p>

          </div>

          {/* Recommendation */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center gap-2">

              <ShieldCheck
                size={20}
                className="text-indigo-600"
              />

              <h3 className="font-semibold text-slate-700">
                Recommendation
              </h3>

            </div>

            <p
              className={`mt-5 text-3xl font-extrabold ${risk.color}`}
            >
              {recommendation}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">

              {recommendation === "Approve"
                ? "Customer shows a low probability of default. Credit approval is recommended."
                : recommendation === "Manual Review"
                ? "Customer presents a moderate level of risk. A manual credit review is recommended."
                : "Customer has a high probability of default. Credit approval is not recommended."}

            </p>

          </div>

        </div>
                {/* ================= Prediction Details ================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Risk Level
            </p>

            <p className={`mt-2 text-xl font-bold ${risk.color}`}>
              {risk.label}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Prediction Time
            </p>

            <div className="mt-2 flex items-center gap-2">

              <Clock
                size={18}
                className="text-slate-500"
              />

              <span className="font-medium text-slate-700">
                {formattedDate}
              </span>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 p-5">

            <p className="text-sm text-slate-500">
              Model Status
            </p>

            <p className="mt-2 font-bold text-green-600">
              Prediction Completed
            </p>

          </div>

        </div>

        {/* ================= AI Assessment ================= */}

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-7">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">

              <Sparkles
                size={22}
                className="text-indigo-600"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold text-slate-800">
                AI Assessment
              </h3>

              <p className="text-sm text-slate-500">
                Intelligent explanation generated from the prediction model
              </p>

            </div>

          </div>

          <p className="mt-6 leading-8 text-slate-600">

            {prediction.summary ||
              "The customer profile was evaluated using repayment history, bill statements, payment behaviour and demographic information. The model indicates the probability of future credit default based on historical learning patterns."}

          </p>

        </div>

        {/* ================= Top Influencing Factors ================= */}

        <div className="mt-10">

          <div className="mb-6 flex items-center gap-3">

            <TrendingUp
              size={22}
              className="text-blue-600"
            />

            <h3 className="text-xl font-bold text-slate-800">
              Top Influencing Factors
            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {safeTopFactors.length > 0 ? (

              safeTopFactors.map((factor, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-slate-500">
                        Feature
                      </p>

                      <h4 className="mt-2 text-lg font-bold text-slate-800">
                        {factor.feature}
                      </h4>

                      <p className="mt-3 text-sm text-slate-500">
                        Value:
                        <span className="ml-2 font-medium text-slate-700">
                          {factor.value}
                        </span>
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Impact:
                        <span className="ml-2 font-semibold text-blue-600">
                          {factor.impact}
                        </span>
                      </p>

                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">

                      <TrendingUp
                        size={20}
                        className="text-blue-600"
                      />

                    </div>

                  </div>

                </div>

              ))

            ) : (

              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No feature importance information available.
              </div>

            )}

          </div>

        </div>
                {/* ================= Footer ================= */}

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="text-sm text-slate-500">
            Generated using the CreditWise AI risk prediction model.
          </div>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => setOpenExplain(true)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg"
            >
              <Eye size={18} />
              View AI Explanation
            </button>

            <button
              onClick={handleDownloadReport}
              className="flex items-center justify-center gap-2 rounded-2xl border border-green-600 bg-white px-6 py-3 font-semibold text-green-700 transition-all duration-300 hover:bg-green-50 hover:shadow-lg"
            >
               Download Report
            </button>

          </div>

        </div>

      </div>

      <ExplainModal
        isOpen={openExplain}
        prediction={prediction}
        customerData={customerData}
        onClose={() => setOpenExplain(false)}
      />

    </>

  );

};

export default PredictionCard;