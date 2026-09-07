import { useNavigate } from 'react-router-dom'
import flagEn from '../assets/flags/en.svg'
import flagFa from '../assets/flags/fa.svg'
import { BrandTitle } from '../components/BrandTitle'
import { ChoiceCard } from '../components/ChoiceCard'
import { PageShell } from '../components/PageShell'
import { useI18n } from '../i18n/I18nProvider'
import type { Locale } from '../i18n/messages'

export function LanguagePage() {
  const navigate = useNavigate()
  const { t, locale, setLocale } = useI18n()

  const choose = (next: Locale) => {
    setLocale(next)
    navigate('/home')
  }

  return (
    <PageShell title={t.appName} showClose>
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8">
        <BrandTitle welcome={t.welcomeTo} />
        <p className="font-display mt-5 text-center text-lg font-medium text-ink">{t.chooseLanguage}</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <ChoiceCard
            label={t.english}
            icon={flagEn}
            iconClassName="h-[96px] w-[112px] rounded-md object-cover"
            selected={locale === 'en'}
            onClick={() => choose('en')}
          />
          <ChoiceCard
            label={t.persian}
            icon={flagFa}
            iconClassName="h-[96px] w-[112px] rounded-md object-cover"
            selected={locale === 'fa'}
            onClick={() => choose('fa')}
          />
        </div>
      </div>
    </PageShell>
  )
}
