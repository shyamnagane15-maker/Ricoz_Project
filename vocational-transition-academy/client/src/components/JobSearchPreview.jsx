
import { useTranslation } from 'react-i18next'
import { JOB_SEARCH_OPTIONS } from '../constants/site'

const fields = ['disability', 'location', 'qualification']

export default function JobSearchPreview() {
  const { t } = useTranslation()

  return (
    <section aria-labelledby="explore-heading" className="mx-auto max-w-7xl px-6 py-20">
      <div className="section-rule flex items-end justify-between pt-5">
        <h2 id="explore-heading" className="text-4xl font-black text-udaan-navy md:text-5xl">{t('jobs.title')}</h2>
        <p className="eyebrow text-udaan-muted">04 / Search</p>
      </div>
      <p className="mt-5 max-w-2xl text-lg text-udaan-muted">{t('jobs.text')}</p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 grid gap-px border border-udaan-ink/15 bg-udaan-ink/15 md:grid-cols-4 md:items-end"
      >
        {fields.map((f) => (
          <div key={f}>
            <label htmlFor={`jobs-${f}`} className="block text-sm font-semibold text-udaan-navy">
              {t(`jobs.${f}`)}
            </label>
            <select
              id={`jobs-${f}`}
              defaultValue=""
              className="mt-1 w-full rounded-md border border-udaan-muted bg-white px-3 py-3 text-udaan-ink"
            >
              <option value="">{t('jobs.select')}</option>
              {JOB_SEARCH_OPTIONS[f].map((o) => (
                <option key={o} value={o}>{t(`jobs.options.${f}.${o}`)}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          aria-disabled="true"
          aria-describedby="jobs-soon"
          className="cursor-not-allowed rounded-md bg-udaan-muted px-6 py-3 font-semibold text-white"
        >
          {t('jobs.search')}
        </button>
      </form>
      <p id="jobs-soon" className="mt-3 text-sm text-udaan-muted">{t('jobs.soon')}</p>
    </section>
  )
}