import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppState } from '../app/AppState'
import { Button } from '../components/Button'
import { MatchResultPanel } from '../components/MatchResultPanel'
import type { MatchResultKind } from '../components/MatchResultArt'
import { MatchTable } from '../components/MatchTable'
import { Modal } from '../components/Modal'
import { PageShell } from '../components/PageShell'
import { TurnTimer } from '../components/TurnTimer'
import { XoBoard } from '../components/XoBoard'
import { XO_TURN_SECONDS } from '../games/xo/constants'
import { emptyBoard, type Board, type Score, type Winner } from '../games/xo/types'
import { availableMoves, getRobotMove, getWinner } from '../games/xo/logic'
import { useI18n } from '../i18n/I18nProvider'

export function XoGamePage() {
  const { session, opponent } = useAppState()
  if (!session) {
    return <Navigate to={opponent === 'friend' ? '/waiting' : '/xo/challenge'} replace />
  }
  return <XoGameSession />
}

function XoGameSession() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { session, opponent } = useAppState()
  const vsFriend = opponent === 'friend'
  const difficulty = session!.difficulty
  const starter = session!.starter

  const [board, setBoard] = useState<Board>(emptyBoard)
  const [xIsNext, setXIsNext] = useState(starter === 'you')
  const [score, setScore] = useState<Score>({ you: 0, draws: 0, robot: 0 })
  const [result, setResult] = useState<Winner>(null)
  const [showMore, setShowMore] = useState(false)
  const [turnLeft, setTurnLeft] = useState(XO_TURN_SECONDS)
  const [turnId, setTurnId] = useState(0)
  const scoredRef = useRef(false)
  const boardRef = useRef(board)
  const xIsNextRef = useRef(xIsNext)
  const resultRef = useRef(result)

  boardRef.current = board
  xIsNextRef.current = xIsNext
  resultRef.current = result

  const bumpTurn = () => {
    setTurnId((id) => id + 1)
    setTurnLeft(XO_TURN_SECONDS)
  }

  const resetRound = (nextStarter = starter) => {
    setBoard(emptyBoard())
    setXIsNext(nextStarter === 'you')
    setResult(null)
    setShowMore(false)
    scoredRef.current = false
    bumpTurn()
  }

  useEffect(() => {
    resetRound(starter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, starter])

  const applyMove = (index: number, mark: 'X' | 'O') => {
    if (resultRef.current || boardRef.current[index]) return
    const next = [...boardRef.current]
    next[index] = mark
    const winner = getWinner(next)
    setBoard(next)
    if (winner) {
      setResult(winner)
    } else {
      setXIsNext(mark === 'O')
      bumpTurn()
    }
  }

  // Robot still thinks a bit, then plays — timer UI runs for the rival turn too
  useEffect(() => {
    if (vsFriend || result || xIsNext) return
    const timer = window.setTimeout(() => {
      const move = getRobotMove(boardRef.current, difficulty)
      applyMove(move, 'O')
    }, 700 + Math.random() * 900)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, difficulty, result, xIsNext, vsFriend, turnId])

  // 10s timer every turn — timeout = random (or robot AI if it's bot's turn)
  useEffect(() => {
    if (result) return

    const started = Date.now()
    setTurnLeft(XO_TURN_SECONDS)

    const tick = window.setInterval(() => {
      const left = Math.max(0, XO_TURN_SECONDS - Math.floor((Date.now() - started) / 1000))
      setTurnLeft(left)
    }, 100)

    const timeout = window.setTimeout(() => {
      const moves = availableMoves(boardRef.current)
      if (moves.length === 0 || resultRef.current) return
      const mark = xIsNextRef.current ? 'X' : 'O'
      const index =
        !vsFriend && mark === 'O'
          ? getRobotMove(boardRef.current, difficulty)
          : moves[Math.floor(Math.random() * moves.length)]!
      applyMove(index, mark)
    }, XO_TURN_SECONDS * 1000)

    return () => {
      window.clearInterval(tick)
      window.clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turnId, result, vsFriend, xIsNext, difficulty])

  useEffect(() => {
    if (!result || scoredRef.current) return
    scoredRef.current = true
    setScore((prev) => {
      if (result === 'X') return { ...prev, you: prev.you + 1 }
      if (result === 'O') return { ...prev, robot: prev.robot + 1 }
      return { ...prev, draws: prev.draws + 1 }
    })
  }, [result])

  const onCellClick = (index: number) => {
    if (result || board[index]) return
    if (!vsFriend && !xIsNext) return
    const mark = xIsNext ? 'X' : 'O'
    if (!vsFriend && mark !== 'X') return
    applyMove(index, mark)
  }

  const resultKind: MatchResultKind | null =
    result === 'X' ? 'win' : result === 'O' ? 'lose' : result === 'draw' ? 'draw' : null

  const resultCopy =
    resultKind === 'win'
      ? t.youWin
      : resultKind === 'lose'
        ? t.youLose
        : resultKind === 'draw'
          ? t.itsDraw
          : ''

  const isYourTurn = xIsNext
  const turnCopy = isYourTurn
    ? t.yourTurn
    : vsFriend
      ? t.friendTurn
      : t.robotTurn

  const backTo = vsFriend ? '/home' : '/xo/challenge'

  return (
    <PageShell title="XO" onBack={() => navigate(backTo)}>
      <div className="relative flex min-h-0 flex-1 flex-col items-center gap-3 overflow-hidden px-4 pb-3 pt-3">
        <div className="relative z-10 w-full">
          <MatchTable
            you={score.you}
            draws={score.draws}
            robot={score.robot}
            labels={{
              youWins: t.youWins,
              draws: t.draws,
              robotWins: vsFriend ? t.friendWins : t.robotWins,
            }}
          />
        </div>

        {resultKind ? (
          <MatchResultPanel
            kind={resultKind}
            title={resultCopy}
            playAgainLabel={t.playAgain}
            moreGamesLabel={t.moreGames}
            onPlayAgain={() => resetRound(starter)}
            onMoreGames={() => setShowMore(true)}
          />
        ) : null}

        {!resultKind ? (
          <div className="relative z-10 w-full">
            <XoBoard
              board={board}
              disabled={Boolean(result) || (!vsFriend && !xIsNext)}
              onCellClick={onCellClick}
            />
          </div>
        ) : null}

        {!result ? (
          <TurnTimer
            seconds={turnLeft}
            total={XO_TURN_SECONDS}
            label={turnCopy}
            tone={isYourTurn ? 'you' : 'rival'}
          />
        ) : null}
      </div>

      {showMore ? (
        <Modal title={t.moreGames} onClose={() => setShowMore(false)}>
          <div className="flex flex-col gap-4">
            <Button onClick={() => navigate('/home')}>{t.home}</Button>
            {!vsFriend ? (
              <Button variant="pink" onClick={() => navigate('/xo/challenge')}>
                {t.challengeAgain}
              </Button>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </PageShell>
  )
}
