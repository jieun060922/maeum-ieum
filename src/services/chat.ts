import type { Stage } from '../types/stage'

export type Role = 'user' | 'ai'

export type Message = {
  id: number
  role: Role
  text: string
}

/**
 * 대화 응답을 받아온다.
 *
 * 지금은 시기별로 미리 써둔 문장을 돌려주는 가짜 응답이다.
 * 실제 AI를 붙일 때는 이 함수 안만 서버리스 함수(`/api/chat`) 호출로 바꾸면 되고,
 * 화면 코드는 건드릴 필요가 없다. API 키는 이 파일이 아니라 서버 쪽에만 둔다.
 */
export async function sendMessage(stage: Stage, text: string): Promise<string> {
  await delay(700)
  return pickReply(stage, text)
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 시기별 말투를 눈으로 확인하기 위한 임시 응답 */
const MOCK_REPLIES: Record<Stage, string[]> = {
  teen: [
    '그랬구나. 그때 기분이 어땠어?',
    '말해줘서 고마워. 좀 더 얘기해줄래?',
    '많이 답답했겠다. 요즘 제일 신경 쓰이는 게 뭐야?',
  ],
  young: [
    '그런 상황이셨군요. 그때 어떤 생각이 드셨어요?',
    '이야기해 주셔서 고맙습니다. 언제부터 그런 느낌이 드셨나요?',
    '혼자 감당하기 버거우셨겠어요. 요즘 가장 힘든 부분은 어떤 건가요?',
  ],
  middle: [
    '많은 걸 짊어지고 계셨네요. 요즘 마음이 어떠신가요?',
    '그러셨군요. 그 일이 언제부터 이어지고 있나요?',
    '쉽지 않으셨겠습니다. 조금 더 들려주시겠어요?',
  ],
  senior: [
    '그러셨군요. 오늘은 좀 어떠세요?',
    '말씀 잘 들었습니다. 식사는 하셨어요?',
    '적적하셨겠어요. 요즘 누구랑 이야기 나누세요?',
  ],
}

let turn = 0

function pickReply(stage: Stage, _text: string): string {
  const list = MOCK_REPLIES[stage]
  const reply = list[turn % list.length]
  turn += 1
  return reply
}
