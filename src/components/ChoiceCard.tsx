type ChoiceCardProps = {
  label: string
  icon: string
  selected?: boolean
  disabled?: boolean
  badge?: string
  onClick?: () => void
  iconClassName?: string
}

export function ChoiceCard({
  label,
  icon,
  selected,
  disabled,
  badge,
  onClick,
  iconClassName = 'h-[96px] w-[96px] object-contain',
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`clay-press clay-card relative flex min-h-[156px] w-full flex-col items-center gap-1.5 px-2 py-2.5 disabled:cursor-not-allowed disabled:opacity-55 ${
        selected
          ? 'border-blue shadow-[0_0_24px_rgba(64,123,255,0.35)]'
          : 'hover:border-white/20'
      }`}
    >
      {badge ? (
        <span className="font-display absolute end-2.5 top-2.5 rounded-full bg-pink px-2 py-0.5 text-[10px] font-semibold text-white shadow-[0_0_12px_rgba(234,82,111,0.45)]">
          {badge}
        </span>
      ) : null}
      <div className="flex h-[96px] w-full shrink-0 items-center justify-center">
        <img src={icon} alt="" className={iconClassName} />
      </div>
      <span className="font-display flex min-h-[2.2em] w-full items-center justify-center px-1 text-center text-[15px] font-semibold leading-tight text-ink">
        {label}
      </span>
    </button>
  )
}
