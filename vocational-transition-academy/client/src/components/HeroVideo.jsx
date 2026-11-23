import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HERO_VIDEO } from '../constants/site'

export default function HeroVideo() {
  const { t } = useTranslation()
  const videoRef = useRef(null)
  const [reduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [playing, setPlaying] = useState(!reduceMotion)

  if (!HERO_VIDEO.src) {
    return (
      <div
        role="img"
        aria-label={t('hero.videoPlaceholder')}
        className="reference-grid flex h-[450px] w-full items-center justify-center border border-white/15 p-6 text-center text-white/70"
      >
        <p className="max-w-xs text-sm">{t('hero.videoPlaceholder')}</p>
      </div>
    )
  }

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="relative w-full min-w-0">
      <video
        ref={videoRef}
        className="h-[450px] w-full border border-white/15 bg-udaan-navy object-cover opacity-65"
        src={HERO_VIDEO.src}
        poster={HERO_VIDEO.poster || undefined}
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        aria-label={t('hero.videoLabel')}
      >
        {HERO_VIDEO.captions && (
          <track kind="captions" src={HERO_VIDEO.captions} srcLang="en" label="English" default />
        )}
      </video>
      <button
        type="button"
        onClick={toggle}
        className="absolute bottom-3 right-3 rounded bg-udaan-navy/90 px-3 py-2 text-sm font-medium text-white hover:bg-udaan-navy"
      >
        {playing ? t('hero.pause') : t('hero.play')}
      </button>
    </div>
  )
}