import { Search } from "lucide-react";

export default function SearchBar({
    search,
    setSearch,
}) {

    return (

        <div className="relative">

            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
            />

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Prediction ID, Age or Risk..."
                className="w-full bg-white border rounded-2xl py-3 pl-12 pr-4 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

    );

}