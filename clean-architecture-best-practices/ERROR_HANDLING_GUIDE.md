# Feature Base 아키텍처에서의 Error Handling 가이드

## 🚨 Error Handling 전략

Feature Base 아키텍처에서는 여러 레벨에서 Error Handling을 구현하여 사용자 경험을 향상시키고 개발자 디버깅을 돕습니다.

## 📁 Error Handling 구조

### 1. **Next.js App Router 레벨**
```
src/app/
├── not-found.tsx           # 404 에러 처리
├── global-error.tsx        # 전역 에러 처리
└── error.tsx               # 페이지별 에러 처리 (선택사항)
```

### 2. **Feature 레벨**
```
src/features/
├── user/
│   └── presentation/
│       └── pages/
│           └── UsersPage.tsx      # ErrorBoundary로 감쌈
└── post/
    └── presentation/
        └── pages/
            └── PostsPage.tsx      # ErrorBoundary로 감쌈
```

### 3. **Shared 레벨**
```
src/shared/
└── components/
    └── ErrorBoundary.tsx         # 재사용 가능한 에러 처리 컴포넌트
```

## 🎯 Error Handling 구현 방법

### 1. **404 Not Found 처리**

#### `src/app/not-found.tsx`
```typescript
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </div>
  );
}
```

**사용 시나리오:**
- 존재하지 않는 URL 접근 (`/comment`, `/invalid-route`)
- 삭제된 페이지 접근
- 잘못된 링크 클릭

### 2. **Global Error 처리**

#### `src/app/global-error.tsx`
```typescript
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div>Something went wrong!</div>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
```

**사용 시나리오:**
- Root Layout 에러
- 전역 상태 관리 에러
- 서버 사이드 렌더링 에러

### 3. **Feature별 Error Boundary**

#### `src/shared/components/ErrorBoundary.tsx`
```typescript
export class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

**사용 시나리오:**
- 컴포넌트 렌더링 에러
- API 호출 실패
- 데이터 파싱 에러
- 상태 관리 에러

## 🔧 Error Handling 적용 예시

### User Feature에 Error Boundary 적용
```typescript
// src/features/user/presentation/pages/UsersPage.tsx
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export default function UsersPage() {
  return (
    <ErrorBoundary featureName="Users">
      <UsersPageContent />
    </ErrorBoundary>
  );
}
```

### Post Feature에 Error Boundary 적용
```typescript
// src/features/post/presentation/pages/PostsPage.tsx
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export default function PostsPage() {
  return (
    <ErrorBoundary featureName="Posts">
      <PostsPageContent />
    </ErrorBoundary>
  );
}
```

## 📊 Error Handling 계층 구조

```
┌─────────────────────────────────────┐
│           Next.js App Router        │
│  ┌─────────────────────────────┐   │
│  │      Global Error           │   │
│  │   (전역 에러 처리)           │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │      Not Found              │   │
│  │   (404 에러 처리)            │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────┐
│           Feature Layer             │
│  ┌─────────────────────────────┐   │
│  │    User Feature             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │  ErrorBoundary      │   │   │
│  │  │  (User 에러 처리)    │   │   │
│  │  └─────────────────────┘   │   │
│  └─────────────────────────────┘   │
│  ┌─────────────────────────────┐   │
│  │    Post Feature             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │  ErrorBoundary      │   │   │
│  │  │  (Post 에러 처리)    │   │   │
│  │  └─────────────────────┘   │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

## 💡 Error Handling Best Practices

### 1. **사용자 친화적 메시지**
```typescript
// ❌ Bad
<p>Error: TypeError: Cannot read property 'name' of undefined</p>

// ✅ Good
<p>사용자 정보를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.</p>
```

### 2. **Recovery 옵션 제공**
```typescript
<div className="error-actions">
  <Button onClick={retry}>다시 시도</Button>
  <Button onClick={goHome}>홈으로</Button>
  <Button onClick={reload}>페이지 새로고침</Button>
</div>
```

### 3. **에러 로깅 및 모니터링**
```typescript
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // 에러 로깅 서비스에 전송
  logErrorToService(error, errorInfo);
  
  // 개발자에게 알림
  if (process.env.NODE_ENV === 'development') {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
}
```

### 4. **Feature별 에러 처리**
```typescript
// User Feature 에러
<ErrorBoundary 
  featureName="Users"
  onError={(error, errorInfo) => {
    // User Feature 특화 에러 처리
    handleUserFeatureError(error, errorInfo);
  }}
>
  <UsersPageContent />
</ErrorBoundary>

// Post Feature 에러
<ErrorBoundary 
  featureName="Posts"
  onError={(error, errorInfo) => {
    // Post Feature 특화 에러 처리
    handlePostFeatureError(error, errorInfo);
  }}
>
  <PostsPageContent />
</ErrorBoundary>
```

## 🚀 Error Handling 확장

### 1. **새로운 Feature 추가 시**
```typescript
// src/features/auth/presentation/pages/LoginPage.tsx
export default function LoginPage() {
  return (
    <ErrorBoundary featureName="Authentication">
      <LoginPageContent />
    </ErrorBoundary>
  );
}
```

### 2. **커스텀 에러 페이지**
```typescript
// src/features/user/presentation/components/UserErrorFallback.tsx
export function UserErrorFallback({ error }: { error: Error }) {
  return (
    <div className="user-error-fallback">
      <h2>사용자 기능 오류</h2>
      <p>사용자 정보를 불러오는 중 문제가 발생했습니다.</p>
      <Button onClick={() => window.location.reload()}>
        페이지 새로고침
      </Button>
    </div>
  );
}
```

## 📈 Error Handling 모니터링

### 1. **에러 통계 수집**
```typescript
// 에러 발생 빈도, 유형, 사용자 영향도 등 수집
const errorStats = {
  feature: 'Users',
  errorType: error.name,
  errorMessage: error.message,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
  url: window.location.href
};
```

### 2. **성능 지표**
```typescript
// 에러 발생 시점의 성능 지표 수집
const performanceMetrics = {
  timeToFirstByte: performance.timing.responseStart - performance.timing.navigationStart,
  domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
  loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart
};
```

## 🎯 결론

Feature Base 아키텍처에서의 Error Handling은:

1. **계층별 처리**: App Router, Feature, Component 레벨에서 각각 처리
2. **사용자 경험**: 명확한 에러 메시지와 복구 옵션 제공
3. **개발자 경험**: 상세한 에러 정보와 디버깅 도구 제공
4. **확장성**: 새로운 Feature 추가 시 일관된 에러 처리 패턴 적용
5. **모니터링**: 에러 발생 패턴 분석을 통한 지속적 개선

이를 통해 안정적이고 사용자 친화적인 애플리케이션을 구축할 수 있습니다.
