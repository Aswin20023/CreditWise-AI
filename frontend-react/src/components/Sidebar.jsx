import {
  LayoutDashboard,
  Activity,
  ShieldCheck,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "New Analysis",
    icon: Activity,
    path: "/prediction",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col justify-between">

      <div>

        <div className="px-8 py-8">

          <h1 className="text-3xl font-bold text-blue-600">
            CreditWise
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            AI Risk Intelligence
          </p>

        </div>

        <nav className="mt-6">

          {menu.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center gap-4 px-8 py-4 transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >

                <Icon size={20} />

                <span className="font-medium">
                  {item.title}
                </span>

              </NavLink>

            );

          })}

        </nav>

      </div>

      <div className="p-6">

        <div className="rounded-2xl bg-blue-600 text-white p-5">

          <ShieldCheck className="mb-3" size={26} />

          <h3 className="font-semibold">
            Model Status
          </h3>

          <p className="text-sm opacity-80 mt-2">
            Random Forest Model
          </p>

          <div className="mt-4 flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-green-400"></span>

            <span className="text-sm">
              API Connected
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}