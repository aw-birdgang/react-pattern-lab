# React 기능-기반 폴더 구조 패턴

이 프로젝트는 React에서 기능(Feature)-기반 폴더 구조 패턴을 사용하기 전과 후를 비교하여 보여주는 예제입니다.

## 🎯 목적

기능-기반 폴더 구조 패턴의 장점을 실제 코드를 통해 비교하고, 더 나은 코드 조직화 방법을 제시합니다.

## 📁 폴더 구조

### 기존 방식 (Before)
```
src/
├── components/
│   ├── UserProfile.tsx    # 모든 로직이 하나의 파일에
│   ├── LoginForm.tsx      # 모든 로직이 하나의 파일에
│   └── Dashboard.tsx      # 모든 로직이 하나의 파일에
```

### 기능-기반 구조 (After)
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useLoginForm.ts
│   │   └── types.ts
│   ├── user/
│   │   ├── components/
│   │   │   ├── UserProfile.tsx
│   │   │   ├── UserProfileView.tsx
│   │   │   └── UserProfileForm.tsx
│   │   ├── hooks/
│   │   │   └── useUserProfile.ts
│   │   └── types.ts
│   └── dashboard/
│       ├── components/
│       │   ├── Dashboard.tsx
│       │   ├── StatsCard.tsx
│       │   └── RecentActivities.tsx
│       ├── hooks/
│       │   └── useDashboard.ts
│       └── types.ts
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── utils/
│   │   └── index.ts
│   └── types/
│       └── index.ts
└── components/
    ├── before/           # 기존 방식
    └── after/            # 기능-기반 구조
```

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🔄 기능-기반 구조의 장점

### 1. **코드 발견성 향상**
- 기능별로 폴더가 분리되어 관련 코드를 쉽게 찾을 수 있습니다.
- 새로운 개발자가 프로젝트 구조를 이해하기 쉽습니다.

### 2. **관심사의 분리**
- 각 기능의 로직, UI, 타입이 명확하게 분리됩니다.
- 컴포넌트는 UI에만 집중하고, 로직은 커스텀 훅으로 분리합니다.

### 3. **재사용성 향상**
- 공통 컴포넌트와 훅을 `shared` 폴더에서 관리합니다.
- 기능별 로직을 다른 곳에서도 쉽게 재사용할 수 있습니다.

### 4. **테스트 용이성**
- 각 기능별로 독립적인 테스트를 작성할 수 있습니다.
- 로직과 UI가 분리되어 단위 테스트가 쉬워집니다.

### 5. **확장성**
- 새로운 기능을 추가할 때 기존 코드에 영향을 주지 않습니다.
- 팀원들이 동시에 다른 기능을 개발할 때 충돌이 줄어듭니다.

### 6. **유지보수성**
- 버그 수정이나 기능 변경 시 관련 코드를 쉽게 찾을 수 있습니다.
- 코드의 책임이 명확하게 분리되어 있어 수정이 안전합니다.

## 📝 사용된 기술

- **React 18** - 사용자 인터페이스 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Custom Hooks** - 로직 재사용
- **Feature-based Architecture** - 기능별 코드 조직화

## 🧪 테스트

```bash
npm test
```

## 📦 빌드

```bash
npm run build
```

## 📚 학습 포인트

1. **기능별 분리**: 관련된 코드를 하나의 폴더에 모아 관리
2. **커스텀 훅**: 비즈니스 로직을 재사용 가능한 훅으로 분리
3. **공통 컴포넌트**: 여러 곳에서 사용되는 UI 컴포넌트를 shared 폴더에서 관리
4. **타입 정의**: 각 기능별로 필요한 타입을 명확하게 정의
5. **단일 책임 원칙**: 각 파일과 폴더가 하나의 명확한 책임을 가짐

## 🤝 기여하기

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선 사항이나 버그 리포트는 언제든 환영합니다!

## 📄 라이선스

MIT License
