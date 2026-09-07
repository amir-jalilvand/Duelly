import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AppStateProvider } from './AppState'
import { ChatProvider } from './ChatState'
import { FriendSessionProvider } from './FriendSession'
import { useTelegram } from './telegram'
import { readTelegramStartParam } from './telegramShare'
import { ChatDock } from '../components/ChatDock'
import { I18nProvider } from '../i18n/I18nProvider'
import { HomePage } from '../pages/HomePage'
import { JoinSessionPage } from '../pages/JoinSessionPage'
import { LanguagePage } from '../pages/LanguagePage'
import { RpsChallengePage } from '../pages/RpsChallengePage'
import { RpsGamePage } from '../pages/RpsGamePage'
import { SplashPage } from '../pages/SplashPage'
import { TruthDareModePage } from '../pages/TruthDareModePage'
import { TruthDarePlayPage } from '../pages/TruthDarePlayPage'
import { WaitingFriendPage } from '../pages/WaitingFriendPage'
import { XoChallengePage } from '../pages/XoChallengePage'
import { XoGamePage } from '../pages/XoGamePage'

function TelegramBridge() {
  useTelegram()
  return null
}

function StartParamBridge() {
  const navigate = useNavigate()

  useEffect(() => {
    const param = readTelegramStartParam()
    if (param?.startsWith('room_')) {
      navigate(`/join/${param}`, { replace: true })
    }
  }, [navigate])

  return null
}

export function App() {
  return (
    <I18nProvider>
      <AppStateProvider>
        <FriendSessionProvider>
          <ChatProvider>
            <BrowserRouter>
              <TelegramBridge />
              <StartParamBridge />
              <div className="app-shell">
                <div className="app-frame">
                  <div className="app-main">
                    <Routes>
                      <Route path="/" element={<SplashPage />} />
                      <Route path="/language" element={<LanguagePage />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/waiting" element={<WaitingFriendPage />} />
                      <Route path="/join/:roomId" element={<JoinSessionPage />} />
                      <Route path="/xo/challenge" element={<XoChallengePage />} />
                      <Route path="/xo/play" element={<XoGamePage />} />
                      <Route path="/rps/challenge" element={<RpsChallengePage />} />
                      <Route path="/rps/play" element={<RpsGamePage />} />
                      <Route path="/truth-dare" element={<TruthDareModePage />} />
                      <Route path="/truth-dare/play" element={<TruthDarePlayPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                  <ChatDock />
                </div>
              </div>
            </BrowserRouter>
          </ChatProvider>
        </FriendSessionProvider>
      </AppStateProvider>
    </I18nProvider>
  )
}
