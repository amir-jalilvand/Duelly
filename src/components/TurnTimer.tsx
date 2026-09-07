type TurnTimerProps = {
  seconds: number
  total: number
  label: string
  /** Your turn = brand blue; rival turn = brand pink/red */
  tone?: 'you' | 'rival'
}

export function TurnTimer({ seconds, total, label, tone = 'you' }: TurnTimerProps) {
  const pct = Math.max(0, Math.min(100, (seconds / total) * 100))
  const base = tone === 'rival' ? '#EA526F' : '#407BFF'
  const urgent = seconds <= 3
  const color = urgent ? '#EA526F' : base

  return (
    <div className="relative z-10 w-full max-w-[280px]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="font-display text-sm font-semibold text-ink">{label}</p>
        <p className="font-display text-sm font-bold tabular-nums" style={{ color }}>
          {seconds}s
        </p>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-line/80">
        <div
          className="h-full rounded-full transition-[width] duration-200 ease-linear"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
