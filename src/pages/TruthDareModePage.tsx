import { Navigate, useNavigate } from 'react-router-dom'
import truthIcon from '../assets/games/truth-dare.png'
import { useAppState } from '../app/AppState'
import { DifficultyButton } from '../components/DifficultyButton'
import { PageShell } from '../components/PageShell'
import type { TruthDareMode } from '../games/truthDare/types'
import { useI18n } from '../i18n/I18nProvider'

export function TruthDareModePage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { opponent, setTruthDareMode } = useAppState()

  if (opponent !== 'friend') {
    return <Navigate to="/home" replace />
  }

  const choose = (mode: TruthDareMode) => {
    setTruthDareMode(mode)
    navigate('/truth-dare/play')
  }

  return (
    <PageShell title={t.truthDare} onBack={() => navigate('/home')}>
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-3 pb-3">
        <div className="clay-card flex size-[120px] items-center justify-center rounded-[28px] p-2">
          <img src={truthIcon} alt="" className="h-[100px] w-[100px] object-contain" />
        </div>
        <h2 className="font-display mt-3 text-center text-xl font-semibold text-ink">
          {t.chooseContentMode}
        </h2>
        <p className="mt-2 text-center text-[15px] font-medium text-muted">{t.contentModeHint}</p>

        <div className="mt-4 flex w-full max-w-[340px] flex-col gap-3">
          <DifficultyButton label={t.modeNormal} onClick={() => choose('normal')} />
          <DifficultyButton label={t.modeAdult} dir="ltr" onClick={() => choose('adult')} />
        </div>
      </div>
    </PageShell>
  )
}
