import type { ReactNode } from 'react'
import { GameHeader } from './GameHeader'

type PageShellProps = {
  title: string
  onBack?: () => void
  children: ReactNode
}

export function PageShell({ title, onBack, children }: PageShellProps) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden">
      <GameHeader title={title} onBack={onBack} />
      <div className="page-enter relative flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  )
}
