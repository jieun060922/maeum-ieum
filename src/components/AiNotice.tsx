/**
 * F-2 서비스 고지 (S-2 AI 고지 상시 표기 / S-3 대화 미저장 고지)
 * 모든 화면 아래에 항상 붙어 있어야 하므로 App에서 한 번만 렌더링한다.
 */
export default function AiNotice() {
  return (
    <p className="notice" role="note">
      저는 AI이고 의료 상담을 대신하지 않습니다. 대화 내용은 저장되지 않습니다.
    </p>
  )
}
