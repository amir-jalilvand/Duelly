type MatchTableProps = {
  you: number
  draws: number
  robot: number
  labels: {
    youWins: string
    draws: string
    robotWins: string
  }
}

export function MatchTable({ you, draws, robot, labels }: MatchTableProps) {
  return (
    <div className="clay-card mx-auto grid w-[calc(100%-24px)] max-w-[360px] grid-cols-3 gap-1 px-2 py-4 text-center">
      <div className="min-w-0 text-blue">
        <div className="font-display text-[34px] font-semibold leading-none tabular-nums">{you}</div>
        <div className="mt-2 text-[13px] font-bold leading-tight">{labels.youWins}</div>
      </div>
      <div className="min-w-0 text-ink">
        <div className="font-display text-[34px] font-semibold leading-none tabular-nums">{draws}</div>
        <div className="mt-2 text-[13px] font-bold leading-tight">{labels.draws}</div>
      </div>
      <div className="min-w-0 text-pink">
        <div className="font-display text-[34px] font-semibold leading-none tabular-nums">{robot}</div>
        <div className="mt-2 text-[13px] font-bold leading-tight">{labels.robotWins}</div>
      </div>
    </div>
  )
}
