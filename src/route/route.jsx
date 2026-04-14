import MainLayout from "../layouts/MainLayout";
import StoreOwnerLayout from "../layouts/StoreOwnerLayout";
import Forbiden from "../pages/forbiden/Forbiden";
import HomePage from "../pages/Home/Home";
import PageNotFound from "../pages/not-found/PageNotFound";
import DashboardOwnerPage from "../pages/StoreOwner/Dashboard/DashboardOwner";
import OrdersOwnerPage from "../pages/StoreOwner/Orders/OrdersOwnerStore";
import ProductsOwnerPage from "../pages/StoreOwner/Products/ProductsOwner";
import Customer from "../pages/Customer/Dash/Customer";
// Public routes không cần bảo vệ
export const publicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
    },
    {
        path: '/customer',
        element: <Customer />,
    },
    // {
    //     path: 'login',
    //     element: <Login />,
    // },
    {
        path: 'not-allowed',
        element: <Forbiden />,
    },
    {
        path: '*',
        element: <PageNotFound />,
    },
]
// export const storeOwnerRoutes = [
//     {
//         path: '/store-owner',
//         element: (
//             <ProtectedRoute
//                 element={<StoreOwnerLayout />}
//             />
//         ),
//         children: [
//             { index: true, element: <DashboardOwnerPage /> },
//             {
//                 path: 'dashboard',
//                 element: <DashboardOwnerPage />,
//             },

//         ],
//     },
   
// ]
export const storeOwnerRoutes = [
    {
      path: '/store-owner',
      element: <StoreOwnerLayout />,
      children: [
        { index: true, element: <DashboardOwnerPage /> },
        { path: 'dashboard', element: <DashboardOwnerPage /> },
        { path: 'products', element: <ProductsOwnerPage /> },
        { path: 'orders', element: <OrdersOwnerPage /> },
        { path: '*', element: <PageNotFound /> },
        { path: 'not-allowed', element: <Forbiden /> },
        { path: 'customers', element: <Customer /> },
      ],
    },
  ]



