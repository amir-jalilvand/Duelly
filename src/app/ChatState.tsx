import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ChatMessage = {
  id: string
  text: string
  from: 'you' | 'them'
  at: number
}

type ChatContextValue = {
  messages: ChatMessage[]
  expanded: boolean
  setExpanded: (open: boolean) => void
  send: (text: string) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [expanded, setExpanded] = useState(false)

  const send = useCallback((raw: string) => {
    const text = raw.trim()
    if (!text) return
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        text,
        from: 'you',
        at: Date.now(),
      },
    ])
    setExpanded(true)
  }, [])

  const value = useMemo(
    () => ({ messages, expanded, setExpanded, send }),
    [messages, expanded, send],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}
