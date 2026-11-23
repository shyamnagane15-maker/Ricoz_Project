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
      <section className="reference-hero reference-grid text-white">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-8 px-6 py-20 md:grid-cols-2 lg:gap-10">
          <div className="min-w-0">
            <p className="eyebrow mb-8 text-udaan-gold">01 / Vocational empowerment</p>
            <h1 className="display-title text-white">{t('hero.title')}</h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{t('hero.text')}</p>
            <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/programs" className="rounded-full bg-udaan-brand px-7 py-4 font-bold text-udaan-navy hover:bg-white">
              {t('hero.explore')}
            </Link>
            <Link to="/enquiry" className="rounded-full border border-white/30 px-7 py-4 font-bold text-white hover:border-white hover:bg-white hover:text-udaan-navy">
              {t('hero.enquire')}
            </Link>
            </div>
          </div>
          <HeroVideo />
        </div>
      </section>

      <section aria-labelledby="audiences-heading" className="mx-auto max-w-7xl px-6 py-20">
        <div className="section-rule flex items-end justify-between pt-5">
          <h2 id="audiences-heading" className="text-4xl font-black text-udaan-ink md:text-5xl">{t('audiences.title')}</h2>
          <p className="eyebrow text-udaan-muted">02 / Start here</p>
        </div>
        <ul className="mt-10 grid gap-px overflow-hidden border border-udaan-ink/10 bg-udaan-ink/10 md:grid-cols-3">
          {audiences.map((a) => (
            <li key={a.key} className="reference-card min-h-56 p-8">
              <p className="eyebrow text-udaan-muted">0{audiences.indexOf(a) + 1}</p>
              <h3 className="mt-10 text-2xl font-bold text-udaan-navy">
                <Link to={a.to} className="hover:text-udaan-muted">{t(`audiences.${a.key}.title`)}</Link>
              </h3>
              <p className="mt-3 leading-relaxed text-udaan-muted">{t(`audiences.${a.key}.text`)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tracks-heading" className="bg-udaan-navy py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="section-rule border-white/20 flex items-end justify-between pt-5">
            <h2 id="tracks-heading" className="text-4xl font-black md:text-5xl">{t('tracks.title')}</h2>
            <p className="eyebrow text-udaan-gold">03 / Programs</p>
          </div>
          <ul className="mt-10 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((k) => (
              <li key={k} className="min-h-56 bg-udaan-navy p-7 hover:bg-white/5">
                <p className="eyebrow text-white/40">0{tracks.indexOf(k) + 1}</p>
                <h3 className="mt-12 text-2xl font-bold">{t(`tracks.${k}`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{t('tracks.pending')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <JobSearchPreview />
    </>
  )
}