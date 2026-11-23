import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'
import useAuth from '../hooks/useAuth'
import Field from '../components/Field'
import { PORTALS } from '../constants/portals'

export default function Signup() {
  const { portal } = useParams()
  const { t, i18n } = useTranslation()
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', organizationName: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [pending, setPending] = useState(false)
  const [busy, setBusy] = useState(false)

  const config = PORTALS[portal]
  const name = config ? t(`auth.portalName.${portal}`) : ''
  usePageTitle(name ? t('auth.signupTitle', { portal: name }) : t('auth.chooser.title'))

  if (!config || !config.signupRole) return <Navigate to="/login" replace />
  if (user) return <Navigate to={`/dashboard/${user.role}`} replace />

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const isEmployer = config.signupRole === 'employer'

  async function onSubmit(e) {
    e.preventDefault()
    setErrors({})
    setMessage('')
    setBusy(true)
    try {
      const body = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: config.signupRole,
        language: i18n.language === 'hi' ? 'hi' : 'en',
      }
      if (isEmployer) body.organizationName = form.organizationName
      const result = await register(body)
      if (result.pending) setPending(true)
      else navigate(`/dashboard/${result.user.role}`, { replace: true })
    } catch (err) {
      setErrors(err.errors || {})
      setMessage(err.message || t('auth.error'))
    } finally {
      setBusy(false)
    }
  }

  if (pending) {
    return (
      <section className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-3xl font-bold text-udaan-navy">{t('auth.pendingTitle')}</h1>
        <p role="status" className="mt-4 text-lg text-udaan-muted">{t('auth.pendingText')}</p>
        <p className="mt-6"><Link to="/" className="font-semibold text-udaan-brand underline">{t('nav.home')}</Link></p>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold text-udaan-navy">{t('auth.signupTitle', { portal: name })}</h1>
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow-sm">
        {message && (
          <p role="alert" className="rounded-md border border-red-700 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {message}
          </p>
        )}
        <Field id="name" label={t('auth.name')} autoComplete="name" required value={form.name} onChange={set('name')} error={errors.name} />
        {isEmployer && (
          <Field id="organizationName" label={t('auth.organization')} autoComplete="organization" required value={form.organizationName} onChange={set('organizationName')} error={errors.organizationName} />
        )}
        <Field id="email" label={t('auth.email')} type="email" autoComplete="email" required value={form.email} onChange={set('email')} error={errors.email} />
        <Field id="password" label={t('auth.password')} type="password" autoComplete="new-password" required hint={t('auth.passwordHint')} value={form.password} onChange={set('password')} error={errors.password} />
        <button type="submit" disabled={busy} className="w-full rounded-md bg-udaan-brand px-6 py-3 font-semibold text-white hover:bg-udaan-navy disabled:opacity-70">
          {busy ? t('auth.signingUp') : t('auth.signUp')}
        </button>
      </form>
      <p className="mt-6 text-sm text-udaan-muted">
        {t('auth.haveAccount')}{' '}
        <Link to={`/login/${portal}`} className="font-semibold text-udaan-brand underline">{t('auth.signIn')}</Link>
      </p>
    </section>
  )
}