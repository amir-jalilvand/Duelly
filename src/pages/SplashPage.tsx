import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/brand/logo.svg'
import logotype from '../assets/brand/logotype.svg'
import { PageShell } from '../components/PageShell'
import { useI18n } from '../i18n/I18nProvider'

export function SplashPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const hasLocale = Boolean(localStorage.getItem('duelly.locale'))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate(hasLocale ? '/home' : '/language', { replace: true })
    }, 1700)
    return () => window.clearTimeout(timer)
  }, [hasLocale, navigate])

  return (
    <PageShell title={t.appName}>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-10">
        <div className="clay-card flex items-center gap-3 px-5 py-4">
          <img src={logo} alt="" width={72} height={72} className="size-[72px]" />
          <img src={logotype} alt="DUELLY" width={168} height={72} className="h-[72px] w-[168px]" />
        </div>
        <div className="mt-8 h-4 w-[260px] overflow-hidden rounded-full border border-white/10 bg-cream shadow-[0_0_20px_rgba(64,123,255,0.2)]">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-[linear-gradient(90deg,#407BFF,#EA526F)] shadow-[0_0_16px_rgba(64,123,255,0.5)]" />
        </div>
        <p className="font-display mt-8 text-base font-medium text-muted">{t.loading}</p>
      </div>
    </PageShell>
  )
}
