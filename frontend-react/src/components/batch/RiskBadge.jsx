import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

export default function RiskBadge({ risk }) {
  const config = {
    High: {
      icon: ShieldAlert,
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      label: "High Risk",
    },
    Medium: {
      icon: AlertTriangle,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
      label: "Medium Risk",
    },
    Low: {
      icon: ShieldCheck,
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      label: "Low Risk",
    },
  };

  const current = config[risk] || config.Low;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${current.bg} ${current.text} ${current.border}`}
    >
      <Icon size={16} />
      {current.label}
    </span>
  );
}