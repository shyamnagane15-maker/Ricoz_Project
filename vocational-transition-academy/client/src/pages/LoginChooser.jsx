import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'
import { PORTAL_KEYS } from '../constants/portals'

export default function LoginChooser() {
  const { t } = useTranslation()
  usePageTitle(t('auth.chooser.title'))

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-udaan-navy">{t('auth.chooser.title')}</h1>
      <p className="mt-3 max-w-2xl text-lg text-udaan-muted">{t('auth.chooser.text')}</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PORTAL_KEYS.map((k) => (
          <li key={k} className="lift rounded-lg border-t-4 border-udaan-brand bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-udaan-navy">
              <Link to={`/login/${k}`} className="hover:underline">{t(`auth.portalName.${k}`)}</Link>
            </h2>
            <p className="mt-2 text-udaan-muted">{t(`auth.chooser.${k}`)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}