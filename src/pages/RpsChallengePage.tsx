import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import robotIcon from '../assets/competitors/robot.png'
import { useAppState } from '../app/AppState'
import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { normalizeRounds, RPS_ROUND_OPTIONS } from '../games/rps/logic'
import { useI18n } from '../i18n/I18nProvider'

export function RpsChallengePage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { setOpponent, setRpsSession } = useAppState()
  const [rounds, setRounds] = useState(7)

  useEffect(() => {
    setOpponent('robot')
  }, [setOpponent])

  const start = () => {
    setRpsSession({
      rounds: normalizeRounds(rounds),
    })
    navigate('/rps/play')
  }

  return (
    <PageShell title={t.rps} onBack={() => navigate('/home')}>
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-3 pb-3">
        <div className="clay-card flex size-[120px] items-center justify-center rounded-[28px] p-2">
          <img src={robotIcon} alt="" className="h-[100px] w-[100px] object-contain" />
        </div>
        <h2 className="font-display mt-3 text-center text-xl font-semibold text-ink">
          {t.enterRounds}
        </h2>
        <p className="mt-2 text-center text-[15px] font-medium text-muted">{t.roundsHint}</p>

        <div className="mt-4 flex w-full max-w-[340px] flex-col gap-4">
          <div className="grid grid-cols-4 gap-2">
            {RPS_ROUND_OPTIONS.map((option) => {
              const selected = rounds === option
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRounds(option)}
                  className="clay-press font-display flex min-h-[58px] items-center justify-center rounded-2xl text-lg font-semibold"
                  style={
                    selected
                      ? {
                          backgroundColor: '#407BFF',
                          color: '#FFFFFF',
                          boxShadow: '0 0 18px rgba(64, 123, 255, 0.4)',
                        }
                      : {
                          backgroundColor: 'rgba(23,30,46,0.95)',
                          color: '#EFF1ED',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }
                  }
                >
                  {option}
                </button>
              )
            })}
          </div>
          <Button onClick={start}>{t.startMatch}</Button>
        </div>
      </div>
    </PageShell>
  )
}
