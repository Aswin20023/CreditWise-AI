import { BrainCircuit } from "lucide-react";

export default function AIInsights({ history = [] }) {

    const total = history.length;

    const highRisk = history.filter(
        item => item.probability_default >= 0.7
    ).length;

    const average =
        total === 0
            ? 0
            : (
                history.reduce(
                    (sum, item) => sum + item.probability_default,
                    0
                ) / total * 100
            ).toFixed(1);

    const highest =
        total === 0
            ? 0
            : Math.max(
                ...history.map(item => item.probability_default * 100)
            ).toFixed(1);

    const insights = [];

    if (highRisk > 0) {
        insights.push(
            `${highRisk} customer(s) are currently classified as High Risk.`
        );
    }

    if (average > 60) {
        insights.push(
            `Average portfolio risk is ${average}%, indicating elevated credit exposure.`
        );
    }

    if (highest > 75) {
        insights.push(
            `Highest predicted default probability is ${highest}%.`
        );
    }

    if (insights.length === 0) {
        insights.push(
            "No significant risk patterns detected in the current dataset."
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-sm border p-6">

            <div className="flex items-center gap-3 mb-6">

                <div className="bg-blue-100 p-3 rounded-xl">
                    <BrainCircuit className="text-blue-600" size={24} />
                </div>

                <div>
                    <h2 className="text-xl font-bold">
                        AI Risk Insights
                    </h2>

                    <p className="text-sm text-gray-500">
                        Automatically generated observations
                    </p>
                </div>

            </div>

            <ul className="space-y-4">

                {insights.map((item, index) => (

                    <li
                        key={index}
                        className="bg-slate-50 rounded-xl p-4"
                    >
                        • {item}
                    </li>

                ))}

            </ul>

        </div>
    );

}