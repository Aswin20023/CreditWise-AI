import {
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function PredictionExplanation({ customer }) {

    if (!customer) {

        return (

            <div className="bg-white rounded-3xl shadow-sm border p-8">

                <h2 className="text-xl font-bold">
                    AI Explanation
                </h2>

                <p className="text-gray-500 mt-4">
                    Select a prediction to view the explanation.
                </p>

            </div>

        );

    }

    const explanations = [];

    if (customer.PAY_0 > 1)
        explanations.push({
            label: "Recent Payment Delay",
            impact: "+18%",
            positive: false,
        });

    if (customer.LIMIT_BAL < 100000)
        explanations.push({
            label: "Low Credit Limit",
            impact: "+8%",
            positive: false,
        });

    if (customer.PAY_AMT1 > 5000)
        explanations.push({
            label: "Strong Recent Payment",
            impact: "-10%",
            positive: true,
        });

    if (customer.BILL_AMT1 > 80000)
        explanations.push({
            label: "High Outstanding Bill",
            impact: "+12%",
            positive: false,
        });

    return (

        <div className="bg-white rounded-3xl shadow-sm border p-8">

            <h2 className="text-xl font-bold mb-6">
                AI Prediction Explanation
            </h2>

            <div className="space-y-4">

                {explanations.map((item, index) => (

                    <div
                        key={index}
                        className="flex justify-between items-center bg-slate-50 rounded-xl p-4"
                    >

                        <div className="flex items-center gap-3">

                            {item.positive ? (

                                <TrendingDown
                                    className="text-green-600"
                                />

                            ) : (

                                <TrendingUp
                                    className="text-red-600"
                                />

                            )}

                            <span>{item.label}</span>

                        </div>

                        <span
                            className={`font-bold ${
                                item.positive
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {item.impact}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );

}