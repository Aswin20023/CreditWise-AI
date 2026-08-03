import React from "react";

export default function RecentPredictions({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Recent Predictions
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No recent predictions available.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Limit</th>
                <th className="p-3 text-left">Risk</th>
              </tr>

            </thead>

            <tbody>

              {data.map((item) => {

                const probability =
                  Number(item.probability_default || 0);

                let risk = "Low";
                let color =
                  "bg-green-100 text-green-700";

                if (probability >= 70) {
                  risk = "High";
                  color =
                    "bg-red-100 text-red-700";
                } else if (probability >= 40) {
                  risk = "Medium";
                  color =
                    "bg-yellow-100 text-yellow-700";
                }

                return (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-3 font-medium">
                      #{item.id}
                    </td>

                    <td className="p-3">
                      {item.age}
                    </td>

                    <td className="p-3">
                      ₹{Number(item.limit_bal).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}
                      >
                        {risk}
                      </span>

                    </td>

                  </tr>
                );

              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}