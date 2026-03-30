import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes, storeOwnerRoutes } from './route'

const routes = [
    ...publicRoutes,
    ...storeOwnerRoutes
  
]

const router = createBrowserRouter(routes)

export default function Router() {
    return <RouterProvider router={router} />
}
