import { Database, RefreshCw } from "lucide-react";

export default function DashboardHeader({
  totalRecords,
  refresh,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="text-slate-500 mt-1">
            CreditWise AI Analytics Platform
          </p>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">

            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

              <Database
                size={20}
                className="text-blue-600"
              />

            </div>

            <div>

              <p className="text-xs uppercase tracking-wide text-slate-500">
                Total Records
              </p>

              <h3 className="text-xl font-bold text-slate-800">
                {totalRecords}
              </h3>

            </div>

          </div>

          <button
            onClick={refresh}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

      </div>

    </div>
  );
}