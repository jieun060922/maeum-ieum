/**
 * 생애 시기. 입력받은 나이로 결정되며, 대화 말투와 연결할 기관 종류를 정하는 데 쓴다.
 * 나이와 시기 모두 앱 상태로만 들고 다니고 어디에도 저장하지 않는다.
 */
export type Stage = 'teen' | 'young' | 'middle' | 'senior'

export type StageInfo = {
  id: Stage
  /** 화면에 보여줄 이름 */
  label: string
  /** 화면에 보여줄 나이 범위 */
  range: string
  /** 이 시기 사용자에게 건네는 첫 인사 */
  greeting: string
  /** AI 응답 말투 지침. F-5(모드별 대화 톤)에서 사용한다. */
  tone: string
}

export const MIN_AGE = 1
export const MAX_AGE = 120

/** 이 나이 미만이면 보호자와 함께 이용하도록 안내한다. */
export const GUARDIAN_AGE = 13

export const STAGES: StageInfo[] = [
  {
    id: 'teen',
    label: '청소년기',
    range: '13 ~ 18세',
    greeting: '요즘 어떤 일들이 있었어?',
    tone: '또래에게 말하듯 편하고 짧게. 훈계하지 않고 먼저 듣는다.',
  },
  {
    id: 'young',
    label: '청년기',
    range: '19 ~ 34세',
    greeting: '요즘 어떻게 지내고 계세요?',
    tone: '담백한 존댓말. 상황을 정리해주고 다음 선택지를 함께 짚는다.',
  },
  {
    id: 'middle',
    label: '중년기',
    range: '35 ~ 64세',
    greeting: '요즘 마음은 좀 어떠신가요?',
    tone: '차분한 존댓말. 일과 가족 등 여러 역할의 무게를 먼저 인정한다.',
  },
  {
    id: 'senior',
    label: '노년기',
    range: '65세 이상',
    greeting: '오늘 하루는 어떠셨어요?',
    tone: '천천히, 쉬운 말로. 안부를 묻듯 짧은 문장으로 이어간다.',
  },
]

/** 나이로 생애 시기를 정한다. 13세 미만도 청소년기로 묶어 안내한다. */
export function stageOf(age: number): Stage {
  if (age >= 65) return 'senior'
  if (age >= 35) return 'middle'
  if (age >= 19) return 'young'
  return 'teen'
}

export function stageInfoOf(age: number): StageInfo {
  const id = stageOf(age)
  return STAGES.find((s) => s.id === id)!
}

export function isValidAge(age: number): boolean {
  return Number.isInteger(age) && age >= MIN_AGE && age <= MAX_AGE
}
