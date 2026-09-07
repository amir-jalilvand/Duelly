import type { ReactNode } from 'react'
import cancelLineIcon from '../assets/icons/cancel-line.svg'

type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center px-5">
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-[rgba(5,7,13,0.72)] backdrop-blur-[8px]"
        onClick={onClose}
      />
      <div className="clay-card relative z-10 max-h-[min(78dvh,560px)] w-full max-w-[340px] overflow-hidden border border-white/10 p-4 pt-3 shadow-[0_20px_50px_rgba(0,0,0,0.55)]">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="clay-press absolute left-3 top-3 flex size-9 items-center justify-center rounded-xl border border-white/10 bg-cream"
        >
          <img src={cancelLineIcon} alt="" width={20} height={20} className="icon-on-dark size-5" />
        </button>
        <h3 className="font-display mt-8 text-center text-xl font-semibold text-ink">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
