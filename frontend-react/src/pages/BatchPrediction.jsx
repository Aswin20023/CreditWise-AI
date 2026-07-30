import BatchHero from "../components/batch/BatchHero";
import UploadCard from "../components/batch/UploadCard";
import SummaryCards from "../components/batch/SummaryCards";
import AnalyticsCards from "../components/batch/AnalyticsCards";
import RiskDistributionChart from "../components/batch/RiskDistributionChart";
import BatchTable from "../components/batch/BatchTable";

import useBatchPrediction from "../hooks/useBatchPrediction";

export default function BatchPrediction() {
  const {
    file,
    setFile,
    results,
    loading,
    predict,
  } = useBatchPrediction();

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Hero */}
        <BatchHero />

        {/* Upload Section */}
        <UploadCard
          file={file}
          setFile={setFile}
          onPredict={predict}
          loading={loading}
        />

        {results.length > 0 && (
          <>

            {/* KPI Summary */}
            <SummaryCards results={results} />

            {/* Analytics */}
            <AnalyticsCards results={results} />

            {/* Charts + Portfolio Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2">
                <RiskDistributionChart
                  results={results}
                />
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Portfolio Overview
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500">
                      Total Customers
                    </span>

                    <span className="font-bold text-xl">
                      {results.length}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500">
                      High Risk
                    </span>

                    <span className="font-bold text-red-600 text-xl">
                      {
                        results.filter(
                          (r) => r.risk === "High"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500">
                      Medium Risk
                    </span>

                    <span className="font-bold text-yellow-500 text-xl">
                      {
                        results.filter(
                          (r) => r.risk === "Medium"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500">
                      Low Risk
                    </span>

                    <span className="font-bold text-green-600 text-xl">
                      {
                        results.filter(
                          (r) => r.risk === "Low"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-gray-500">
                      Predicted Defaults
                    </span>

                    <span className="font-bold text-blue-600 text-xl">
                      {
                        results.filter(
                          (r) => r.prediction === 1
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">
                      Safe Customers
                    </span>

                    <span className="font-bold text-green-700 text-xl">
                      {
                        results.filter(
                          (r) => r.prediction === 0
                        ).length
                      }
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Results Table */}
            <BatchTable results={results} />

          </>
        )}

      </div>

    </div>
  );
}