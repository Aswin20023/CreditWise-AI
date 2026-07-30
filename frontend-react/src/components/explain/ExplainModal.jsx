import { useEffect } from "react";

import ExplainHeader from "./ExplainHeader";
import RiskSummary from "./RiskSummary";
import FeatureImportance from "./FeatureImportance";
import RecommendationCard from "./RecommendationCard";
import ActionButtons from "./ActionButtons";

import useExplain from "../../hooks/useExplain";

const ExplainModal = ({
  isOpen,
  onClose,
  prediction,
  customerData,
}) => {
  const {
    loading,
    explanation,
    error,
    getExplanation,
    clearExplanation,
  } = useExplain();

  useEffect(() => {
    if (isOpen && customerData) {
      getExplanation(customerData);
    }

    return () => {
      clearExplanation();
    };
  }, [isOpen, customerData, getExplanation]);

  if (!isOpen) return null;

  // If backend succeeds use explanation,
  // otherwise fall back to prediction.
  const data = explanation || prediction;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        <ExplainHeader
          title={`Customer #${prediction?.id ?? "Unknown"}`}
          onClose={onClose}
        />

        <div className="p-8">

          {loading && (
            <div className="py-20 text-center">

              <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>

              <p className="mt-5 text-slate-500 font-medium">
                Generating AI explanation...
              </p>

            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

              <h3 className="text-xl font-semibold text-red-700">
                Backend explanation unavailable
              </h3>

              <p className="mt-2 text-red-600">
                {error}
              </p>

              <p className="mt-4 text-sm text-slate-600">
                Showing prediction summary instead.
              </p>

            </div>
          )}

          {!loading && data && (
            <div className="space-y-8">

              <RiskSummary prediction={data} />

              <FeatureImportance
                features={data.top_features || []}
              />

              <RecommendationCard
                prediction={data}
              />

              <ActionButtons
                prediction={data}
              />

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ExplainModal;