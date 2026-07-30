import {
  ShieldCheck,
  Upload,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function BatchHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 text-white shadow-2xl">

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white"></div>
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-cyan-300"></div>
      </div>

      <div className="relative p-10 lg:p-14">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          <div>

            <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
              <ShieldCheck size={18} />
              AI Powered Credit Intelligence
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight">
              Batch Credit Risk Analytics
            </h1>

            <p className="mt-5 text-blue-100 text-lg leading-8">
              Upload customer portfolios, predict credit default,
              visualize portfolio risk and generate business-ready
              analytics reports instantly.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <div className="bg-white/15 backdrop-blur-md px-5 py-4 rounded-2xl">
                <p className="text-sm text-blue-100">
                  AI Prediction
                </p>

                <h3 className="text-2xl font-bold">
                  Random Forest
                </h3>
              </div>

              <div className="bg-white/15 backdrop-blur-md px-5 py-4 rounded-2xl">
                <p className="text-sm text-blue-100">
                  Explainability
                </p>

                <h3 className="text-2xl font-bold">
                  SHAP AI
                </h3>
              </div>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
              <Upload className="mb-3" size={34} />
              <h3 className="font-semibold">
                CSV Upload
              </h3>
              <p className="text-blue-100 text-sm mt-2">
                Analyze thousands of records.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6">
              <TrendingUp className="mb-3" size={34} />
              <h3 className="font-semibold">
                Risk Analysis
              </h3>
              <p className="text-blue-100 text-sm mt-2">
                High, Medium and Low segmentation.
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 col-span-2">
              <BarChart3 className="mb-3" size={34} />
              <h3 className="font-semibold">
                Portfolio Dashboard
              </h3>
              <p className="text-blue-100 text-sm mt-2">
                Interactive analytics with exportable reports.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}