import { NavLink } from "react-router-dom";
import {
  Dashboard,
  People,
  Store,
  Receipt,
  BarChart,
  Settings,
  Logout,
} from "@mui/icons-material";

export default function AdminSidebar() {
  const menuItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: <Dashboard /> },
    { label: "Users", path: "/admin/users", icon: <People /> },
    { label: "Stores", path: "/admin/stores", icon: <Store /> },
    { label: "Orders", path: "/admin/orders", icon: <Receipt /> },
    { label: "Analytics", path: "/admin/analytics", icon: <BarChart /> },
    { label: "Settings", path: "/admin/settings", icon: <Settings /> },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">👑 Admin</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-12 pt-6 border-t border-slate-200">
        <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition">
          <Logout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
