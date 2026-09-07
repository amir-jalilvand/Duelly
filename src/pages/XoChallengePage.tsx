import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import robotIcon from '../assets/competitors/robot.png'
import { useAppState } from '../app/AppState'
import { Button } from '../components/Button'
import { DifficultyButton } from '../components/DifficultyButton'
import { Modal } from '../components/Modal'
import { PageShell } from '../components/PageShell'
import type { Difficulty, Starter } from '../games/xo/types'
import { useI18n } from '../i18n/I18nProvider'

export function XoChallengePage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { setSession, setOpponent } = useAppState()
  const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty | null>(null)

  useEffect(() => {
    setOpponent('robot')
  }, [setOpponent])

  const start = (starter: Starter) => {
    if (!pendingDifficulty) return
    setSession({ difficulty: pendingDifficulty, starter })
    navigate('/xo/play')
  }

  return (
    <PageShell title="XO" onBack={() => navigate('/home')}>
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-3 pb-3">
        <div className="clay-card flex size-[120px] items-center justify-center rounded-[28px] p-2">
          <img src={robotIcon} alt="" className="h-[100px] w-[100px] object-contain" />
        </div>
        <h2 className="font-display mt-3 text-center text-xl font-semibold text-ink">
          {t.chooseDifficulty}
        </h2>
        <p className="mt-2 text-center text-[15px] font-medium text-muted">{t.howChallenging}</p>

        <div className="mt-4 flex w-full max-w-[340px] flex-col gap-3">
          <DifficultyButton
            label={t.easy}
            selected={pendingDifficulty === 'easy'}
            onClick={() => setPendingDifficulty('easy')}
          />
          <DifficultyButton
            label={t.medium}
            selected={pendingDifficulty === 'medium'}
            onClick={() => setPendingDifficulty('medium')}
          />
          <DifficultyButton
            label={t.hard}
            selected={pendingDifficulty === 'hard'}
            onClick={() => setPendingDifficulty('hard')}
          />
        </div>
      </div>

      {pendingDifficulty ? (
        <Modal title={t.selectStarter} onClose={() => setPendingDifficulty(null)}>
          <div className="flex flex-col gap-4">
            <Button onClick={() => start('you')}>{t.startWithYou}</Button>
            <Button variant="pink" onClick={() => start('robot')}>
              {t.startWithRobot}
            </Button>
          </div>
        </Modal>
      ) : null}
    </PageShell>
  )
}
