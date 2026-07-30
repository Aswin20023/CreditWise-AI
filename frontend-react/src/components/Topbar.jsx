import {
  Bell,
  Search,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-10">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome back. Here's today's overview.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-4 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-5 py-3 w-72 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Date */}

        <div className="flex items-center gap-2 text-gray-600">

          <CalendarDays size={20} />

          <span>{today}</span>

        </div>

        {/* Notification */}

        <button className="relative w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">

          <Bell size={20} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>

        </button>

        {/* User */}

        <button className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2">

          <img
            src="https://ui-avatars.com/api/?name=Analyst&background=2563eb&color=fff"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />

          <div className="text-left">

            <p className="font-semibold text-gray-700">
              Credit Analyst
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
}