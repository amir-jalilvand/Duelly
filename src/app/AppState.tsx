import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { RpsSession } from '../games/rps/types'
import type { Difficulty, Starter } from '../games/xo/types'
import type { TruthDareMode } from '../games/truthDare/types'

export type Opponent = 'friend' | 'robot'

type GameSession = {
  difficulty: Difficulty
  starter: Starter
}

type AppStateContextValue = {
  session: GameSession | null
  setSession: (session: GameSession) => void
  clearSession: () => void
  rpsSession: RpsSession | null
  setRpsSession: (session: RpsSession) => void
  clearRpsSession: () => void
  opponent: Opponent | null
  setOpponent: (opponent: Opponent | null) => void
  truthDareMode: TruthDareMode | null
  setTruthDareMode: (mode: TruthDareMode) => void
  clearTruthDareMode: () => void
}

const AppStateContext = createContext<AppStateContextValue | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<GameSession | null>(null)
  const [rpsSession, setRpsSessionState] = useState<RpsSession | null>(null)
  const [opponent, setOpponent] = useState<Opponent | null>(null)
  const [truthDareMode, setTruthDareModeState] = useState<TruthDareMode | null>(null)

  const value = useMemo(
    () => ({
      session,
      setSession: setSessionState,
      clearSession: () => setSessionState(null),
      rpsSession,
      setRpsSession: setRpsSessionState,
      clearRpsSession: () => setRpsSessionState(null),
      opponent,
      setOpponent,
      truthDareMode,
      setTruthDareMode: setTruthDareModeState,
      clearTruthDareMode: () => setTruthDareModeState(null),
    }),
    [session, rpsSession, opponent, truthDareMode],
  )

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider')
  return ctx
}
