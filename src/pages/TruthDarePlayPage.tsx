import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppState'
import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { pickPrompt } from '../games/truthDare/prompts'
import type { Prompt, PromptKind } from '../games/truthDare/types'
import { useI18n } from '../i18n/I18nProvider'

type Turn = 'you' | 'friend'

export function TruthDarePlayPage() {
  const { truthDareMode } = useAppState()
  if (!truthDareMode) return <Navigate to="/truth-dare" replace />
  return <TruthDarePlaySession />
}

function TruthDarePlaySession() {
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const { truthDareMode } = useAppState()
  const mode = truthDareMode!

  const [turn, setTurn] = useState<Turn>('you')
  const [kind, setKind] = useState<PromptKind | null>(null)
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  const reveal = (nextKind: PromptKind) => {
    const next = pickPrompt(mode, nextKind, prompt?.en)
    setKind(nextKind)
    setPrompt(next)
  }

  const onAnswered = () => {
    setKind(null)
    setPrompt(null)
    setTurn((prev) => (prev === 'you' ? 'friend' : 'you'))
  }

  const text = prompt ? (locale === 'fa' ? prompt.fa : prompt.en) : null
  const showingPrompt = Boolean(text && kind)

  return (
    <PageShell title={t.truthDare} onBack={() => navigate('/truth-dare')}>
      <div className="flex flex-1 flex-col items-center px-6 pt-4 pb-4">
        <p
          className="font-display rounded-full border border-white/10 bg-cream/90 px-3 py-1 text-xs font-semibold text-muted shadow-[var(--shadow-clay-sm)]"
          dir={mode === 'adult' ? 'ltr' : undefined}
        >
          {mode === 'adult' ? t.modeAdult : t.modeNormal}
        </p>

        <h2 className="font-display mt-5 text-center text-xl font-semibold text-ink">
          {showingPrompt ? t.pickTruthOrDare : turn === 'you' ? t.yourTurnTd : t.friendTurnTd}
        </h2>
        {!showingPrompt ? (
          <p className="mt-2 text-center text-[15px] font-medium text-muted">{t.pickTruthOrDareHint}</p>
        ) : null}

        {!showingPrompt ? (
          <div className="mt-6 flex w-full max-w-[340px] gap-3">
            <button
              type="button"
              onClick={() => reveal('truth')}
              className="clay-press font-display flex min-h-[88px] flex-1 items-center justify-center rounded-[22px] text-lg font-semibold text-white"
              style={{ backgroundColor: '#407BFF' }}
            >
              {t.truth}
            </button>
            <button
              type="button"
              onClick={() => reveal('dare')}
              className="clay-press font-display flex min-h-[88px] flex-1 items-center justify-center rounded-[22px] text-lg font-semibold text-white"
              style={{ backgroundColor: '#EA526F' }}
            >
              {t.dare}
            </button>
          </div>
        ) : null}

        {showingPrompt ? (
          <div className="clay-card mt-8 w-full max-w-[340px] px-5 py-6">
            <p
              className="font-display text-center text-xs font-semibold uppercase tracking-wide"
              style={{ color: kind === 'truth' ? '#407BFF' : '#EA526F' }}
            >
              {kind === 'truth' ? t.truth : t.dare}
            </p>
            <p className="font-display mt-3 text-center text-lg font-semibold leading-snug text-ink">
              {text}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={onAnswered}>{t.iAnswered}</Button>
              <Button variant="ghost" onClick={() => kind && reveal(kind)}>
                {t.nextPrompt}
              </Button>
              <Button variant="ghost" onClick={() => navigate('/truth-dare')}>
                {t.changeContentMode}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </PageShell>
  )
}
