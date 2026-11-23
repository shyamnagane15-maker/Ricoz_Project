import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'
import useAuth from '../hooks/useAuth'
import Field from '../components/Field'
import { PORTALS } from '../constants/portals'

export default function LoginForm() {
  const { portal } = useParams()
  const { t } = useTranslation()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const config = PORTALS[portal]
  const name = config ? t(`auth.portalName.${portal}`) : ''
  usePageTitle(name ? t('auth.loginTitle', { portal: name }) : t('auth.chooser.title'))

  if (!config) return <Navigate to="/login" replace />
  if (user) return <Navigate to={`/dashboard/${user.role}`} replace />

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const u = await login(portal, email, password)
      navigate(`/dashboard/${u.role}`, { replace: true })
    } catch (err) {
      setError(err.message || t('auth.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-udaan-navy">{t('auth.loginTitle', { portal: name })}</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow-sm">
        {error && (
          <p role="alert" className="rounded-md border border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        <Field id="email" label={t('auth.email')} type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field id="password" label={t('auth.password')} type={show ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-udaan-ink">
          <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-5 w-5" />
          {t('auth.show')}
        </label>
        <button type="submit" disabled={busy} className="w-full rounded-md bg-udaan-brand px-6 py-3 font-semibold text-white hover:bg-udaan-navy disabled:opacity-70">
          {busy ? t('auth.signingIn') : t('auth.signIn')}
        </button>
      </form>

      <div className="mt-6 space-y-2 text-sm text-udaan-muted">
        {config.signupRole ? (
          <p>
            {t('auth.noAccount')}{' '}
            <Link to={`/signup/${portal}`} className="font-semibold text-udaan-brand underline">{t('auth.createAccount')}</Link>
          </p>
        ) : (
          <p>{t('auth.staffNote')}</p>
        )}
        <p><Link to="/login" className="font-semibold text-udaan-brand underline">{t('auth.changePortal')}</Link></p>
      </div>
    </section>
  )
}