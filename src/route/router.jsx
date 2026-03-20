import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { publicRoutes } from './route'

const routes = [
    ...publicRoutes,
  
]

const router = createBrowserRouter(routes)

export default function Router() {
    return <RouterProvider router={router} />
}
