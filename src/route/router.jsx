import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes, storeOwnerRoutes, adminRoutes } from './route'

const routes = [
    ...publicRoutes,
    ...storeOwnerRoutes,
    ...adminRoutes
]

const router = createBrowserRouter(routes)

export default function Router() {
    return <RouterProvider router={router} />
}
