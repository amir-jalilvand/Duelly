import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import friendIcon from '../assets/competitors/friend.png'
import { useAppState } from '../app/AppState'
import { useFriendSession } from '../app/FriendSession'
import { inviteLinkForRoom, playPathForGame } from '../app/friendRoom'
import { tryShareInvite } from '../app/telegramShare'
import { Button } from '../components/Button'
import { PageShell } from '../components/PageShell'
import { useI18n } from '../i18n/I18nProvider'

export function WaitingFriendPage() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { setOpponent, setSession, setRpsSession } = useAppState()
  const { room, role, simulateFriendJoined, leaveRoom, refreshRoom } = useFriendSession()
  const [copied, setCopied] = useState(false)
  const [shareHint, setShareHint] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => refreshRoom(), 800)
    return () => window.clearInterval(timer)
  }, [refreshRoom])

  useEffect(() => {
    if (!room || room.status !== 'ready') return
    setOpponent('friend')
    if (room.game === 'xo') {
      setSession({ difficulty: 'easy', starter: 'you' })
    }
    if (room.game === 'rps') {
      setRpsSession({ rounds: 7 })
    }
    navigate(playPathForGame(room.game), { replace: true })
  }, [room, navigate, setOpponent, setSession, setRpsSession])

  if (!room || role !== 'host') {
    return <Navigate to="/home" replace />
  }

  const link = inviteLinkForRoom(room.id)

  const onShare = () => {
    const result = tryShareInvite(room.id, t.inviteShareText)
    setShareHint(
      result.method === 'clipboard' ? t.inviteCopied : t.inviteSentHint,
    )
    setCopied(result.method === 'clipboard')
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setShareHint(t.inviteCopied)
    } catch {
      setShareHint(link)
    }
  }

  return (
    <PageShell
      title={t.waitingTitle}
      onBack={() => {
        leaveRoom()
        navigate('/home')
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col items-center overflow-hidden px-6 pt-3 pb-3">
        <div className="clay-card flex size-[120px] items-center justify-center rounded-[28px] p-2">
          <img src={friendIcon} alt="" className="h-[100px] w-[100px] object-contain" />
        </div>

        <h2 className="font-display mt-3 text-center text-xl font-semibold text-ink">
          {t.waitingHeadline}
        </h2>
        <p className="mt-2 max-w-[300px] text-center text-[15px] font-medium text-muted">
          {t.waitingBody}
        </p>

        <div className="mt-4 flex w-full max-w-[340px] flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-[4px] border-line border-t-blue" />
          <p className="font-display text-sm font-semibold text-ink">{t.waitingStatus}</p>
        </div>

        <div className="mt-4 flex w-full max-w-[340px] flex-col gap-2.5">
          <Button onClick={onShare}>{t.sendToFriend}</Button>
          <Button variant="ghost" onClick={onCopy}>
            {copied ? t.inviteCopied : t.copyInviteLink}
          </Button>
          <Button
            variant="pink"
            onClick={() => {
              simulateFriendJoined()
            }}
          >
            {t.simulateFriendJoin}
          </Button>
        </div>

        {shareHint ? (
          <p className="mt-4 max-w-[320px] break-all text-center text-xs text-muted">{shareHint}</p>
        ) : null}
      </div>
    </PageShell>
  )
}
