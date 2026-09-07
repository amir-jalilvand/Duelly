import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppState } from '../app/AppState'
import { useChat } from '../app/ChatState'
import sendIcon from '../assets/icons/send.svg'
import { useI18n } from '../i18n/I18nProvider'

const FRIEND_GAME_PATHS = ['/xo/', '/truth-dare/', '/rps/']

export function ChatDock() {
  const { pathname } = useLocation()
  const { t } = useI18n()
  const { opponent } = useAppState()
  const { messages, expanded, setExpanded, send } = useChat()
  const [draft, setDraft] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  const inFriendGame = FRIEND_GAME_PATHS.some((path) => pathname.startsWith(path))
  const visible = opponent === 'friend' && inFriendGame

  useEffect(() => {
    if (!expanded || !visible) return
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, expanded, visible])

  if (!visible) return null

  const submit = () => {
    send(draft)
    setDraft('')
  }

  return (
    <div className="chat-dock relative z-50 shrink-0 border-t border-white/10 bg-[#101729]/95 backdrop-blur-md">
      {expanded ? (
        <div className="flex max-h-[42dvh] flex-col">
          <div className="flex items-center justify-between px-4 py-2">
            <p className="font-display text-sm font-semibold text-ink">{t.chat}</p>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="font-display text-xs font-semibold text-muted"
            >
              {t.chatMinimize}
            </button>
          </div>
          <div ref={listRef} className="min-h-[120px] flex-1 space-y-2 overflow-y-auto px-3 pb-2">
            {messages.length === 0 ? (
              <p className="px-1 py-6 text-center text-sm text-muted">{t.chatEmpty}</p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[80%] rounded-2xl px-3 py-2 text-sm font-medium leading-snug"
                    style={
                      msg.from === 'you'
                        ? { backgroundColor: '#407BFF', color: '#FFFFFF' }
                        : { backgroundColor: '#1C2438', color: '#EFF1ED' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}

      <form
        className="flex items-center gap-2 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <button
          type="button"
          aria-label={expanded ? t.chatMinimize : t.chat}
          onClick={() => setExpanded(!expanded)}
          className="clay-press flex size-11 shrink-0 items-center justify-center rounded-2xl border border-line bg-cream"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            {expanded ? (
              <path
                d="M6 14.5 12 8.5l6 6"
                stroke="#EFF1ED"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <>
                <path
                  d="M5 6.5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z"
                  stroke="#EFF1ED"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 11h8M8 14h5"
                  stroke="#EFF1ED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder={t.chatPlaceholder}
          className="font-sans min-h-11 flex-1 rounded-2xl border border-line bg-cream px-3 text-[15px] text-ink outline-none placeholder:text-muted focus:border-blue"
        />
        <button
          type="submit"
          aria-label={t.chatSend}
          disabled={!draft.trim()}
          className="clay-press flex size-11 shrink-0 items-center justify-center rounded-2xl disabled:opacity-40"
          style={{ backgroundColor: '#407BFF', boxShadow: '0 0 16px rgba(64,123,255,0.4)' }}
        >
          <img src={sendIcon} alt="" width={20} height={20} className="size-5" />
        </button>
      </form>
    </div>
  )
}
