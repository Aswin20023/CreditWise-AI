import { useState } from "react";
import { Brain, Sparkles, ShieldCheck } from "lucide-react";

import CustomerForm from "../components/CustomerForm";
import PredictionCard from "../components/PredictionCard";
import usePrediction from "../hooks/usePrediction";

const DEFAULT_FORM = {
  LIMIT_BAL: 20000,
  AGE: 24,
  SEX: 1,
  EDUCATION: 2,
  MARRIAGE: 2,

  PAY_0: 0,
  PAY_2: 0,
  PAY_3: 0,
  PAY_4: 0,
  PAY_5: 0,
  PAY_6: 0,

  BILL_AMT1: 0,
  BILL_AMT2: 0,
  BILL_AMT3: 0,
  BILL_AMT4: 0,
  BILL_AMT5: 0,
  BILL_AMT6: 0,

  PAY_AMT1: 0,
  PAY_AMT2: 0,
  PAY_AMT3: 0,
  PAY_AMT4: 0,
  PAY_AMT5: 0,
  PAY_AMT6: 0,
};

export default function Prediction() {
  const { loading, predict } = usePrediction();

  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const handleSubmit = async () => {
    const response = await predict(formData);

    if (response) {
      setPrediction(response);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-[1750px] px-8 py-10">

        {/* Header */}

        <div className="mb-10 flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100">

            <Brain
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-800">
              AI Credit Risk Assessment
            </h1>

            <p className="mt-2 max-w-3xl text-lg leading-8 text-slate-500">
              Evaluate customer creditworthiness using our Machine Learning
              model powered by Random Forest and generate transparent
              AI-driven explanations with SHAP.
            </p>

          </div>

        </div>

        {/* Main Layout */}

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

          {/* Left */}

          <div className="xl:col-span-5">

            <CustomerForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
            />

          </div>

          {/* Right */}

          <div className="xl:col-span-7">

            {loading ? (

              <div className="rounded-3xl border border-slate-200 bg-white p-20 shadow-sm">

                <div className="flex flex-col items-center">

                  <div className="h-16 w-16 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />

                  <h2 className="mt-8 text-3xl font-bold text-slate-800">
                    Analyzing Customer
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Evaluating financial behaviour...
                  </p>

                  <p className="text-slate-500">
                    Running Random Forest...
                  </p>

                  <p className="text-slate-500">
                    Generating SHAP explanations...
                  </p>

                </div>

              </div>

            ) : prediction ? (

              <PredictionCard
                prediction={prediction}
                customerData={formData}
              />

            ) : (

              <div className="rounded-3xl border border-slate-200 bg-white p-20 shadow-sm">

                <div className="flex flex-col items-center text-center">

                  <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

                    <Brain
                      size={48}
                      className="text-blue-600"
                    />

                  </div>

                  <h2 className="text-3xl font-bold text-slate-800">
                    Ready for Analysis
                  </h2>

                  <p className="mt-4 max-w-xl leading-8 text-slate-500">
                    Enter the customer's financial information to generate
                    an AI-powered credit risk assessment with
                    explainable machine learning insights.
                  </p>

                  <div className="mt-12 grid w-full max-w-xl gap-5 sm:grid-cols-2">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                      <Sparkles
                        size={30}
                        className="mx-auto text-blue-600"
                      />

                      <h3 className="mt-4 font-semibold">
                        Machine Learning
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Random Forest Model
                      </p>

                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                      <ShieldCheck
                        size={30}
                        className="mx-auto text-green-600"
                      />

                      <h3 className="mt-4 font-semibold">
                        Explainable AI
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        SHAP Feature Analysis
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}