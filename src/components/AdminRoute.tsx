import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function AdminRoute() {
  const { user, loading } = useAuth()
  if (loading) return <p>Laddar...</p>
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'admin') return <Navigate to="/" replace />
  return <Outlet />
}

