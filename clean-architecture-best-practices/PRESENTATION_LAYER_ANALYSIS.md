# Presentation 계층 분석 및 Feature Base 분류 방안

## 📊 현재 Presentation 계층 분석

### 현재 구조
```
src/presentation/
├── hooks/
│   └── useUserWithStore.ts      # User 관련 훅 (Zustand 스토어 사용)
├── pages/                       # 빈 디렉토리
└── components/
    └── UserProfileWithStore.tsx # User 관련 컴포넌트 (Zustand 스토어 사용)
```

### 관련 Infrastructure 계층
```
src/infrastructure/store/
├── UserStore.ts                 # Zustand 기반 User 스토어
└── PostStore.ts                 # Zustand 기반 Post 스토어
```

## 🎯 Feature Base 분류 방안

### 1. **Feature별 분류 (권장)**

#### User Feature로 이동할 항목들:
```
src/features/user/presentation/
├── hooks/
│   ├── useUser.ts              # ✅ 이미 이동됨 (기본 훅)
│   └── useUserWithStore.ts     # 🔄 이동 필요 (Zustand 스토어 훅)
├── components/
│   ├── UserProfile.tsx         # ✅ 이미 이동됨 (기본 컴포넌트)
│   └── UserProfileWithStore.tsx # 🔄 이동 필요 (Zustand 스토어 컴포넌트)
└── pages/
    └── UserProfilePage.tsx     # ✅ 이미 이동됨
```

#### Post Feature로 이동할 항목들:
```
src/features/post/presentation/
├── hooks/
│   └── usePosts.ts             # ✅ 이미 이동됨
├── components/
│   └── PostList.tsx            # 🔄 생성 필요
└── pages/
    └── PostListPage.tsx        # 🔄 생성 필요
```

#### Shared로 이동할 항목들:
```
src/shared/
├── components/                 # ✅ 이미 이동됨 (Button, Card, Input)
├── store/                      # 🔄 이동 필요 (Zustand 스토어들)
│   ├── UserStore.ts
│   └── PostStore.ts
└── hooks/                      # 🔄 생성 필요 (공통 훅들)
    └── useStore.ts             # 스토어 관련 공통 로직
```

### 2. **분류 기준**

#### Feature별로 분류하는 경우:
- **특정 도메인에만 관련된 컴포넌트/훅**
- **도메인별 특화된 UI 로직**
- **도메인별 상태 관리**

#### Shared로 분류하는 경우:
- **여러 Feature에서 공통으로 사용되는 컴포넌트**
- **공통 상태 관리 로직**
- **재사용 가능한 UI 패턴**

## 🔄 구체적인 마이그레이션 계획

### 1단계: User Feature 완성
```bash
# User 관련 파일들을 User Feature로 이동
mv src/presentation/hooks/useUserWithStore.ts src/features/user/presentation/hooks/
mv src/presentation/components/UserProfileWithStore.tsx src/features/user/presentation/components/
```

### 2단계: Store를 Shared로 이동
```bash
# Zustand 스토어들을 Shared로 이동
mv src/infrastructure/store src/shared/
```

### 3단계: Post Feature 완성
```bash
# Post 관련 컴포넌트 생성
touch src/features/post/presentation/components/PostList.tsx
touch src/features/post/presentation/pages/PostListPage.tsx
```

### 4단계: 공통 훅 생성
```bash
# 공통 스토어 관련 훅 생성
mkdir -p src/shared/hooks
touch src/shared/hooks/useStore.ts
```

## 📁 최종 구조 제안

### 완성된 Feature Base 구조:
```
src/
├── features/
│   ├── user/
│   │   ├── domain/
│   │   ├── usecase/
│   │   ├── repository/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │       ├── hooks/
│   │       │   ├── useUser.ts
│   │       │   └── useUserWithStore.ts
│   │       ├── components/
│   │       │   ├── UserProfile.tsx
│   │       │   └── UserProfileWithStore.tsx
│   │       └── pages/
│   │           └── UserProfilePage.tsx
│   └── post/
│       ├── domain/
│       ├── usecase/
│       ├── repository/
│       ├── infrastructure/
│       └── presentation/
│           ├── hooks/
│           │   └── usePosts.ts
│           ├── components/
│           │   └── PostList.tsx
│           └── pages/
│               └── PostListPage.tsx
├── shared/
│   ├── domain/
│   ├── infrastructure/
│   ├── components/             # Button, Card, Input
│   ├── store/                  # Zustand 스토어들
│   │   ├── UserStore.ts
│   │   └── PostStore.ts
│   └── hooks/                  # 공통 훅들
│       └── useStore.ts
└── app/
```

## 🎯 분류 원칙

### 1. **Feature별 분류 원칙**
- **도메인 특화**: 특정 비즈니스 도메인에만 관련된 UI 로직
- **응집도**: 관련된 모든 코드가 한 곳에 모여있음
- **독립성**: 다른 Feature에 의존하지 않음

### 2. **Shared 분류 원칙**
- **재사용성**: 여러 Feature에서 공통으로 사용
- **범용성**: 특정 도메인에 종속되지 않음
- **일관성**: 전체 애플리케이션에서 일관된 패턴 제공

### 3. **Store 분류 원칙**
- **Zustand 스토어**: Shared로 이동 (여러 Feature에서 사용 가능)
- **Feature별 상태**: 각 Feature의 presentation 계층에 배치
- **전역 상태**: Shared/store에 배치

## 💡 권장사항

### 1. **즉시 실행 가능한 작업**
- User 관련 파일들을 User Feature로 이동
- Zustand 스토어들을 Shared로 이동
- Import 경로 업데이트

### 2. **단계적 개선**
- Post Feature 컴포넌트 생성
- 공통 훅 패턴 개발
- 테스트 코드 마이그레이션

### 3. **장기적 계획**
- 새로운 Feature 추가 시 동일한 패턴 적용
- 공통 컴포넌트 라이브러리 구축
- 성능 최적화 (코드 스플리팅)

## 🎯 기대 효과

1. **명확한 책임 분리**: Feature별 UI 로직과 공통 로직의 명확한 구분
2. **재사용성 향상**: Shared 컴포넌트와 훅의 효율적 활용
3. **유지보수성 개선**: Feature별 독립적인 UI 개발 및 수정
4. **확장성 확보**: 새로운 Feature 추가 시 일관된 구조 적용
5. **팀 협업 효율성**: Feature별 담당 팀의 독립적 작업 가능

이 분류 방안을 통해 Presentation 계층이 Feature Base 아키텍처의 핵심 원칙인 
"기능별 응집도"와 "공통 로직 분리"를 완벽하게 구현할 수 있습니다.
