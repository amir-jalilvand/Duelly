import type { ReactNode } from 'react'
import { GameHeader } from './GameHeader'

type PageShellProps = {
  title: string
  onBack?: () => void
  showClose?: boolean
  children: ReactNode
}

export function PageShell({ title, onBack, showClose, children }: PageShellProps) {
  return (
    <div className="relative flex min-h-full flex-col">
      <GameHeader title={title} onBack={onBack} showClose={showClose} />
      <div className="page-enter relative flex flex-1 flex-col">{children}</div>
    </div>
  )
}
