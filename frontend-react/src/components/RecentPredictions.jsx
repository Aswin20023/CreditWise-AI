import { useState } from "react";
import { Eye } from "lucide-react";
import ExplainModal from "./explain/ExplainModal";

export default function RecentPredictions({ history = [] }) {
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const recent = [...history]
    .sort((a, b) => b.id - a.id)
    .slice(0, 8);

  const getRisk = (probability) => {
    if (probability >= 0.7)
      return {
        label: "High",
        badge: "bg-red-100 text-red-700",
      };

    if (probability >= 0.4)
      return {
        label: "Medium",
        badge: "bg-yellow-100 text-yellow-700",
      };

    return {
      label: "Low",
      badge: "bg-green-100 text-green-700",
    };
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Recent Predictions
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Latest customer credit assessments
            </p>

          </div>

          <span className="text-sm text-slate-500">
            {recent.length} Records
          </span>

        </div>

        {recent.length === 0 ? (

          <div className="text-center py-10 text-slate-500">
            No prediction history available.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-200 text-left">

                  <th className="pb-3 font-semibold text-slate-600">
                    ID
                  </th>

                  <th className="pb-3 font-semibold text-slate-600">
                    Date
                  </th>

                  <th className="pb-3 font-semibold text-slate-600">
                    Age
                  </th>

                  <th className="pb-3 font-semibold text-slate-600">
                    Credit Limit
                  </th>

                  <th className="pb-3 font-semibold text-slate-600">
                    Risk
                  </th>

                  <th className="pb-3 font-semibold text-slate-600">
                    Probability
                  </th>

                  <th className="pb-3 text-right font-semibold text-slate-600">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {recent.map((item) => {

                  const risk = getRisk(item.probability_default);

                  return (

                    <tr
                      key={item.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      <td className="py-4 font-semibold">
                        #{item.id}
                      </td>

                      <td className="py-4 text-slate-600">
                        {item.timestamp
                          ? new Date(item.timestamp).toLocaleDateString()
                          : "-"}
                      </td>

                      <td className="py-4">
                        {item.age}
                      </td>

                      <td className="py-4">
                        ₹{Number(item.limit_bal).toLocaleString()}
                      </td>

                      <td className="py-4">

                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${risk.badge}`}
                        >
                          {risk.label}
                        </span>

                      </td>

                      <td className="py-4 font-semibold">
                        {(item.probability_default * 100).toFixed(1)}%
                      </td>

                      <td className="py-4 text-right">

                        <button
                          onClick={() => setSelectedPrediction(item)}
                          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >
                          <Eye size={16} />
                          View
                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>

      <ExplainModal
        isOpen={selectedPrediction !== null}
        prediction={selectedPrediction}
        onClose={() => setSelectedPrediction(null)}
      />
    </>
  );
}