import WebApp from '@twa-dev/sdk'
import { inviteLinkForRoom } from './friendRoom'

export function tryShareInvite(roomId: string, message: string) {
  const link = inviteLinkForRoom(roomId)

  try {
    const share = (WebApp as unknown as { shareURL?: (url: string, text?: string) => void }).shareURL
    if (typeof share === 'function') {
      share(link, message)
      return { ok: true as const, link, method: 'shareURL' as const }
    }
  } catch {
    // continue
  }

  try {
    if (typeof WebApp.switchInlineQuery === 'function') {
      WebApp.switchInlineQuery(`${message} ${link}`, ['users'])
      return { ok: true as const, link, method: 'inline' as const }
    }
  } catch {
    // continue
  }

  try {
    void navigator.clipboard.writeText(`${message}\n${link}`)
  } catch {
    // ignore
  }

  return { ok: true as const, link, method: 'clipboard' as const }
}

export function readTelegramStartParam() {
  try {
    return WebApp.initDataUnsafe?.start_param ?? null
  } catch {
    return null
  }
}
