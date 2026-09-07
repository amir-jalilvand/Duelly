import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import paperIcon from '../assets/rps/paper.png'
import rockIcon from '../assets/rps/rock.png'
import scissorsIcon from '../assets/rps/scissors.png'
import { useAppState } from '../app/AppState'
import { Button } from '../components/Button'
import { MatchResultPanel } from '../components/MatchResultPanel'
import type { MatchResultKind } from '../components/MatchResultArt'
import { MatchTable } from '../components/MatchTable'
import { Modal } from '../components/Modal'
import { PageShell } from '../components/PageShell'
import { TurnTimer } from '../components/TurnTimer'
import { roundResult, RPS_CHOICES } from '../games/rps/logic'
import { RPS_WAIT_SECONDS, type RpsChoice, type RpsRoundResult, type RpsScore } from '../games/rps/types'
import { useI18n } from '../i18n/I18nProvider'

const MOVE_ICONS: Record<RpsChoice, string> = {
  rock: rockIcon,
  paper: paperIcon,
  scissors: scissorsIcon,
}

function randomChoice() {
  return RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)]!
}

export function RpsGamePage() {
  const { rpsSession, opponent } = useAppState()
  if (!rpsSession) {
    return <Navigate to={opponent === 'friend' ? '/waiting' : '/rps/challenge'} replace />
  }
  return <RpsGameSession />
}

