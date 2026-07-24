import { Link } from 'react-router-dom'
import { stageInfoOf } from '../types/stage'

type Props = {
  age: number
}

/**
 * 자리표시용 화면. 실제 대화 기능(F-4)은 feature/chat 브랜치에서 만든다.
 * 여기서는 나이가 어떤 시기로 인식됐고 어떤 말투가 쓰일지만 확인한다.
 */
export default function ChatPage({ age }: Props) {
  const stage = stageInfoOf(age)

  return (
    <main className="chat-placeholder">
      <span className="stage-badge">{stage.label}</span>
      <h1>{stage.greeting}</h1>
      <p className="tone-preview">{stage.tone}</p>
      <p>대화 화면은 준비 중입니다.</p>
      <Link to="/" className="back-link">
        처음으로 돌아가기
      </Link>
    </main>
  )
}
