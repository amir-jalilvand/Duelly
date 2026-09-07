export type GameKind = 'xo' | 'truthDare' | 'rps'

export type FriendRole = 'host' | 'guest'

export type FriendRoomStatus = 'waiting' | 'ready'

export type FriendRoom = {
  id: string
  game: GameKind
  status: FriendRoomStatus
  hostReady: boolean
  guestReady: boolean
  updatedAt: number
}

const ROOM_PREFIX = 'duelly.room.'
const ACTIVE_KEY = 'duelly.activeRoom'

export function createRoomId() {
  return `room_${Math.random().toString(36).slice(2, 10)}`
}

export function readRoom(id: string): FriendRoom | null {
  try {
    const raw = localStorage.getItem(ROOM_PREFIX + id)
    if (!raw) return null
    return JSON.parse(raw) as FriendRoom
  } catch {
    return null
  }
}

export function writeRoom(room: FriendRoom) {
  const next = { ...room, updatedAt: Date.now() }
  localStorage.setItem(ROOM_PREFIX + next.id, JSON.stringify(next))
  localStorage.setItem(ACTIVE_KEY, next.id)
  window.dispatchEvent(new CustomEvent('duelly-room', { detail: next }))
  return next
}

export function createHostRoom(game: GameKind): FriendRoom {
  const room: FriendRoom = {
    id: createRoomId(),
    game,
    status: 'waiting',
    hostReady: true,
    guestReady: false,
    updatedAt: Date.now(),
  }
  return writeRoom(room)
}

export function markGuestJoined(id: string): FriendRoom | null {
  const room = readRoom(id)
  if (!room) return null
  return writeRoom({
    ...room,
    guestReady: true,
    status: 'ready',
  })
}

export function markRoomReady(id: string): FriendRoom | null {
  const room = readRoom(id)
  if (!room) return null
  return writeRoom({
    ...room,
    guestReady: true,
    hostReady: true,
    status: 'ready',
  })
}

export function clearActiveRoom() {
  localStorage.removeItem(ACTIVE_KEY)
}

export function readActiveRoomId() {
  return localStorage.getItem(ACTIVE_KEY)
}

export function playPathForGame(game: GameKind) {
  if (game === 'xo') return '/xo/play'
  if (game === 'truthDare') return '/truth-dare'
  return '/rps/play'
}

export function inviteLinkForRoom(id: string) {
  const url = new URL(window.location.href)
  url.pathname = `/join/${id}`
  url.search = ''
  url.hash = ''
  return url.toString()
}
