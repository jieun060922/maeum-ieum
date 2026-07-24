import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AiNotice from './components/AiNotice'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import type { Mode } from './types/mode'

export default function App() {
  // 모드는 앱 상태로만 들고 있는다. 새로고침하면 사라지고 홈으로 돌아간다.
  const [mode, setMode] = useState<Mode | null>(null)

  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomePage onSelect={setMode} />} />
          <Route
            path="/chat"
            element={mode ? <ChatPage mode={mode} /> : <Navigate to="/" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <AiNotice />
    </div>
  )
}
