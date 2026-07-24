/** 대화 모드. 로그인이 없으므로 어떤 저장소에도 남기지 않고 앱 상태로만 들고 다닌다. */
export type Mode = 'senior' | 'youth'

export const MODE_LABEL: Record<Mode, string> = {
  senior: '어르신',
  youth: '청년',
}
