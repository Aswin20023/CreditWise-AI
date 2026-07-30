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

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* Header */}

        <div className="text-center">

          <h1 className="text-5xl font-bold text-gray-900">
            Batch Credit Risk Analytics
          </h1>

          <p className="text-lg text-gray-500 mt-4">
            Upload a CSV file containing multiple customer records to
            analyze default risk, visualize portfolio insights and
            export prediction reports.
          </p>

        </div>

        {/* Upload */}

        <UploadCard
          file={file}
          setFile={setFile}
          onPredict={predict}
          loading={loading}
        />

        {results.length > 0 && (
          <>

            {/* Summary */}

            <SummaryCards results={results} />

            {/* Analytics */}

            <AnalyticsCards results={results} />

            {/* Charts */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

              <RiskDistributionChart
                results={results}
              />

              <div className="bg-white rounded-2xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-6">
                  Portfolio Overview
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">
                      Total Customers
                    </span>

                    <span className="font-bold">
                      {results.length}
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">
                      High Risk
                    </span>

                    <span className="font-bold text-red-600">
                      {
                        results.filter(
                          (r) => r.risk === "High"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">
                      Medium Risk
                    </span>

                    <span className="font-bold text-yellow-600">
                      {
                        results.filter(
                          (r) => r.risk === "Medium"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-500">
                      Low Risk
                    </span>

                    <span className="font-bold text-green-600">
                      {
                        results.filter(
                          (r) => r.risk === "Low"
                        ).length
                      }
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Predicted Defaults
                    </span>

                    <span className="font-bold text-blue-600">
                      {
                        results.filter(
                          (r) => r.prediction === 1
                        ).length
                      }
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* Table */}

            <BatchTable results={results} />

          </>
        )}

      </div>

    </div>
  );
}