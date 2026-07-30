import {
  Search,
  Filter,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react";

export default function TableToolbar({
  search,
  setSearch,
  riskFilter,
  setRiskFilter,
  totalRecords,
  onExportCSV,
  onExportPDF,
  onRefresh,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">

      <div className="flex flex-col xl:flex-row justify-between gap-5">

        {/* Left Section */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              placeholder="Search Credit Limit or Age..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          {/* Filter */}
          <div className="relative min-w-[200px]">

            <Filter
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="All">All Risks</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>

          </div>

        </div>

        {/* Right Section */}
        <div className="flex flex-wrap gap-3">

          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border hover:bg-gray-100 transition"
          >
            <RotateCcw size={18} />
            Refresh
          </button>

          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            <FileText size={18} />
            Export PDF
          </button>

          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition"
          >
            <Download size={18} />
            Export CSV
          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t flex justify-between items-center">

        <div className="text-sm text-gray-500">
          Total Records:
          <span className="ml-2 font-semibold text-gray-800">
            {totalRecords}
          </span>
        </div>

        <div className="text-sm text-gray-500">
          Batch Prediction Results
        </div>

      </div>

    </div>
  );
}