export const RISK = {
  LOW_THRESHOLD: 40,
  HIGH_THRESHOLD: 70,

  LABELS: {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
  },

  COLORS: {
    LOW: "#22C55E",
    MEDIUM: "#F59E0B",
    HIGH: "#EF4444",
  },

  BADGES: {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-red-100 text-red-700",
  },
};

export function getRiskLevel(probability) {
  const value = Number(probability);

  if (value >= RISK.HIGH_THRESHOLD) {
    return {
      label: RISK.LABELS.HIGH,
      color: RISK.COLORS.HIGH,
      badge: RISK.BADGES.HIGH,
    };
  }

  if (value >= RISK.LOW_THRESHOLD) {
    return {
      label: RISK.LABELS.MEDIUM,
      color: RISK.COLORS.MEDIUM,
      badge: RISK.BADGES.MEDIUM,
    };
  }

  return {
    label: RISK.LABELS.LOW,
    color: RISK.COLORS.LOW,
    badge: RISK.BADGES.LOW,
  };
}