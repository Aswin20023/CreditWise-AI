import { TrendingUp } from "lucide-react";

export default function KPICard({
    title,
    value,
    subtitle = "",
    icon: Icon = TrendingUp,
    color = "blue",
}) {

    const colors = {
        blue: {
            bg: "bg-blue-50",
            icon: "bg-blue-600",
            text: "text-blue-700",
        },
        green: {
            bg: "bg-green-50",
            icon: "bg-green-600",
            text: "text-green-700",
        },
        red: {
            bg: "bg-red-50",
            icon: "bg-red-600",
            text: "text-red-700",
        },
        yellow: {
            bg: "bg-yellow-50",
            icon: "bg-yellow-500",
            text: "text-yellow-700",
        },
        purple: {
            bg: "bg-purple-50",
            icon: "bg-purple-600",
            text: "text-purple-700",
        },
    };

    const theme = colors[color] || colors.blue;

    return (

        <div
            className={`${theme.bg} rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-all duration-300`}
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-gray-500 text-sm font-medium">
                        {title}
                    </p>

                    <h2 className={`text-4xl font-bold mt-4 ${theme.text}`}>
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-gray-500 mt-4 text-sm">
                            {subtitle}
                        </p>
                    )}

                </div>

                <div
                    className={`${theme.icon} text-white rounded-2xl p-4`}
                >
                    <Icon size={28} />
                </div>

            </div>

        </div>

    );

}