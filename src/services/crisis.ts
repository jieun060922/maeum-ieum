import type { Stage } from '../types/stage'

/**
 * F-10 위기 표현 감지.
 *
 * 대화를 AI로 보내기 전에 먼저 검사한다. 걸리면 AI를 호출하지 않고
 * 상담전화 안내로 전환한다. 감지 사실은 어디에도 기록하지 않는다.
 *
 * 판단 원칙: 놓치는 것이 잘못 뜨는 것보다 훨씬 위험하다.
 * 애매하면 안내를 띄우는 쪽으로 기울인다.
 */

/** 띄어쓰기를 무시하고 비교하기 위해 공백과 문장부호를 걷어낸다. */
function normalize(text: string): string {
  return text.replace(/[\s.,!?~ㆍ·'"()\[\]-]/g, '')
}

/** 직접적인 자살·자해 표현 */
const DIRECT = [
  '자살',
  '죽고싶',
  '죽고파',
  '죽어버리',
  '죽을래',
  '죽자',
  '자해',
  '목숨을끊',
  '목매',
  '뛰어내리',
  '손목긋',
  '극단적선택',
]

/** 삶을 놓으려는 뜻이 담긴 완곡한 표현 */
const INDIRECT = [
  '사라지고싶',
  '없어지고싶',
  '살기싫',
  '살고싶지않',
  '사는게의미없',
  '살이유가없',
  '태어나지말',
  '먼저갈',
  '따라가고싶',
  '끝내고싶',
  '포기하고싶',
  '아무도날찾지',
  '유서',
]

export type CrisisLine = {
  name: string
  number: string
  note: string
}

/** 나이대에 맞는 상담 연락처를 앞에 둔다. */
export function crisisLinesFor(stage: Stage): CrisisLine[] {
  const suicide: CrisisLine = {
    name: '자살예방 상담전화',
    number: '109',
    note: '24시간 언제나',
  }
  const mental: CrisisLine = {
    name: '정신건강 상담전화',
    number: '1577-0199',
    note: '24시간 언제나',
  }
  const teen: CrisisLine = {
    name: '청소년 상담전화',
    number: '1388',
    note: '24시간, 청소년 전용',
  }

  return stage === 'teen' ? [teen, suicide, mental] : [suicide, mental]
}

/** 위기 표현이 있으면 true. 판단이 애매하면 true 쪽으로 기운다. */
export function isCrisis(text: string): boolean {
  const t = normalize(text)
  return [...DIRECT, ...INDIRECT].some((k) => t.includes(k))
}
