import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function PredictionBadge({ prediction }) {
  const isDefault = prediction === 1;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
        isDefault
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {isDefault ? (
        <>
          <AlertTriangle size={16} />
          Default
        </>
      ) : (
        <>
          <CheckCircle2 size={16} />
          Safe
        </>
      )}
    </span>
  );
}