import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'

export default function InfoPage({ pageKey }) {
  const { t } = useTranslation()
  const title = t(`pages.${pageKey}.title`)
  usePageTitle(title)

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-udaan-navy">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-udaan-muted">{t('soon')}</p>
    </section>
  )
}