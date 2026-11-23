import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import useAuth from '../hooks/useAuth'

const links = [
  { to: '/', key: 'home', end: true },
  { to: '/programs', key: 'programs' },
  { to: '/about', key: 'about' },
  { to: '/parents', key: 'parents' },
  { to: '/employers', key: 'employers' },
  { to: '/contact', key: 'contact' },
]

const navClass = ({ isActive }) =>
  `block px-1 py-2 text-sm font-semibold hover:text-udaan-gold ${
    isActive ? 'text-udaan-gold' : 'text-white/75'
  }`

export default function PublicLayout() {
  const { t, i18n } = useTranslation()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    setOpen(false)
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  const langButton = (code, label) => (
    <button
      type="button"
      lang={code}
      aria-pressed={i18n.language === code}
      onClick={() => i18n.changeLanguage(code)}
      className={`rounded px-3 py-1 text-sm font-medium ${
        i18n.language === code ? 'bg-white text-udaan-navy' : 'border border-white/60 text-white'
      }`}
    >
      {label}
    </button>
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-udaan-gold focus:px-4 focus:py-2 focus:text-udaan-navy"
      >
        {t('skip')}
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-udaan-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <Link to="/" className="text-xl font-black tracking-[-0.04em]">
            {t('brand.name')} <span className="font-normal text-udaan-gold">{t('brand.suffix')}</span>
          </Link>

          <button
            type="button"
            className="rounded border border-white/60 px-3 py-2 text-sm md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {t('nav.menu')}
          </button>

          <nav
            id="site-nav"
            aria-label={t('nav.label')}
            className={`${open ? 'block' : 'hidden'} w-full md:block md:w-auto`}
          >
            <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.end} className={navClass}>
                    {t(`nav.${l.key}`)}
                  </NavLink>
                </li>
              ))}
                            {user ? (
                <>
                  <li>
                    <Link to={`/dashboard/${user.role}`} className="inline-block rounded bg-udaan-gold px-4 py-2 text-sm font-semibold text-udaan-navy">
                      {t('nav.dashboard')}
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={logout} className="rounded border border-white/60 px-3 py-2 text-sm font-medium">
                      {t('nav.logout')}
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="inline-block rounded bg-udaan-gold px-4 py-2 text-sm font-semibold text-udaan-navy">
                    {t('nav.login')}
                  </Link>
                </li>
              )}
              <li>
                <div role="group" aria-label={t('lang.label')} className="flex gap-1">
                  {langButton('en', 'English')}
                  {langButton('hi', 'हिन्दी')}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="min-h-[60vh] outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-udaan-navy text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm">
          <p>{t('footer.contactPending')}</p>
          <ul className="flex gap-6">
            <li><Link to="/privacy" className="hover:underline">{t('footer.privacy')}</Link></li>
            <li><Link to="/accessibility" className="hover:underline">{t('footer.accessibility')}</Link></li>
          </ul>
        </div>
      </footer>
    </>
  )
}