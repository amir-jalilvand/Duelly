import { Button } from './Button'
import { MatchResultArt, type MatchResultKind } from './MatchResultArt'

type MatchResultPanelProps = {
  kind: MatchResultKind
  title: string
  subtitle?: string
  playAgainLabel: string
  moreGamesLabel: string
  onPlayAgain: () => void
  onMoreGames: () => void
}

const PANEL_TONE: Record<MatchResultKind, string> = {
  win: 'border-blue/40 bg-blue/15 shadow-[0_0_28px_rgba(64,123,255,0.28)]',
  lose: 'border-pink/40 bg-pink/15 shadow-[0_0_28px_rgba(234,82,111,0.28)]',
  draw: 'border-white/15 bg-white/5 shadow-[0_0_24px_rgba(154,163,181,0.12)]',
}

export function MatchResultPanel({
  kind,
  title,
  subtitle,
  playAgainLabel,
  moreGamesLabel,
  onPlayAgain,
  onMoreGames,
}: MatchResultPanelProps) {
  return (
    <div
      className={`clay-card relative z-10 mx-auto flex w-full max-w-[340px] flex-col items-center gap-2 border px-4 py-4 ${PANEL_TONE[kind]}`}
    >
      <MatchResultArt kind={kind} />
      <p className="font-display text-center text-[22px] font-semibold text-ink">{title}</p>
      {subtitle ? <p className="text-center text-sm font-medium text-muted">{subtitle}</p> : null}
      <Button onClick={onPlayAgain}>{playAgainLabel}</Button>
      <button
        type="button"
        onClick={onMoreGames}
        className="font-display text-base font-semibold text-blue underline-offset-2 hover:underline"
      >
        {moreGamesLabel}
      </button>
    </div>
  )
}
