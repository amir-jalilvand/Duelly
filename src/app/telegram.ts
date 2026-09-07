import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const BACKABLE = new Set([
  '/xo/challenge',
  '/xo/play',
  '/rps/challenge',
  '/rps/play',
  '/waiting',
  '/truth-dare',
  '/truth-dare/play',
])

export function useTelegram() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    try {
      WebApp.ready()
      WebApp.expand()
      WebApp.setHeaderColor('#0a0e18')
      WebApp.setBackgroundColor('#0a0e18')
    } catch {
      // Browser preview outside Telegram
    }
  }, [])

  useEffect(() => {
    try {
      if (BACKABLE.has(location.pathname) || location.pathname.startsWith('/join/')) {
        WebApp.BackButton.show()
        const handler = () => {
          if (location.pathname === '/xo/play') navigate('/home')
          else if (location.pathname === '/truth-dare/play') navigate('/truth-dare')
          else navigate('/home')
        }
        WebApp.BackButton.onClick(handler)
        return () => {
          WebApp.BackButton.offClick(handler)
          WebApp.BackButton.hide()
        }
      }
      WebApp.BackButton.hide()
    } catch {
      // no-op outside Telegram
    }
  }, [location.pathname, navigate])
}

export function closeMiniApp() {
  try {
    WebApp.close()
  } catch {
    // ignore
  }
}