function RpsGameSession() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { rpsSession, opponent } = useAppState()
  const vsFriend = opponent === 'friend'
  const totalRounds = rpsSession!.rounds

  const [score, setScore] = useState<RpsScore>({ you: 0, draws: 0, them: 0 })
  const [played, setPlayed] = useState(0)
  const [you, setYou] = useState<RpsChoice | null>(null)
  const [them, setThem] = useState<RpsChoice | null>(null)
  const [lastResult, setLastResult] = useState<RpsRoundResult | null>(null)
  const [matchOver, setMatchOver] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [timeLeft, setTimeLeft] = useState(RPS_WAIT_SECONDS)
  const [roundId, setRoundId] = useState(0)

  const youRef = useRef<RpsChoice | null>(null)
  const themRef = useRef<RpsChoice | null>(null)
  const resolvedRef = useRef(false)

  youRef.current = you
  themRef.current = them

  const labels: Record<RpsChoice, string> = {
    rock: t.rpsRock,
    paper: t.rpsPaper,
    scissors: t.rpsScissors,
  }

  const picking = !matchOver && !lastResult

  const finishRound = (yourPick: RpsChoice, theirPick: RpsChoice) => {
    if (resolvedRef.current) return
    resolvedRef.current = true
    setYou(yourPick)
    setThem(theirPick)
    const result = roundResult(yourPick, theirPick)
    setLastResult(result)
    setScore((prev) => {
      if (result === 'win') return { ...prev, you: prev.you + 1 }
      if (result === 'lose') return { ...prev, them: prev.them + 1 }
      return { ...prev, draws: prev.draws + 1 }
    })
    setPlayed((n) => n + 1)
  }

  const resetMatch = () => {
    setScore({ you: 0, draws: 0, them: 0 })
    setPlayed(0)
    setYou(null)
    setThem(null)
    setLastResult(null)
    setMatchOver(false)
    setShowMore(false)
    setTimeLeft(RPS_WAIT_SECONDS)
    resolvedRef.current = false
    setRoundId((id) => id + 1)
  }

  const nextRound = () => {
    setYou(null)
    setThem(null)
    setLastResult(null)
    setTimeLeft(RPS_WAIT_SECONDS)
    resolvedRef.current = false
    setRoundId((id) => id + 1)
  }

  useEffect(() => {
    if (played >= totalRounds && totalRounds > 0) setMatchOver(true)
  }, [played, totalRounds])

  // Shared round timer: both must pick within the window from round start
  useEffect(() => {
    if (!picking) return
    resolvedRef.current = false
    setTimeLeft(RPS_WAIT_SECONDS)
    youRef.current = null
    themRef.current = null

    const started = Date.now()
    const tick = window.setInterval(() => {
      const left = Math.max(0, RPS_WAIT_SECONDS - Math.floor((Date.now() - started) / 1000))
      setTimeLeft(left)
    }, 100)

    // Bot / demo friend picks sometime inside the shared window
    const rivalDelay = vsFriend
      ? 900 + Math.random() * 2800
      : 500 + Math.random() * 2800

    const rivalTimer = window.setTimeout(() => {
      if (resolvedRef.current || themRef.current) return
      const yourCurrent = youRef.current
      const rivalPick = randomChoice()
      setThem(rivalPick)
      themRef.current = rivalPick
      if (yourCurrent) finishRound(yourCurrent, rivalPick)
    }, Math.min(rivalDelay, RPS_WAIT_SECONDS * 1000 - 80))

    const timeout = window.setTimeout(() => {
      if (resolvedRef.current) return
      const yourPick = youRef.current ?? randomChoice()
      const theirPick = themRef.current ?? randomChoice()
      finishRound(yourPick, theirPick)
    }, RPS_WAIT_SECONDS * 1000)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(rivalTimer)
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId, picking])

  // If both locked before timeout, resolve immediately
  useEffect(() => {
    if (!picking || !you || !them || resolvedRef.current) return
    finishRound(you, them)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [you, them, picking])

  const pick = (choice: RpsChoice) => {
    if (!picking || you) return
    setYou(choice)
    youRef.current = choice
  }

  const matchWinner: RpsRoundResult | null = matchOver
    ? score.you === score.them
      ? 'draw'
      : score.you > score.them
        ? 'win'
        : 'lose'
    : null

  const matchKind: MatchResultKind | null =
    matchWinner === 'win' || matchWinner === 'lose' || matchWinner === 'draw' ? matchWinner : null

  const matchCopy =
    matchKind === 'win'
      ? t.youWin
      : matchKind === 'lose'
        ? t.youLose
        : matchKind === 'draw'
          ? t.itsDraw
          : ''

  const roundCopy =
    lastResult === 'win'
      ? t.roundWin
      : lastResult === 'lose'
        ? t.roundLose
        : lastResult === 'draw'
          ? t.roundDraw
          : ''

  const timerLabel = you && !them ? t.waitingRival : t.pickBeforeTime
  const timerTone = you && !them ? 'rival' : 'you'

  return (
    <PageShell title={t.rps} onBack={() => navigate(vsFriend ? '/home' : '/rps/challenge')}>
      <div className="relative flex min-h-0 flex-1 flex-col items-center gap-2.5 overflow-hidden px-4 pb-3 pt-2">
        <div className="relative z-10 w-full">
          <MatchTable
            you={score.you}
            draws={score.draws}
            robot={score.them}
            labels={{
              youWins: t.youWins,
              draws: t.draws,
              robotWins: vsFriend ? t.friendWins : t.robotWins,
            }}
          />
        </div>

        <p className="font-display relative z-10 text-sm font-semibold text-muted">
          {t.roundProgress
            .replace('{current}', String(Math.min(played + (lastResult ? 0 : 1), totalRounds)))
            .replace('{total}', String(totalRounds))}
        </p>

        {matchOver && matchKind ? (
          <MatchResultPanel
            kind={matchKind}
            title={matchCopy}
            subtitle={t.afterRounds.replace('{count}', String(totalRounds))}
            playAgainLabel={t.playAgain}
            moreGamesLabel={t.moreGames}
            onPlayAgain={resetMatch}
            onMoreGames={() => setShowMore(true)}
          />
        ) : (
          <>
            {picking ? (
              <TurnTimer
                seconds={timeLeft}
                total={RPS_WAIT_SECONDS}
                label={timerLabel}
                tone={timerTone}
              />
            ) : (
              <h2 className="font-display relative z-10 text-center text-lg font-semibold text-ink">
                {roundCopy}
              </h2>
            )}

            <div className="relative z-10 flex w-full max-w-[360px] flex-wrap content-center justify-center gap-x-4 gap-y-3">
              {RPS_CHOICES.map((choice) => {
                const selected = you === choice
                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={!picking || Boolean(you)}
                    onClick={() => pick(choice)}
                    className="clay-press clay-card flex h-[128px] w-[124px] flex-col items-center gap-1 px-2 py-2 disabled:opacity-70"
                    style={
                      selected
                        ? {
                            borderColor: '#407BFF',
                            boxShadow: '0 8px 0 rgba(64,123,255,0.28)',
                          }
                        : undefined
                    }
                  >
                    <div className="flex h-[84px] w-full shrink-0 items-center justify-center">
                      <img
                        src={MOVE_ICONS[choice]}
                        alt=""
                        className="h-[80px] w-[96px] object-contain"
                      />
                    </div>
                    <span className="font-display text-[15px] font-semibold leading-tight text-ink">
                      {labels[choice]}
                    </span>
                  </button>
                )
              })}
            </div>

            {picking && you && !them ? (
              <p className="relative z-10 text-center text-sm font-medium text-muted">
                {t.lockedInHint.replace('{move}', labels[you])}
              </p>
            ) : null}

            {you && them && lastResult ? (
              <div className="clay-card relative z-10 w-full max-w-[340px] px-4 py-3 text-center">
                <p className="text-sm text-muted">
                  {t.youPicked}: <strong className="text-ink">{labels[you]}</strong>
                  {' · '}
                  {vsFriend ? t.friendPicked : t.robotPicked}:{' '}
                  <strong className="text-ink">{labels[them]}</strong>
                </p>
                <p className="font-display mt-2 text-lg font-semibold text-ink">{roundCopy}</p>
                {played < totalRounds ? (
                  <div className="mt-4">
                    <Button onClick={nextRound}>{t.nextRound}</Button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </div>

      {showMore ? (
        <Modal title={t.moreGames} onClose={() => setShowMore(false)}>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('/home')}>{t.home}</Button>
            {!vsFriend ? (
              <Button variant="pink" onClick={() => navigate('/rps/challenge')}>
                {t.challengeAgain}
              </Button>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </PageShell>
  )
}
