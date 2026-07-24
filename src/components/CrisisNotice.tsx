import type { CrisisLine } from '../services/crisis'

type Props = {
  lines: CrisisLine[]
  onDismiss: () => void
}

/**
 * F-10 위기 안내. 감지되면 대화 대신 이 화면이 뜨고,
 * 확인을 누르기 전까지 일반 대화를 이어갈 수 없다 (S-9).
 */
export default function CrisisNotice({ lines, onDismiss }: Props) {
  return (
    <div className="crisis" role="alertdialog" aria-labelledby="crisis-title">
      <h2 id="crisis-title" className="crisis-title">
        지금 많이 힘드신 것 같아요
      </h2>

      <p className="crisis-body">
        이런 이야기는 저보다 사람이 훨씬 잘 들어드릴 수 있어요.
        <br />
        아래 번호로 지금 바로 이야기 나눌 수 있습니다. 24시간 열려 있어요.
      </p>

      <ul className="crisis-lines">
        {lines.map((line) => (
          <li key={line.number}>
            {/* S-8 상담전화 바로 걸기 */}
            <a className="crisis-call" href={`tel:${line.number}`}>
              <span className="crisis-number">{line.number}</span>
              <span className="crisis-name">{line.name}</span>
              <span className="crisis-note">{line.note}</span>
            </a>
          </li>
        ))}
      </ul>

      <button type="button" className="crisis-dismiss" onClick={onDismiss}>
        확인했어요
      </button>

      <p className="crisis-foot">
        급한 상황이라면 <b>119</b>로 전화해 주세요.
      </p>
    </div>
  )
}
