import React from "react";
import {
  Download,
  Copy,
  FileJson,
  X,
} from "lucide-react";

const ActionButtons = ({ prediction }) => {

  const copySummary = async () => {

    const summary =
      prediction?.summary ||
      "AI explanation unavailable.";

    try {

      await navigator.clipboard.writeText(summary);

      alert("AI summary copied to clipboard.");

    } catch {

      alert("Unable to copy summary.");

    }

  };

  const downloadJSON = () => {

    const blob = new Blob(
      [
        JSON.stringify(
          prediction,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "creditwise_prediction.json";

    a.click();

    URL.revokeObjectURL(url);

  };

  const downloadPDF = () => {

    alert(
      "PDF export will be added in the next version."
    );

  };

  return (

    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-2xl font-bold text-slate-800">
            Actions
          </h3>

          <p className="mt-2 text-slate-500">
            Export or share this AI explanation.
          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <button
          onClick={downloadPDF}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-700 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
        >

          <Download size={20} />

          Export PDF

        </button>

        <button
          onClick={copySummary}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-700 transition-all duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-700 hover:shadow-md"
        >

          <Copy size={20} />

          Copy Summary

        </button>

        <button
          onClick={downloadJSON}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md"
        >

          <FileJson size={20} />

          Download JSON

        </button>

        <button
          onClick={() => window.location.reload()}
          className="flex items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 font-semibold text-red-600 transition-all duration-300 hover:bg-red-100 hover:shadow-md"
        >

          <X size={20} />

          Close Report

        </button>

      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">

        <h4 className="font-semibold text-slate-800">
          Available Exports
        </h4>

        <p className="mt-2 leading-7 text-slate-600">

          Export the prediction results as JSON, copy the AI-generated
          summary for documentation, or download a PDF report (coming in
          a future update). These options make it easier to archive,
          review, or share the analysis with your team.

        </p>

      </div>

    </section>

  );

};

export default ActionButtons;