import {
    Bell,
    CalendarDays,
    ShieldCheck,
    UserCircle2,
} from "lucide-react";

export default function Navbar() {

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (

        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-slate-200">

            <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

                <div className="flex items-center gap-4">

                    <div className="bg-blue-600 p-3 rounded-2xl shadow">

                        <ShieldCheck
                            size={28}
                            className="text-white"
                        />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                            CreditWise AI
                        </h1>

                        <p className="text-sm text-slate-500">
                            Explainable Credit Risk Assessment Platform
                        </p>

                    </div>

                </div>

                <div className="hidden lg:flex items-center gap-8">

                    <div className="flex items-center gap-2 text-slate-500">

                        <CalendarDays size={18} />

                        <span className="text-sm">
                            {today}
                        </span>

                    </div>

                    <button className="relative p-3 rounded-xl hover:bg-slate-100 transition">

                        <Bell
                            size={22}
                            className="text-slate-600"
                        />

                        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

                    </button>

                    <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-4 py-2">

                        <UserCircle2
                            size={38}
                            className="text-blue-600"
                        />

                        <div>

                            <p className="text-xs text-slate-500">
                                Signed In
                            </p>

                            <h3 className="font-semibold">
                                Credit Analyst
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </header>

    );

}