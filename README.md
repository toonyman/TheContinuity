# The Continuity (더 컨티뉴이니티)

**The Continuity**는 전 세계 사람들이 함께 만들어가는 글로벌 릴레이 소설 프로젝트입니다.
언어의 장벽 없이 누구나 자신의 모국어로 다음 문장을 이어 쓸 수 있으며, 실시간 번역을 통해 하나의 거대한 이야기를 공유합니다.

![The Continuity Preview](https://github.com/user-attachments/assets/placeholder)

## 🌟 주요 기능

- **글로벌 릴레이 집필**: 누구나 100자 이내의 문장을 이어 쓰며 소설을 만들어갑니다.
- **실시간 다국어 번역**: MyMemory API를 활용하여 한국어, 영어, 일본어, 중국어 등 다양한 언어로 이야기를 실시간으로 번역해 보여줍니다.
- **실시간 업데이트 (Live Feed)**: Supabase Realtime 기능을 통해 새로운 문장이 등록되는 즉시 피드에 반영됩니다.
- **몰입형 디자인**: 순수 블랙(#000000) 배경과 세련된 타이포그래피(Outfit, Playfair Display)로 오직 이야기에만 집중할 수 있는 환경을 제공합니다.
- **클린 봇 (Content Safety)**: 욕설, 비방, 광고성 URL 등을 자동으로 필터링하여 안전한 집필 환경을 유지합니다.

## 🛠 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Realtime)
- **Styling**: CSS Modules (Vanilla CSS)
- **Translation**: MyMemory Translation API
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Outfit, Playfair Display)

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따드세요.

### 1. 저장소 클론
```bash
git clone https://github.com/toonyman/TheContinuity.git
cd TheContinuity
```

### 2. 패키지 설치
```bash
npm install
# or
yarn install
```

### 3. 환경 변수 설정
root 디렉토리에 `.env.local` 파일을 생성하고 Supabase 키를 입력하세요.
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`을 열어 확인합니다.

---

## 📜 라이선스

This project is licensed under the MIT License.

---
**Built for the world.**
Languages connect us, stories unite us.
