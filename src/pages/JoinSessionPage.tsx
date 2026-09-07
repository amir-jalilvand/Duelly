import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import friendIcon from '../assets/competitors/friend.png'
import { useAppState } from '../app/AppState'
import { useFriendSession } from '../app/FriendSession'
import { playPathForGame, readRoom } from '../app/friendRoom'
import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { useI18n } from '../i18n/I18nProvider'

export function JoinSessionPage() {
  const { roomId = '' } = useParams()
  const navigate = useNavigate()
  const { t } = useI18n()
  const { setOpponent, setSession, setRpsSession } = useAppState()
  const { joinAsGuest } = useFriendSession()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!roomId) {
      setError(t.joinInvalid)
      return
    }
    const existing = readRoom(roomId)
    if (!existing) {
      setError(t.joinInvalid)
      return
    }

    const room = joinAsGuest(roomId)
    if (!room) {
      setError(t.joinInvalid)
      return
    }

    setOpponent('friend')
    if (room.game === 'xo') {
      setSession({ difficulty: 'easy', starter: 'you' })
    }
    if (room.game === 'rps') {
      setRpsSession({ rounds: 7 })
    }
    navigate(playPathForGame(room.game), { replace: true })
  }, [roomId, joinAsGuest, navigate, setOpponent, setSession, setRpsSession, t.joinInvalid])

  return (
    <PageShell title={t.appName} onBack={() => navigate('/home')}>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 overflow-hidden px-6 pb-6">
        <div className="clay-card flex size-[148px] items-center justify-center rounded-[28px] p-2">
          <img src={friendIcon} alt="" className="h-[128px] w-[128px] object-contain" />
        </div>
        {error ? (
          <>
            <p className="font-display text-center text-lg font-semibold text-ink">{error}</p>
            <Button onClick={() => navigate('/home')}>{t.home}</Button>
          </>
        ) : (
          <>
            <div className="h-10 w-10 animate-spin rounded-full border-[4px] border-line border-t-blue" />
            <p className="font-display text-base font-semibold text-ink">{t.joiningSession}</p>
          </>
        )}
      </div>
    </PageShell>
  )
}
