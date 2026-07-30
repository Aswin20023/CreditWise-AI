const filters = [
    "Today",
    "7 Days",
    "30 Days",
    "90 Days",
    "All Time",
];

export default function AnalyticsFilter({
    selected,
    setSelected,
}) {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">

            <div className="flex flex-wrap gap-3">

                {filters.map(filter => (

                    <button
                        key={filter}
                        onClick={() => setSelected(filter)}
                        className={`px-5 py-2 rounded-xl transition font-medium ${
                            selected === filter
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                    >
                        {filter}
                    </button>

                ))}

            </div>

        </div>

    );

}