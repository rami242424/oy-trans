# 오가람 | Frontend Developer — Portfolio

> 만든 것보다 **왜 그렇게 만들었는지**를 적은 프론트엔드 포트폴리오

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

---

## 📌 다루는 프로젝트

지면을 3단으로 나눕니다. 하나를 깊게 보이고, 나머지는 층을 밝혀서 짧게 둡니다.

| 층            | 프로젝트                                                   | 표기                         |
| ------------- | ---------------------------------------------------------- | ---------------------------- |
| **사례 연구** | [OY-trans](https://github.com/rami242424/oy-trans)         | 근무 매장 크루 88명에게 공유 |
| 개인 프로젝트 | [dayMatch](https://github.com/rami242424/dayMatch)         | 직접 기획 · 구현             |
| 요약 카드     | [CineSearch](https://github.com/rami242424/movie-app)      | 학습 프로젝트                |
| 요약 카드     | [Kanban Board](https://github.com/rami242424/kanban-board) | 학습 프로젝트                |

OY-trans는 8단락 사례 연구로 씁니다. 왜 만들었는지, 매장 응대 순서가 어떻게 자료 구조가 됐는지,
쓰면서 무엇을 고쳤는지, 그리고 **아직 확인하지 못한 것**까지 적습니다.
마지막 항목을 빼면 나머지 일곱 개도 믿을 수 없게 되기 때문입니다.

섹션 순서 — 사례 연구 → 나머지 프로젝트 → 출판 → 궤적 → 기술 → 경력 → 연락처.

### 쓰지 않은 것

검증할 수 없는 문장은 넣지 않았습니다.

- 근태 기록 (개발 직군에서 근거가 되지 않고 확인도 불가)
- 측정하지 않은 개선 효과 ("응대가 빨라졌다" 등)
- 확인 전인 외부 순위
- 지원자가 만들지 않은 사내 프로세스를 만들었다고 쓰는 것

---

## ✍️ 글 계약

색과 간격은 [`DESIGN.md`](./DESIGN.md)가 잡습니다. 문장은 [`WRITING.md`](./WRITING.md)가 잡습니다.

이 저장소는 문장을 네 번 다시 썼는데, 매번 기준이 달라졌습니다.
디자인은 토큰이 있어서 흔들리지 않았는데 글에는 그런 장치가 없었기 때문입니다.
그래서 규칙을 문서로 적고, 검사기로 강제했습니다.

```bash
npm run lint:copy
```

말끝 버릇(`~더군요` `~거든요`), 상투어, 번역투, 측정하지 않은 수식어, 90자 초과 문장을
검사합니다. 하나라도 걸리면 `npm run lint`가 실패합니다.
자동으로 잡을 수 없는 규칙(측정하지 않은 개선을 주장하지 않기, 공유와 사용을 구분하기 등)은
WRITING.md에 사람이 확인할 항목으로 적어두었습니다.

---

## 🎨 디자인 시스템

이 사이트의 색·타이포·간격·컴포넌트 규칙은 [`DESIGN.md`](./DESIGN.md)에 계약으로 정리되어 있고,
`src/index.css`의 CSS 커스텀 프로퍼티가 그 토큰을 그대로 구현합니다.

- **구조** — 카카오뱅크 공개 웹 표면(2026-07-12 검증)의 흰 캔버스·검정 우선 타이포·`#f7f7f7` 섹션 면·6px 검정 액션·그림자 없는 평면 컴포넌트
- **강조** — 라임 `#8ED320` / 딥그린 잉크 `#16250B`. 본인 프로젝트 OY-trans의 고객 표시 화면에서 실제로 쓰는 값
- **규칙** — 라임은 **면(fill)으로만** 사용합니다. 흰 배경 대비 1.83:1이라 텍스트 색으로 쓰면 WCAG AA에 미달하기 때문입니다. 흰 배경 위 강조 텍스트는 `#4A6B0F`(6.17:1)를 씁니다
- 한 뷰포트에 라임 면은 최대 한 곳

DESIGN.md는 [oh-my-design-cli](https://oh-my-design.kr)의 Core v2 계약 형식을 따르며,
`npx oh-my-design-cli@latest design-md validate DESIGN.md` 로 **portable-core 검증을 통과**합니다.

---

## 🔧 구현 포인트

### 1. 등장 애니메이션 — 스크롤 이벤트 대신 IntersectionObserver

스크롤 이벤트마다 `getBoundingClientRect()`를 호출하면 그때마다 레이아웃을 강제로 다시 계산하게 됩니다.
`IntersectionObserver`는 브라우저가 교차 판정을 대신 해주고, 한 번 등장한 뒤에는 `disconnect()`로 관찰을 끊습니다.
재진입할 때마다 다시 재생되면 스크롤을 되돌릴 때 산만해지기 때문입니다.

```ts
const observer = new IntersectionObserver(
  ([entry]) => {
    if (!entry.isIntersecting) return;
    setVisible(true);
    observer.disconnect(); // 한 번만 재생
  },
  { threshold, rootMargin: "0px 0px -8% 0px" },
);
```

### 2. 카운트업 — setInterval이 아니라 requestAnimationFrame

`setInterval(fn, 16)`으로 값을 올리면 기기 성능과 주사율에 따라 끝나는 시각이 달라집니다.
`requestAnimationFrame`에서 **경과 시간 기준으로 진행률을 계산**하면 프레임이 밀려도 총 소요 시간은 같습니다.

```ts
const progress = Math.min((now - startedAt) / duration, 1);
const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
setValue(Math.round(target * eased));
```

### 3. `prefers-reduced-motion`을 효과가 아니라 초기값으로 처리

축소 모션 환경에서 "효과 안에서 최종값으로 setState" 하면 렌더가 한 번 더 돕니다.
`useState`의 초기화 함수에서 이미 최종값으로 시작하고, 효과는 그냥 빠져나오게 했습니다.

```ts
const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
useEffect(() => {
  if (!start || prefersReducedMotion()) return;
  /* ... rAF ... */
}, [target, start, duration]);
```

CSS에서도 `@media (prefers-reduced-motion: reduce)`로 모든 트랜지션을 0으로 확정합니다.

### 4. 한국어 줄바꿈 — `word-break: keep-all`

기본값이면 "먼저 찾습니다"가 "먼 / 저 찾습니다"처럼 어절 중간에서 끊깁니다.
`keep-all`로 어절 단위 줄바꿈을 강제하고, 긴 URL만 `overflow-wrap: break-word`로 예외 처리했습니다.

이 사이트는 한국어 전용이라 `keep-all`이 안전합니다. 다만 14개 언어를 다루는 OY-trans에서는
같은 속성이 중국어·일본어의 줄바꿈을 막아 글자가 화면 밖으로 넘쳤습니다.
띄어쓰기가 없는 언어에서는 문장 전체가 한 단어로 취급되기 때문입니다.
언어 조건이 달라지면 같은 CSS도 다르게 동작한다는 것을 그 프로젝트에서 확인했습니다.

### 5. 폰트를 CDN이 아니라 의존성으로

Pretendard를 CDN `<link>`로 불러오면 그 CDN이 죽거나 느려질 때 화면이 통째로 기본 고딕으로 떨어집니다.
`npm i pretendard` 후 **dynamic-subset CSS를 `main.tsx`에서 import**하면 Vite가 woff2 조각까지 함께 번들합니다.
한글 dynamic-subset은 자주 쓰는 글자부터 92개로 쪼개져 있어서, 브라우저는 **실제로 화면에 쓰인 글자에 해당하는 조각만** 내려받습니다.

```ts
// main.tsx
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
```

### 6. 데모 영상 — webm(VP9) + mp4(H.264) 두 벌

브라우저마다 코덱 지원이 갈리므로 `<source>` 두 개를 두고, 둘 다 실패해도 포스터 이미지가 남도록 했습니다.
원본 GIF 6.8MB → webm 33KB / mp4 33KB (약 99% 감소).

### 7. 활성 섹션 표시 — 교차 비율이 가장 큰 하나만

스크롤 중에는 섹션 두세 개가 동시에 화면에 걸립니다. `intersectionRatio`를 기록해두고
그중 가장 큰 하나만 활성으로 처리합니다.

---

## ♿ 접근성

- 본문 텍스트 대비비 **WCAG AA 전부 통과** (자체 검사 스크립트 기준 미달 0건)
- 모든 인터랙티브 요소 터치 영역 44×44px 이상
- `:focus-visible` 2px 외곽선 — 마우스 클릭에는 나타나지 않음
- 스킵 링크(Tab 첫 진입 → "프로젝트로 바로 가기")
- 라이트박스 ESC 닫기 · 배경 스크롤 잠금 · 닫힘 시 원복
- 외부 링크 `rel="noopener noreferrer"` + 스크린리더용 "새 창" 안내
- `<h1>` 1개, 헤딩 순서 정상, 이미지 alt 100%
- 320px ~ 1920px 전 구간 가로 스크롤 없음

---

## 📁 프로젝트 구조

```
src/
├── main.tsx
├── App.tsx                    # 섹션 조립
├── index.css                  # DESIGN.md 토큰 + 전역 컴포넌트 스타일
├── data/
│   ├── profile.ts             # 지표 · 궤적 · 경력 · 학력 · 스택
│   └── projects.ts            # 프로젝트 4개 (문제/판단/결과)
├── hooks/
│   ├── useReveal.ts           # 스크롤 등장 (1회)
│   ├── useCountUp.ts          # 지표 카운트업 (rAF)
│   └── useActiveSection.ts    # 현재 섹션 감지
└── components/
    ├── Reveal.tsx             # 등장 래퍼 (계단식 지연 최대 6개)
    ├── Nav.tsx                # 스크롤 시 blur 배경 + 활성 밑줄
    ├── Hero.tsx
    ├── CaseStudy.tsx          # OY-trans 8단락 사례 연구
    ├── ShotButton.tsx         # 썸네일 (focus 값으로 자를 기준점 결정)
    ├── Lightbox.tsx           # 원본 보기
    ├── Projects.tsx           # 프로젝트 카드 + 라이트박스
    ├── Publication.tsx        # 출간 기술서
    ├── Track.tsx              # 공대 → 구매팀 → 매장·개발
    ├── Stack.tsx
    ├── Experience.tsx         # 경력 · 학력
    └── Contact.tsx
```

---

## 🚀 실행

```bash
npm install
npm run dev      # 개발 서버
npm run build    # 타입 체크 + 프로덕션 빌드
npm run lint     # ESLint + 글 검사
npm run lint:copy # 글 검사만
```

---

## 📝 앞으로

- [ ] 배포 후 이 README 상단에 Vercel 주소 추가
- [ ] OG 이미지 제작 (현재 `og:image` 미지정)
- [ ] 프로젝트 상세 페이지 분리 (현재는 단일 페이지 + 라이트박스)
- [ ] Lighthouse 실측 기록
