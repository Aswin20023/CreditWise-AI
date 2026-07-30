export default function ProbabilityBar({ value }) {
  const percentage = (value * 100).toFixed(2);

  let color = "bg-green-500";

  if (value >= 0.70) {
    color = "bg-red-500";
  } else if (value >= 0.40) {
    color = "bg-yellow-500";
  }

  return (
    <div className="w-full min-w-[170px]">

      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Risk Score</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}