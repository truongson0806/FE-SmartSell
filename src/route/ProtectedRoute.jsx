import useAuthStore from '@/store/useAuthStore'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
    const { isAuthenticated, user } = useAuthStore()

    // Nếu chưa authenticated → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Nếu có allowedRoles và user role không trong list → redirect to forbidden
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/not-allowed" replace />
    }

    return element
}

export default ProtectedRoute
