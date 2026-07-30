const options = [
    { label: "All Records", value: "all" },
    { label: "Today", value: "today" },
    { label: "Last 7 Days", value: "7days" },
    { label: "Last 30 Days", value: "30days" },
];

export default function DashboardFilter({ filter, setFilter }) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">

            <div className="flex flex-wrap gap-3">

                {options.map(option => (

                    <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`px-5 py-2 rounded-xl font-medium transition-all duration-200
                        ${
                            filter === option.value
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {option.label}
                    </button>

                ))}

            </div>

        </div>

    );

}