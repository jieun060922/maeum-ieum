import { Link } from 'react-router-dom'
import { MODE_LABEL, type Mode } from '../types/mode'

type Props = {
  mode: Mode
}

/**
 * 자리표시용 화면. 실제 대화 기능(F-4)은 feature/chat 브랜치에서 만든다.
 * 여기서는 모드가 제대로 넘어왔는지만 확인한다.
 */
export default function ChatPage({ mode }: Props) {
  return (
    <main className="chat-placeholder">
      <h1>{MODE_LABEL[mode]} 모드</h1>
      <p>대화 화면은 준비 중입니다.</p>
      <Link to="/" className="back-link">
        처음으로 돌아가기
      </Link>
    </main>
  )
}
