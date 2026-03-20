import MainLayout from "../layouts/MainLayout";
import Forbiden from "../pages/forbiden/Forbiden";
import HomePage from "../pages/Home/Home";
import PageNotFound from "../pages/not-found/PageNotFound";

// Public routes không cần bảo vệ
export const publicRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [{ index: true, element: <HomePage /> }],
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



