import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clearActiveRoom,
  createHostRoom,
  markGuestJoined,
  markRoomReady,
  readActiveRoomId,
  readRoom,
  type FriendRole,
  type FriendRoom,
  type GameKind,
} from './friendRoom'

type FriendSessionValue = {
  room: FriendRoom | null
  role: FriendRole | null
  startHostInvite: (game: GameKind) => FriendRoom
  joinAsGuest: (roomId: string) => FriendRoom | null
  simulateFriendJoined: () => FriendRoom | null
  leaveRoom: () => void
  refreshRoom: () => void
}

const FriendSessionContext = createContext<FriendSessionValue | null>(null)

export function FriendSessionProvider({ children }: { children: ReactNode }) {
  const [room, setRoom] = useState<FriendRoom | null>(() => {
    const id = readActiveRoomId()
    return id ? readRoom(id) : null
  })
  const [role, setRole] = useState<FriendRole | null>(() => {
    const id = readActiveRoomId()
    return id ? 'host' : null
  })

  const refreshRoom = useCallback(() => {
    const id = room?.id ?? readActiveRoomId()
    if (!id) {
      setRoom(null)
      return
    }
    setRoom(readRoom(id))
  }, [room?.id])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.key?.startsWith('duelly.room.')) return
      refreshRoom()
    }
    const onCustom = () => refreshRoom()
    window.addEventListener('storage', onStorage)
    window.addEventListener('duelly-room', onCustom as EventListener)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('duelly-room', onCustom as EventListener)
    }
  }, [refreshRoom])

  const startHostInvite = useCallback((game: GameKind) => {
    const next = createHostRoom(game)
    setRole('host')
    setRoom(next)
    return next
  }, [])

  const joinAsGuest = useCallback((roomId: string) => {
    const next = markGuestJoined(roomId)
    if (!next) return null
    setRole('guest')
    setRoom(next)
    return next
  }, [])

  const simulateFriendJoined = useCallback(() => {
    const id = room?.id ?? readActiveRoomId()
    if (!id) return null
    const next = markRoomReady(id)
    if (!next) return null
    setRoom(next)
    return next
  }, [room?.id])

  const leaveRoom = useCallback(() => {
    clearActiveRoom()
    setRoom(null)
    setRole(null)
  }, [])

  const value = useMemo(
    () => ({
      room,
      role,
      startHostInvite,
      joinAsGuest,
      simulateFriendJoined,
      leaveRoom,
      refreshRoom,
    }),
    [room, role, startHostInvite, joinAsGuest, simulateFriendJoined, leaveRoom, refreshRoom],
  )

  return <FriendSessionContext.Provider value={value}>{children}</FriendSessionContext.Provider>
}

export function useFriendSession() {
  const ctx = useContext(FriendSessionContext)
  if (!ctx) throw new Error('useFriendSession must be used within FriendSessionProvider')
  return ctx
}
