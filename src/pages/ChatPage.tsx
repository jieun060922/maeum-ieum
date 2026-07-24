import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import CrisisNotice from '../components/CrisisNotice'
import { sendMessage, type Message } from '../services/chat'
import { crisisLinesFor, isCrisis } from '../services/crisis'
import { stageInfoOf } from '../types/stage'
import './chat.css'

type Props = {
  age: number
}

/** F-4 대화 입력과 응답. 주고받은 말은 화면에만 남고 어디에도 저장하지 않는다. */
export default function ChatPage({ age }: Props) {
  const stage = stageInfoOf(age)

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'ai', text: stage.greeting },
  ])
  const [draft, setDraft] = useState('')
  const [waiting, setWaiting] = useState(false)
  const [crisis, setCrisis] = useState(false)

  const endRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  // 새 말이 붙을 때마다 마지막 줄이 보이도록 내린다.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, waiting, crisis])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text || waiting || crisis) return

    setMessages((prev) => [...prev, { id: nextId.current++, role: 'user', text }])
    setDraft('')

    // F-10 위기 표현은 AI로 보내기 전에 걸러낸다. 감지되면 호출 자체를 하지 않는다.
    if (isCrisis(text)) {
      setCrisis(true)
      return
    }

    setWaiting(true)
    const reply = await sendMessage(stage.id, text)
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'ai', text: reply }])
    setWaiting(false)
  }

  return (
    <main className="chat">
      <header className="chat-head">
        <span className="stage-badge">{stage.label}</span>
        <Link to="/" className="chat-back">
          처음으로
        </Link>
      </header>

      <div className="chat-log" role="log" aria-live="polite" aria-label="대화 내용">
        {messages.map((m) => (
          <p key={m.id} className={`bubble bubble-${m.role}`}>
            {m.text}
          </p>
        ))}

        {waiting && (
          <p className="bubble bubble-ai bubble-waiting" aria-label="답변을 준비하고 있어요">
            <span />
            <span />
            <span />
          </p>
        )}

        {crisis && (
          <CrisisNotice lines={crisisLinesFor(stage.id)} onDismiss={() => setCrisis(false)} />
        )}

        <div ref={endRef} />
      </div>

      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          type="text"
          autoComplete="off"
          placeholder={crisis ? '안내를 확인해 주세요' : '하고 싶은 말을 적어주세요'}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          disabled={waiting || crisis}
          aria-label="보낼 내용"
        />
        <button
          type="submit"
          className="chat-send"
          disabled={!draft.trim() || waiting || crisis}
        >
          보내기
        </button>
      </form>
    </main>
  )
}
