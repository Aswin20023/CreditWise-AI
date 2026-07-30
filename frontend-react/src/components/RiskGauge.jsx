import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
} from "recharts";

import {
    ShieldAlert,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

export default function RiskGauge({ probability }) {

    const percentage = Number((probability * 100).toFixed(1));

    const color =
        percentage >= 70
            ? "#EF4444"
            : percentage >= 40
            ? "#F59E0B"
            : "#22C55E";

    const riskLabel =
        percentage >= 70
            ? "High Risk"
            : percentage >= 40
            ? "Medium Risk"
            : "Low Risk";

    const data = [
        {
            name: "Risk",
            value: percentage,
            fill: color,
        },
    ];

    return (

        <div className="bg-white rounded-3xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-2xl font-bold">
                        Risk Score
                    </h2>

                    <p className="text-gray-500 mt-1">
                        AI Predicted Default Probability
                    </p>

                </div>

                {percentage >= 70 ? (

                    <ShieldAlert
                        size={34}
                        className="text-red-500"
                    />

                ) : (

                    <ShieldCheck
                        size={34}
                        className="text-green-600"
                    />

                )}

            </div>

            <div className="flex justify-center">

                <RadialBarChart
                    width={320}
                    height={320}
                    cx="50%"
                    cy="50%"
                    innerRadius="72%"
                    outerRadius="100%"
                    barSize={18}
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                >

                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />

                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={20}
                    />

                </RadialBarChart>

            </div>

            <div className="-mt-48 text-center">

                <h1 className="text-6xl font-bold text-slate-800">
                    {percentage}%
                </h1>

                <p className="text-gray-500 mt-3">
                    Default Probability
                </p>

            </div>

            <div className="mt-24">

                <div
                    className={`rounded-2xl py-4 text-center font-bold text-lg ${
                        percentage >= 70
                            ? "bg-red-50 text-red-600"
                            : percentage >= 40
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-green-50 text-green-600"
                    }`}
                >
                    {riskLabel}
                </div>

            </div>

            <div className="mt-8">

                <div className="flex items-center gap-2 mb-3">

                    <TrendingUp
                        size={18}
                        className="text-blue-600"
                    />

                    <h3 className="font-semibold">
                        Confidence
                    </h3>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                    <div
                        className="h-4 rounded-full transition-all duration-700"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: color,
                        }}
                    />

                </div>

                <div className="flex justify-between mt-2 text-sm text-gray-500">

                    <span>0%</span>

                    <span>
                        {percentage}% Confidence
                    </span>

                    <span>100%</span>

                </div>

            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">

                <h3 className="font-semibold mb-3">
                    Risk Interpretation
                </h3>

                <p className="text-gray-600 leading-7">

                    {percentage >= 70 &&
                        "This customer has a high likelihood of default. Additional verification and manual review are strongly recommended before approving credit."}

                    {percentage >= 40 &&
                        percentage < 70 &&
                        "The customer falls into a moderate risk category. Review repayment behaviour and financial history carefully."}

                    {percentage < 40 &&
                        "The customer demonstrates a relatively low probability of default based on the available financial information."}

                </p>

            </div>

        </div>

    );

}