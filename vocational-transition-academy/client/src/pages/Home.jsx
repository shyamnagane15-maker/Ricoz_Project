import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import usePageTitle from '../hooks/usePageTitle'
import HeroVideo from '../components/HeroVideo'
import JobSearchPreview from '../components/JobSearchPreview'

const audiences = [
  { key: 'trainees', to: '/programs' },
  { key: 'parents', to: '/parents' },
  { key: 'employers', to: '/employers' },
]
const tracks = ['dataEntry', 'packaging', 'animalCare', 'retail']

export default function Home() {
  const { t } = useTranslation()
  usePageTitle(t('nav.home'))

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight text-udaan-navy">{t('hero.title')}</h1>
          <p className="mt-4 text-lg text-udaan-muted">{t('hero.text')}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/programs" className="rounded-md bg-udaan-brand px-6 py-3 font-semibold text-white hover:bg-udaan-navy">
              {t('hero.explore')}
            </Link>
            <Link to="/enquiry" className="rounded-md border-2 border-udaan-brand bg-white px-6 py-3 font-semibold text-udaan-brand hover:bg-udaan-cloud">
              {t('hero.enquire')}
            </Link>
          </div>
        </div>
        <HeroVideo />
      </section>

      <section aria-labelledby="audiences-heading" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 id="audiences-heading" className="text-2xl font-bold text-udaan-navy">{t('audiences.title')}</h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.key} className="rounded-lg border-t-4 border-udaan-brand bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-udaan-navy">
                <Link to={a.to} className="hover:underline">{t(`audiences.${a.key}.title`)}</Link>
              </h3>
              <p className="mt-2 text-udaan-muted">{t(`audiences.${a.key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tracks-heading" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 id="tracks-heading" className="text-2xl font-bold text-udaan-navy">{t('tracks.title')}</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((k) => (
              <li key={k} className="rounded-lg border border-udaan-sky/40 bg-udaan-cloud p-6">
                <h3 className="text-lg font-semibold text-udaan-navy">{t(`tracks.${k}`)}</h3>
                <p className="mt-2 text-sm text-udaan-muted">{t('tracks.pending')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JobSearchPreview />
    </>
  )
}