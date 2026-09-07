export type MatchResultKind = 'win' | 'lose' | 'draw'

type MatchResultArtProps = {
  kind: MatchResultKind
  className?: string
}

const GLOW: Record<MatchResultKind, string> = {
  win: 'drop-shadow(0 0 14px rgba(64,123,255,0.75)) drop-shadow(0 0 28px rgba(64,123,255,0.35))',
  lose: 'drop-shadow(0 0 14px rgba(234,82,111,0.75)) drop-shadow(0 0 28px rgba(234,82,111,0.35))',
  draw:
    'drop-shadow(0 0 10px rgba(64,123,255,0.45)) drop-shadow(0 0 10px rgba(234,82,111,0.45))',
}

export function MatchResultArt({ kind, className = 'h-[88px] w-[88px]' }: MatchResultArtProps) {
  return (
    <div
      className={`result-art result-art--${kind} relative flex shrink-0 items-center justify-center ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 96 96" className="h-full w-full" style={{ filter: GLOW[kind] }}>
        {kind === 'win' ? <WinGlyph /> : null}
        {kind === 'lose' ? <LoseGlyph /> : null}
        {kind === 'draw' ? <DrawGlyph /> : null}
      </svg>
    </div>
  )
}

function WinGlyph() {
  return (
    <g>
      <ellipse cx="48" cy="86" rx="22" ry="4" fill="#407BFF" opacity="0.28" />
      <path
        d="M34 78h28c1.2 0 2 .8 2 2v2H32v-2c0-1.2.8-2 2-2Z"
        fill="#2A5AD6"
      />
      <path d="M40 68h16l2 10H38l2-10Z" fill="#407BFF" />
      <path
        d="M30 22h36c2 0 3.5 1.8 3.2 3.8L66 52c-1.2 8-8.2 14-16.5 14h-3c-8.3 0-15.3-6-16.5-14L26.8 25.8C26.5 23.8 28 22 30 22Z"
        fill="url(#winCup)"
      />
      <path
        d="M66 28h8c4.4 0 8 3.6 8 8v2c0 7.2-5 13.2-12 14.7"
        fill="none"
        stroke="#7AA4FF"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M30 28h-8c-4.4 0-8 3.6-8 8v2c0 7.2 5 13.2 12 14.7"
        fill="none"
        stroke="#7AA4FF"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M38 30c4-3 8-4 12-4s8 1 12 4"
        fill="none"
        stroke="#EFF1ED"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="48" cy="12" r="5" fill="#EFF1ED" />
      <path d="M48 17v5" stroke="#EFF1ED" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M22 18l4 3M74 18l-4 3M18 40h5M73 40h5M28 8l2 4M68 8l-2 4"
        stroke="#7AA4FF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="winCup" x1="30" y1="22" x2="66" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8BB4FF" />
          <stop offset="0.55" stopColor="#407BFF" />
          <stop offset="1" stopColor="#2556D4" />
        </linearGradient>
      </defs>
    </g>
  )
}

function LoseGlyph() {
  return (
    <g>
      <ellipse cx="48" cy="86" rx="22" ry="4" fill="#EA526F" opacity="0.28" />
      <path
        d="M48 18c16 0 28 12 28 28 0 18-16 30-28 36-12-6-28-18-28-36 0-16 12-28 28-28Z"
        fill="url(#loseShield)"
      />
      <path
        d="M48 24c12.5 0 22 9.2 22 22 0 14.2-12.4 24.2-22 29.2-9.6-5-22-15-22-29.2 0-12.8 9.5-22 22-22Z"
        fill="none"
        stroke="#FF8BA0"
        strokeWidth="3"
        opacity="0.55"
      />
      <path
        d="M36 40l24 24M60 40L36 64"
        stroke="#EFF1ED"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d="M20 22l5 2M76 22l-5 2M16 48h5M75 48h5"
        stroke="#FF8BA0"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.75"
      />
      <defs>
        <linearGradient id="loseShield" x1="20" y1="18" x2="76" y2="82" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A92" />
          <stop offset="0.5" stopColor="#EA526F" />
          <stop offset="1" stopColor="#C33A55" />
        </linearGradient>
      </defs>
    </g>
  )
}

function DrawGlyph() {
  return (
    <g>
      <ellipse cx="48" cy="86" rx="24" ry="4" fill="#9AA3B5" opacity="0.22" />
      <circle cx="34" cy="48" r="22" fill="url(#drawBlue)" />
      <circle cx="62" cy="48" r="22" fill="url(#drawPink)" opacity="0.95" />
      <path
        d="M34 48c0-12 10-22 22-22"
        fill="none"
        stroke="#EFF1ED"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M40 48h16"
        stroke="#EFF1ED"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="48" cy="48" r="5" fill="#EFF1ED" />
      <path
        d="M22 24l4 3M74 24l-4 3M18 58h4M74 58h4"
        stroke="#EFF1ED"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <defs>
        <linearGradient id="drawBlue" x1="12" y1="26" x2="56" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7AA4FF" />
          <stop offset="1" stopColor="#407BFF" />
        </linearGradient>
        <linearGradient id="drawPink" x1="40" y1="26" x2="84" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8BA0" />
          <stop offset="1" stopColor="#EA526F" />
        </linearGradient>
      </defs>
    </g>
  )
}
