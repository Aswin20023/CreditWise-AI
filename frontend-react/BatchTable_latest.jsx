import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Download,
  FileText,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";

import exportCSV from "../../utils/exportCSV";
import exportBatchPDF from "../../utils/exportBatchPDF";

import ProbabilityBar from "./ProbabilityBar";
import PredictionBadge from "./PredictionBadge";
import RiskBadge from "./RiskBadge";
import Pagination from "./Pagination";

const ROWS_PER_PAGE = 10;

export default function BatchTable({ results = [] }) {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  const [sortField, setSortField] = useState("probability_default");
  const [sortDirection, setSortDirection] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredResults = useMemo(() => {
    let data = [...results];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter((row) => {
        return (
          String(row.LIMIT_BAL).includes(keyword) ||
          String(row.AGE).includes(keyword) ||
          String(row.risk).toLowerCase().includes(keyword) ||
          String(row.prediction).toLowerCase().includes(keyword)
        );
      });
    }

    if (riskFilter !== "All") {
      data = data.filter((row) => row.risk === riskFilter);
    }

    data.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });

    return data;
  }, [results, search, riskFilter, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredResults.length / ROWS_PER_PAGE);

  const currentRows = filteredResults.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const resetFilters = () => {
    setSearch("");
    setRiskFilter("All");
    setSortField("probability_default");
    setSortDirection("desc");
    setCurrentPage(1);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ArrowUpDown size={15} className="inline ml-1" />;
    }

    return sortDirection === "asc" ? (
      <ChevronUp size={15} className="inline ml-1" />
    ) : (
      <ChevronDown size={15} className="inline ml-1" />
    );
  };

  if (!results.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center">
        <AlertTriangle
          size={56}
          className="mx-auto text-amber-500 mb-4"
        />

        <h2 className="text-2xl font-bold text-slate-800">
          No Batch Predictions
        </h2>

        <p className="mt-2 text-slate-500">
          Upload a CSV file to generate predictions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

      <div className="border-b bg-gradient-to-r from-slate-50 to-blue-50 p-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Batch Prediction Results
            </h2>

            <p className="text-slate-500 mt-1">
              {filteredResults.length} Customers Found
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => exportCSV(filteredResults)}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              <Download size={18} />
              CSV
            </button>

            <button
              onClick={() => exportBatchPDF(filteredResults)}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <FileText size={18} />
              PDF
            </button>

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-900"
            >
              <RefreshCw size={18} />
              Reset
            </button>

          </div>

        </div>

      </div>      {/* Toolbar */}

      <div className="border-b bg-white p-6">

        <div className="grid gap-5 lg:grid-cols-2">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search credit limit, age, risk..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

          </div>

          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-slate-100">

            <tr className="border-b border-slate-200 text-left text-sm uppercase tracking-wide text-slate-700">

              <th className="px-6 py-4">
                #
              </th>

              <th
                onClick={() => handleSort("LIMIT_BAL")}
                className="cursor-pointer select-none px-6 py-4"
              >
                Credit Limit
                <SortIcon field="LIMIT_BAL" />
              </th>

              <th
                onClick={() => handleSort("AGE")}
                className="cursor-pointer select-none px-6 py-4"
              >
                Age
                <SortIcon field="AGE" />
              </th>

              <th
                onClick={() => handleSort("probability_default")}
                className="cursor-pointer select-none px-6 py-4"
              >
                Probability
                <SortIcon field="probability_default" />
              </th>

              <th
                onClick={() => handleSort("prediction")}
                className="cursor-pointer select-none px-6 py-4"
              >
                Prediction
                <SortIcon field="prediction" />
              </th>

              <th
                onClick={() => handleSort("risk")}
                className="cursor-pointer select-none px-6 py-4"
              >
                Risk
                <SortIcon field="risk" />
              </th>

            </tr>

          </thead>

          <tbody>

            {currentRows.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-16 text-center text-slate-500"
                >
                  No matching records found.
                </td>

              </tr>

            ) : (

              currentRows.map((row, index) => {

                const rowNumber =
                  (currentPage - 1) * ROWS_PER_PAGE +
                  index +
                  1;

                return (

                  <tr
                    key={index}
                    className="border-b border-slate-100 transition hover:bg-blue-50 even:bg-slate-50"
                  >

                    <td className="px-6 py-5 font-semibold text-slate-600">
                      {rowNumber}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      ${Number(row.LIMIT_BAL).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      {row.AGE}
                    </td>

                    <td className="min-w-[220px] px-6 py-5">
                      <ProbabilityBar
                        value={row.probability_default}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <PredictionBadge
                        prediction={row.prediction}
                      />
                    </td>

                    <td className="px-6 py-5">
                      <RiskBadge
                        risk={row.risk}
                      />
                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>      {/* Footer */}

      <div className="border-t border-slate-200 bg-white px-6 py-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-semibold text-slate-700">
              {filteredResults.length === 0
                ? 0
                : (currentPage - 1) * ROWS_PER_PAGE + 1}
            </span>

            {" "}to{" "}

            <span className="font-semibold text-slate-700">
              {Math.min(
                currentPage * ROWS_PER_PAGE,
                filteredResults.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-semibold text-slate-700">
              {filteredResults.length}
            </span>

            {" "}customers

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() =>
              setCurrentPage((page) =>
                Math.max(page - 1, 1)
              )
            }
            onNext={() =>
              setCurrentPage((page) =>
                Math.min(page + 1, totalPages)
              )
            }
          />

        </div>

      </div>

      {/* Statistics */}

      <div className="border-t bg-slate-50 p-6">

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-2xl border bg-white p-5">

            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {filteredResults.length}
            </h2>

          </div>

          <div className="rounded-2xl border bg-white p-5">

            <p className="text-sm text-slate-500">
              High Risk
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-600">

              {
                filteredResults.filter(
                  (r) => r.risk === "High"
                ).length
              }

            </h2>

          </div>

          <div className="rounded-2xl border bg-white p-5">

            <p className="text-sm text-slate-500">
              Medium Risk
            </p>

            <h2 className="mt-2 text-3xl font-bold text-amber-500">

              {
                filteredResults.filter(
                  (r) => r.risk === "Medium"
                ).length
              }

            </h2>

          </div>

          <div className="rounded-2xl border bg-white p-5">

            <p className="text-sm text-slate-500">
              Low Risk
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">

              {
                filteredResults.filter(
                  (r) => r.risk === "Low"
                ).length
              }

            </h2>

          </div>

        </div>

      </div>      {/* Mobile Cards */}

      <div className="lg:hidden border-t bg-slate-50 p-5">

        <div className="space-y-5">

          {currentRows.length === 0 ? (

            <div className="rounded-2xl border bg-white p-8 text-center text-slate-500">
              No customers found.
            </div>

          ) : (

            currentRows.map((row, index) => {

              const rowNumber =
                (currentPage - 1) * ROWS_PER_PAGE +
                index +
                1;

              return (

                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >

                  <div className="flex items-center justify-between border-b px-5 py-4">

                    <div>

                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Customer
                      </p>

                      <h3 className="text-lg font-bold text-slate-800">
                        #{rowNumber}
                      </h3>

                    </div>

                    <RiskBadge risk={row.risk} />

                  </div>

                  <div className="space-y-4 p-5">

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Credit Limit
                      </span>

                      <span className="font-semibold text-slate-800">
                        ${Number(row.LIMIT_BAL).toLocaleString()}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Age
                      </span>

                      <span className="font-semibold">
                        {row.AGE}
                      </span>

                    </div>

                    <div>

                      <p className="mb-2 text-slate-500">
                        Default Probability
                      </p>

                      <ProbabilityBar
                        value={row.probability_default}
                      />

                    </div>

                    <div className="flex justify-between items-center pt-2">

                      <span className="text-slate-500">
                        Prediction
                      </span>

                      <PredictionBadge
                        prediction={row.prediction}
                      />

                    </div>

                  </div>

                </div>

              );

            })

          )}

        </div>

      </div>      {/* Analytics Dashboard */}

      <div className="border-t bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 p-6">

          {/* Average Probability */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">

            <p className="text-sm text-slate-300">
              Average Probability
            </p>

            <h2 className="mt-2 text-3xl font-bold">

              {filteredResults.length
                ? (
                    filteredResults.reduce(
                      (sum, row) =>
                        sum + Number(row.probability_default),
                      0
                    ) / filteredResults.length
                  ).toFixed(2)
                : "0.00"}

              %

            </h2>

          </div>

          {/* Highest Probability */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">

            <p className="text-sm text-slate-300">
              Highest Probability
            </p>

            <h2 className="mt-2 text-3xl font-bold text-red-400">

              {filteredResults.length
                ? Math.max(
                    ...filteredResults.map(
                      (r) => Number(r.probability_default)
                    )
                  ).toFixed(2)
                : "0.00"}

              %

            </h2>

          </div>

          {/* Lowest Probability */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">

            <p className="text-sm text-slate-300">
              Lowest Probability
            </p>

            <h2 className="mt-2 text-3xl font-bold text-green-400">

              {filteredResults.length
                ? Math.min(
                    ...filteredResults.map(
                      (r) => Number(r.probability_default)
                    )
                  ).toFixed(2)
                : "0.00"}

              %

            </h2>

          </div>

          {/* Default Predictions */}

          <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur">

            <p className="text-sm text-slate-300">
              Predicted Defaults
            </p>

            <h2 className="mt-2 text-3xl font-bold text-orange-300">

              {
                filteredResults.filter(
                  (r) => Number(r.prediction) === 1
                ).length
              }

            </h2>

          </div>

        </div>

      </div>

      {/* Risk Distribution */}

      <div className="border-t bg-white p-6">

        <h3 className="mb-6 text-xl font-bold text-slate-800">
          Risk Distribution
        </h3>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">

            <p className="text-sm text-green-700">
              Low Risk
            </p>

            <h2 className="mt-2 text-4xl font-bold text-green-700">

              {
                filteredResults.filter(
                  (r) => r.risk === "Low"
                ).length
              }

            </h2>

            <p className="mt-2 text-sm text-green-600">

              {filteredResults.length
                ? (
                    filteredResults.filter(
                      (r) => r.risk === "Low"
                    ).length *
                    100 /
                    filteredResults.length
                  ).toFixed(1)
                : "0.0"}

              %

            </p>

          </div>

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">

            <p className="text-sm text-yellow-700">
              Medium Risk
            </p>

            <h2 className="mt-2 text-4xl font-bold text-yellow-700">

              {
                filteredResults.filter(
                  (r) => r.risk === "Medium"
                ).length
              }

            </h2>

            <p className="mt-2 text-sm text-yellow-600">

              {filteredResults.length
                ? (
                    filteredResults.filter(
                      (r) => r.risk === "Medium"
                    ).length *
                    100 /
                    filteredResults.length
                  ).toFixed(1)
                : "0.0"}

              %

            </p>

          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <p className="text-sm text-red-700">
              High Risk
            </p>

            <h2 className="mt-2 text-4xl font-bold text-red-700">

              {
                filteredResults.filter(
                  (r) => r.risk === "High"
                ).length
              }

            </h2>

            <p className="mt-2 text-sm text-red-600">

              {filteredResults.length
                ? (
                    filteredResults.filter(
                      (r) => r.risk === "High"
                    ).length *
                    100 /
                    filteredResults.length
                  ).toFixed(1)
                : "0.0"}

              %

            </p>

          </div>

        </div>

      </div>    </div>
  );
}
