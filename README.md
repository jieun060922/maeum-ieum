# 팀 프로젝트

React + Vite + TypeScript + Supabase + Vercel 기반 팀 프로젝트입니다.

## 팀 구성 (2명)

| 담당 | 역할 | 맡은 화면 |
| --- | --- | --- |
| A | 프로젝트 리더 · 화면 | 메인 화면, 상세 화면 |
| B | 데이터 · 테스트 | 검색 화면, 결과 목록 |

- 역할은 책임 영역을 의미하며, 두 사람 모두 코드를 수정하고 커밋한다.
- `App.tsx`, 공통 컴포넌트, 라우팅은 리더(A)가 관리한다.

## 브랜치

| 브랜치 | 담당 | 내용 |
| --- | --- | --- |
| `main` | 공용 | 최종 결과물만 저장 (직접 푸시 금지) |
| `feature/main-page` | A | 메인 화면 |
| `feature/detail-page` | A | 상세 화면 |
| `feature/search` | B | 검색 화면 · 검색 폼 |
| `feature/result-list` | B | 결과 목록 · 카드 |

필요할 때 `feature/public-api`, `feature/supabase`, `fix/...` 브랜치를 추가로 만든다.

## 작업 순서

1. 작업 시작 전 최신 코드를 받는다 — `git pull origin main`
2. 자신의 작업 브랜치로 이동한다 — `git switch feature/...`
3. 맡은 기능만 수정한다
4. 작은 단위로 커밋한다
5. `git push origin feature/...`
6. Pull Request 생성
7. 팀 리더가 화면과 기능을 확인
8. 문제가 없으면 `main`에 병합

## 커밋 메시지 규칙

```
feat: 공공시설 검색 화면 추가
fix: 모바일에서 버튼이 잘리는 문제 수정
style: 결과 카드 간격 수정
docs: README 실행 방법 작성
```

"수정", "완료", "작업함", "진짜최종" 같은 메시지는 사용하지 않는다.

## 폴더 구조

```
src/
  components/   공통 컴포넌트 (Header, SearchForm, ResultCard)
  pages/        화면 단위 파일 (HomePage, SearchPage, DetailPage)
  services/     외부 연동 (publicDataApi, supabase)
  types/        타입 정의
```

## 주의 사항

- 회원가입 · 로그인 · 인증 · 권한 관리 기능은 구현하지 않는다.
- 이름, 전화번호, 이메일 등 개인정보는 저장하거나 입력받지 않는다.
- API 키와 Supabase 환경변수는 `.env.local`에 두고 저장소에 올리지 않는다. 배포용 값은 Vercel 환경변수로 등록한다.
- 동시에 같은 파일을 수정하지 않는다. 작업 시작 전 담당 파일을 팀 채널에 알린다.

## 실행 방법

```
npm install
npm run dev
```
