
import { Navigate, Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const { t } = useTranslation()
  if (loading) {
    return <p role="status" className="mx-auto max-w-6xl px-6 py-16 text-udaan-muted">{t('auth.loading')}</p>
  }
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}