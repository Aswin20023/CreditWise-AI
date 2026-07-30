import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RotateCw,
  Download,
  Eye,
  AlertTriangle,
  ShieldCheck,
  MinusCircle,
  Trash2,
} from "lucide-react";

import api from "../services/api";
import HistoryStats from "./HistoryStats";
import ExplainModal from "./explain/ExplainModal";

export default function HistoryTable({ refresh }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  async function fetchHistory() {
    try {
      setLoading(true);

      const response = await api.get("/history");

      setHistory(response.data);
    } catch (err) {
      console.error("History Error:", err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return history.filter((item) => {
      return (
        String(item.id).includes(search) ||
        String(item.age).includes(search) ||
        String(item.education).includes(search)
      );
    });
  }, [history, search]);

  function exportCSV() {
    if (!filtered.length) return;

    const csv = [
      [
        "ID",
        "Date",
        "Limit",
        "Age",
        "Education",
        "Prediction",
        "Probability",
      ],
      ...filtered.map((i) => [
        i.id,
        i.timestamp,
        i.limit_bal,
        i.age,
        i.education,
        i.prediction,
        (i.probability_default * 100).toFixed(2),
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "prediction_history.csv";
    a.click();

    URL.revokeObjectURL(url);
  }

  async function deletePrediction(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this prediction?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/history/${id}`);
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Unable to delete prediction.");
    }
  }

  async function clearAllHistory() {
    const confirmed = window.confirm(
      "Delete ALL prediction history?"
    );

    if (!confirmed) return;

    try {
      await api.delete("/history");
      fetchHistory();
    } catch (err) {
      console.error(err);
      alert("Unable to clear history.");
    }
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6">

          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Prediction History
            </h2>

            <p className="text-slate-500 mt-1">
              Complete history of customer credit predictions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={fetchHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <RotateCw size={18} />
              Refresh
            </button>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-slate-100 transition"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={clearAllHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
            >
              <Trash2 size={18} />
              Clear History
            </button>

          </div>

        </div>

        <HistoryStats history={filtered} />

        <div className="relative my-6">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, Age or Education..."
            className="w-full border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {loading ? (

          <div className="text-center py-12 text-slate-500">
            Loading prediction history...
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-100">

                <tr>

                  {[
                    "ID",
                    "Date",
                    "Limit",
                    "Age",
                    "Education",
                    "Prediction",
                    "Risk",
                    "Probability",
                    "Action",
                  ].map((header) => (

                    <th
                      key={header}
                      className="p-4 text-center font-semibold text-slate-700"
                    >
                      {header}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>                {filtered.map((item) => {
                  const probability = item.probability_default * 100;

                  let risk = "Low";
                  let badge = "bg-green-100 text-green-700";
                  let Icon = ShieldCheck;

                  if (probability >= 70) {
                    risk = "High";
                    badge = "bg-red-100 text-red-700";
                    Icon = AlertTriangle;
                  } else if (probability >= 40) {
                    risk = "Medium";
                    badge = "bg-yellow-100 text-yellow-700";
                    Icon = MinusCircle;
                  }

                  return (
                    <tr
                      key={item.id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="p-4 text-center font-semibold">
                        #{item.id}
                      </td>

                      <td className="p-4">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>

                      <td className="p-4 text-right font-medium">
                        ₹{Number(item.limit_bal).toLocaleString("en-IN")}
                      </td>

                      <td className="p-4 text-center">
                        {item.age}
                      </td>

                      <td className="p-4 text-center">
                        {item.education}
                      </td>

                      <td className="p-4 text-center">
                        {item.prediction === 1 ? (
                          <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                            Default
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                            No Default
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${badge}`}
                        >
                          <Icon size={15} />
                          {risk}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">

                          <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full ${
                                probability >= 70
                                  ? "bg-red-500"
                                  : probability >= 40
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${probability}%`,
                              }}
                            />
                          </div>

                          <span className="w-14 text-right font-medium">
                            {probability.toFixed(1)}%
                          </span>

                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => {
                              setSelectedPrediction(item);
                              setIsExplainOpen(true);
                            }}
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-100 transition"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => deletePrediction(item.id)}
                            className="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })}              </tbody>

            </table>

          </div>

        )}

      </div>

      <ExplainModal
        isOpen={isExplainOpen}
        prediction={selectedPrediction}
        onClose={() => {
          setIsExplainOpen(false);
          setSelectedPrediction(null);
        }}
      />
    </>
  );
}