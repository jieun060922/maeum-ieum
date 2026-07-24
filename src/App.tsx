import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AiNotice from './components/AiNotice'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'

export default function App() {
  // 나이는 앱 상태로만 들고 있는다. 새로고침하면 사라지고 홈으로 돌아간다.
  const [age, setAge] = useState<number | null>(null)

  return (
    <div className="app">
      <div className="app-body">
        <Routes>
          <Route path="/" element={<HomePage onSubmitAge={setAge} />} />
          <Route
            path="/chat"
            element={age === null ? <Navigate to="/" replace /> : <ChatPage age={age} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <AiNotice />
    </div>
  )
}
