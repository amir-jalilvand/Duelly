import chevronLeftIcon from '../assets/icons/chevron-left.svg'

type GameHeaderProps = {
  title: string
  onBack?: () => void
}

export function GameHeader({ title, onBack }: GameHeaderProps) {
  return (
    <header className="relative z-20 h-14 w-full shrink-0">
      {onBack ? (
        <div className="absolute inset-y-0 left-3 flex items-center" dir="ltr">
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="clay-press clay-card flex size-10 items-center justify-center rounded-2xl"
          >
            <img
              src={chevronLeftIcon}
              alt=""
              width={24}
              height={24}
              className="icon-on-dark size-6"
            />
          </button>
        </div>
      ) : null}

      <h1 className="font-display pointer-events-none absolute inset-x-14 inset-y-0 flex items-center justify-center text-center text-xl font-semibold tracking-tight text-ink">
        {title}
      </h1>
    </header>
  )
}
