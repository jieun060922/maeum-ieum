import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  GUARDIAN_AGE,
  MAX_AGE,
  MIN_AGE,
  STAGES,
  isValidAge,
  stageInfoOf,
} from '../types/stage'

type Props = {
  onSubmitAge: (age: number) => void
}

/** F-1 나이 입력 화면. 입력한 나이는 App 상태로만 올리고 /chat으로 이동한다. */
export default function HomePage({ onSubmitAge }: Props) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')

  const age = Number(value)
  const valid = value !== '' && isValidAge(age)
  const stage = valid ? stageInfoOf(age) : null
  const needsGuardian = valid && age < GUARDIAN_AGE
  const outOfRange = value !== '' && !valid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!valid) return
    onSubmitAge(age)
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

      <form className="age-form" onSubmit={handleSubmit}>
        <label className="age-label" htmlFor="age">
          나이를 알려주세요
        </label>

        <div className="age-field">
          <input
            id="age"
            className="age-input"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="00"
            maxLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
            aria-describedby="age-help"
          />
          <span className="age-unit">세</span>
        </div>

        <p className="stage-line" aria-live="polite">
          {stage ? (
            <>
              <span className="stage-badge">{stage.label}</span>
              <span className="stage-range">{stage.range}</span>
            </>
          ) : outOfRange ? (
            <span className="stage-error">
              {MIN_AGE}세에서 {MAX_AGE}세 사이로 입력해 주세요.
            </span>
          ) : (
            <span className="stage-hint">입력하시면 시기에 맞춰 대화를 준비해요.</span>
          )}
        </p>

        {needsGuardian && (
          <p className="guardian-note">
            13세 미만이라면 보호자와 함께 이용해 주세요. 힘든 일이 있다면 청소년상담 <b>1388</b>로
            전화할 수 있어요.
          </p>
        )}

        <button type="submit" className="start-button" disabled={!valid}>
          대화 시작하기
        </button>
      </form>

      <section className="stage-guide" aria-label="나이대 구분">
        <ul>
          {STAGES.map((s) => (
            <li key={s.id}>
              <b>{s.label}</b>
              <span>{s.range}</span>
            </li>
          ))}
        </ul>
      </section>

      <p id="age-help" className="home-foot">
        나이는 대화 말투를 맞추는 데만 쓰이고, 저장되지 않아요.
        <br />
        회원가입이나 로그인 없이 바로 이용할 수 있어요.
      </p>
    </main>
  )
}
