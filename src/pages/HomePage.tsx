import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import friendIcon from '../assets/competitors/friend.png'
import robotIcon from '../assets/competitors/robot.png'
import xoIcon from '../assets/games/xo.png'
import truthIcon from '../assets/games/truth-dare.png'
import rpsIcon from '../assets/games/rps.png'
import { useAppState } from '../app/AppState'
import { useFriendSession } from '../app/FriendSession'
import type { GameKind } from '../app/friendRoom'
import { BrandTitle } from '../components/BrandTitle'
import { ChoiceCard } from '../components/ChoiceCard'
import { Modal } from '../components/Modal'
import { PageShell } from '../components/PageShell'
import { useI18n } from '../i18n/I18nProvider'

export function HomePage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { setOpponent } = useAppState()
  const { startHostInvite } = useFriendSession()
  const [showCompetitor, setShowCompetitor] = useState(false)
  const [selectedGame, setSelectedGame] = useState<GameKind | null>(null)

  const openCompetitorPicker = (game: 'xo' | 'rps') => {
    setSelectedGame(game)
    setOpponent(null)
    setShowCompetitor(true)
  }

  const startFriend = (game: GameKind) => {
    setOpponent('friend')
    startHostInvite(game)
    setShowCompetitor(false)
    navigate('/waiting')
  }

  const startRobot = (game: 'xo' | 'rps') => {
    setOpponent('robot')
    setShowCompetitor(false)
    if (game === 'xo') navigate('/xo/challenge')
    else navigate('/rps/challenge')
  }

  return (
    <PageShell title={t.appName}>
      <div className="flex min-h-0 flex-1 flex-col px-6 pt-3 pb-3">
        <BrandTitle welcome={t.welcomeTo} />
        <p className="font-display mt-3 text-center text-lg font-medium text-ink">{t.chooseGame}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <ChoiceCard
            label={t.xo}
            icon={xoIcon}
            selected={selectedGame === 'xo' && showCompetitor}
            onClick={() => openCompetitorPicker('xo')}
          />
          <ChoiceCard
            label={t.truthDare}
            icon={truthIcon}
            selected={selectedGame === 'truthDare'}
            onClick={() => {
              setSelectedGame('truthDare')
              startFriend('truthDare')
            }}
          />
          <div className="col-span-2 flex justify-center">
            <div className="w-[calc(50%-8px)]">
              <ChoiceCard
                label={t.rps}
                icon={rpsIcon}
                selected={selectedGame === 'rps' && showCompetitor}
                onClick={() => openCompetitorPicker('rps')}
              />
            </div>
          </div>
        </div>
      </div>

      {showCompetitor && (selectedGame === 'xo' || selectedGame === 'rps') ? (
        <Modal
          title={t.selectCompetitor}
          onClose={() => {
            setShowCompetitor(false)
            setSelectedGame(null)
          }}
        >
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => startFriend(selectedGame)}
              className="clay-press clay-card flex min-h-[172px] w-full flex-col items-center justify-center gap-2.5 px-3 py-5"
            >
              <img src={friendIcon} alt="" className="h-[92px] w-[110px] shrink-0 object-contain" />
              <span className="font-display px-1 text-center text-base font-semibold leading-tight text-ink">
                {t.playWithFriend}
              </span>
            </button>
            <button
              type="button"
              onClick={() => startRobot(selectedGame)}
              className="clay-press clay-card flex min-h-[172px] w-full flex-col items-center justify-center gap-2.5 border-blue px-3 py-5 shadow-[0_0_22px_rgba(64,123,255,0.25)]"
            >
              <img src={robotIcon} alt="" className="h-[92px] w-[110px] shrink-0 object-contain" />
              <span className="font-display px-1 text-center text-base font-semibold leading-tight text-ink">
                {t.playWithRobot}
              </span>
            </button>
          </div>
        </Modal>
      ) : null}
    </PageShell>
  )
}
