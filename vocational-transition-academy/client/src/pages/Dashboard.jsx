import { Navigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'
import useAuth from '../hooks/useAuth'

export default function Dashboard() {
  const { role } = useParams()
  const { user } = useAuth()
  const { t } = useTranslation()
  usePageTitle(t('nav.dashboard'))

  if (role !== user.role) return <Navigate to={`/dashboard/${user.role}`} replace />

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-udaan-navy">{t('dash.welcome', { name: user.name })}</h1>
      <p className="mt-2 inline-block rounded bg-udaan-cloud px-3 py-1 text-sm font-semibold text-udaan-navy">
        {t(`dash.role.${user.role}`)}
      </p>
      <div className="mt-8 rounded-xl border border-udaan-sky/40 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-udaan-navy">{t('dash.emptyTitle')}</h2>
        <p className="mt-2 text-udaan-muted">{t(`dash.empty.${user.role}`)}</p>
      </div>
    </section>
  )
}