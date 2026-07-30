import React from "react";
import {
  TrendingUp,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const FeatureImportance = ({ features = [] }) => {

  const fallbackFeatures = [
    { name: "PAY_0", impact: 95 },
    { name: "LIMIT_BAL", impact: 84 },
    { name: "BILL_AMT3", impact: 72 },
    { name: "PAY_AMT2", impact: 61 },
    { name: "AGE", impact: 48 },
  ];

  const featureList =
    features.length > 0
      ? features.map((feature, index) => ({
          name:
            typeof feature === "string"
              ? feature
              : feature.name || `Feature ${index + 1}`,
          impact:
            feature.impact ??
            Math.max(95 - index * 15, 20),
        }))
      : fallbackFeatures;

  return (

    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

          <BarChart3
            size={28}
            className="text-blue-600"
          />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-slate-800">
            Feature Importance
          </h3>

          <p className="mt-1 text-slate-500">
            Most influential factors affecting this prediction.
          </p>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="mt-8 space-y-5">

        {featureList.map((feature, index) => (

          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">

                  <TrendingUp
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <h4 className="font-bold text-slate-800">
                    {feature.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Influencing Feature
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <ArrowUpRight
                  size={18}
                  className="text-green-600"
                />

                <span className="text-lg font-bold text-slate-800">
                  {feature.impact}%
                </span>

              </div>

            </div>

            {/* Progress */}

            <div className="mt-5">

              <div className="mb-2 flex justify-between text-sm text-slate-500">

                <span>Low Impact</span>

                <span>High Impact</span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                  style={{
                    width: `${feature.impact}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

        <h4 className="font-semibold text-blue-700">
          Interpretation
        </h4>

        <p className="mt-2 text-sm leading-7 text-slate-600">

          Higher impact values indicate features that contributed more
          strongly to the model's prediction. These values help explain
          why the AI classified the customer into the current risk level.

        </p>

      </div>

    </section>

  );

};

export default FeatureImportance;