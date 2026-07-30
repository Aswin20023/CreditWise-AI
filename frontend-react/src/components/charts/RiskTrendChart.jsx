import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function RiskTrendChart({ history = [] }) {

    const data = [...history]
        .sort((a, b) => a.id - b.id)
        .map(item => ({
            id: item.id,
            risk: Number((item.probability_default * 100).toFixed(2)),
        }));

    return (

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

            <h2 className="text-2xl font-bold mb-6">
                Risk Trend
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="4 4" />

                    <XAxis
                        dataKey="id"
                        label={{
                            value: "Prediction ID",
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />

                    <YAxis
                        domain={[0, 100]}
                        label={{
                            value: "Risk %",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="risk"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{
                            r: 5,
                        }}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}