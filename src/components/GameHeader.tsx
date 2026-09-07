import cancelIcon from '../assets/icons/cancel.svg'
import chevronDownIcon from '../assets/icons/chevron-down.svg'
import chevronLeftIcon from '../assets/icons/chevron-left.svg'
import dotsIcon from '../assets/icons/dots-vertical.svg'
import { closeMiniApp } from '../app/telegram'

type GameHeaderProps = {
  title: string
  onBack?: () => void
  showClose?: boolean
}

export function GameHeader({ title, onBack, showClose = !onBack }: GameHeaderProps) {
  return (
    <header className="relative z-20 h-14 w-full shrink-0">
      <div className="absolute inset-y-0 start-3 flex items-center">
        {onBack ? (
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
        ) : showClose ? (
          <button
            type="button"
            aria-label="Close"
            onClick={closeMiniApp}
            className="clay-press clay-card flex size-10 items-center justify-center rounded-2xl"
          >
            <img src={cancelIcon} alt="" width={22} height={22} className="icon-on-dark size-[22px]" />
          </button>
        ) : null}
      </div>

      <h1 className="font-display pointer-events-none absolute inset-x-14 inset-y-0 flex items-center justify-center text-center text-xl font-semibold tracking-tight text-ink">
        {title}
      </h1>

      <div className="absolute inset-y-0 end-3 flex items-center gap-1.5 opacity-40">
        <img
          src={chevronDownIcon}
          alt=""
          width={24}
          height={24}
          className="icon-on-dark size-6"
        />
        <img src={dotsIcon} alt="" width={22} height={22} className="icon-on-dark size-[22px]" />
      </div>
    </header>
  )
}
