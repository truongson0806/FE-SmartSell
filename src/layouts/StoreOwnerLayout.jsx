import { Outlet } from "react-router-dom";
import StoreOwnerLayoutSidebar from "../components/StoreOwnerSidebar/StoreOwnerSidebar";

export default function StoreOwnerLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <StoreOwnerLayoutSidebar />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
