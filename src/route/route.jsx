import MainLayout from "../layouts/MainLayout";
import StoreOwnerLayout from "../layouts/StoreOwnerLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import Forbiden from "../pages/forbiden/Forbiden";
import HomePage from "../pages/Home/Home";
import PageNotFound from "../pages/not-found/PageNotFound";
import DashboardOwnerPage from "../pages/StoreOwner/Dashboard/DashboardOwner";
import OrdersOwnerPage from "../pages/StoreOwner/Orders/OrdersOwnerStore";
import ProductsOwnerPage from "../pages/StoreOwner/Products/ProductsOwner";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserManagement from "../pages/Admin/UserManagement";
import StoreManagement from "../pages/Admin/StoreManagement";
import OrdersAdmin from "../pages/Admin/OrdersAdmin";
import Analytics from "../pages/Admin/Analytics";
import AdminSettings from "../pages/Admin/AdminSettings";
import Customer from "../components/Customer";

// Public routes không cần bảo vệ
export const publicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
    {
        path: 'not-allowed',
        element: <Forbiden />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]

// Store Owner routes
export const storeOwnerRoutes = [
    {
      path: '/store-owner',
      element: (
        <ProtectedRoute 
          element={<StoreOwnerLayout />}
          allowedRoles={['store-owner']}
        />
      ),
      children: [
        { index: true, element: <DashboardOwnerPage /> },
        { path: 'dashboard', element: <DashboardOwnerPage /> },
        { path: 'products', element: <ProductsOwnerPage /> },
        { path: 'orders', element: <OrdersOwnerPage /> },
        { path: '*', element: <PageNotFound /> },
      ],
    },
]

// Admin routes
export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute 
        element={<AdminLayout />}
        allowedRoles={['admin']}
      />
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
      { path: "stores", element: <StoreManagement /> },
      { path: "orders", element: <OrdSersAdmin /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <AdminSettings /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
];



