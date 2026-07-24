import { useNavigate } from 'react-router-dom'
import type { Mode } from '../types/mode'

type Props = {
  onSelect: (mode: Mode) => void
}

const CHOICES: { mode: Mode; label: string; hint: string }[] = [
  { mode: 'senior', label: '어르신', hint: '오늘 있었던 일을 편하게 이야기해요' },
  { mode: 'youth', label: '청년', hint: '지금 상태를 정리하고 도움받을 곳을 찾아요' },
]

/** F-1 모드 선택 화면. 고른 값은 App 상태로 올리고 /chat으로 이동한다. */
export default function HomePage({ onSelect }: Props) {
  const navigate = useNavigate()

  function choose(mode: Mode) {
    onSelect(mode)
    navigate('/chat')
  }

  return (
    <main className="home">
      <header className="home-head">
        <h1 className="logo">마음이음</h1>
        <p className="tagline">
          혼자 담아둔 이야기를 나누고,
          <br />
          가까운 도움처까지 이어드려요.
        </p>
      </header>

      <h2 className="choice-title">어떤 분이 사용하시나요?</h2>

      <div className="choices">
        {CHOICES.map(({ mode, label, hint }) => (
          <button
            key={mode}
            type="button"
            className={`choice choice-${mode}`}
            onClick={() => choose(mode)}
          >
            <span className="choice-label">{label}</span>
            <span className="choice-hint">{hint}</span>
          </button>
        ))}
      </div>

      <p className="home-foot">회원가입이나 로그인 없이 바로 이용할 수 있어요.</p>
    </main>
  )
}
