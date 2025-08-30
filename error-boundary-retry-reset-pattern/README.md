# Error Boundary & Retry/Reset Pattern

이 프로젝트는 React에서 Error Boundary 패턴을 사용하여 컴포넌트 에러를 우아하게 처리하고 복구하는 방법을 보여줍니다.

## 🎯 목표

- Error Boundary 없이 에러가 발생했을 때의 문제점 이해
- Error Boundary를 사용한 우아한 에러 처리 방법 학습
- 재시도(Retry) 및 리셋(Reset) 기능을 통한 에러 복구 패턴 구현
- 고급 Error Boundary 패턴과 에러 로깅 시스템 구축

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── before/          # Error Boundary 없이 에러를 발생시키는 컴포넌트들
│   │   ├── BuggyCounter.tsx
│   │   ├── BuggyUserProfile.tsx
│   │   └── BuggyRenderer.tsx
│   └── after/           # Error Boundary를 사용하는 컴포넌트들
│       ├── ErrorBoundary.tsx
│       ├── BuggyCounter.tsx
│       ├── BuggyUserProfile.tsx
│       └── BuggyRenderer.tsx
├── examples/
│   ├── before/          # Error Boundary 없이 에러를 발생시키는 예제들
│   │   ├── CounterExample.tsx
│   │   ├── UserProfileExample.tsx
│   │   └── RendererExample.tsx
│   └── after/           # Error Boundary를 사용하는 예제들
│       ├── CounterExample.tsx
│       ├── UserProfileExample.tsx
│       └── RendererExample.tsx
└── patterns/
    └── AdvancedErrorBoundaryExample.tsx  # 고급 Error Boundary 패턴
```

## 🔍 패턴 설명

### 1. Error Boundary 없이 (Before)

Error Boundary 없이 에러가 발생하면:
- 전체 애플리케이션이 크래시됨
- 사용자에게 빈 화면이나 에러 페이지가 표시됨
- 복구 방법이 없음

### 2. Error Boundary 사용 (After)

Error Boundary를 사용하면:
- 에러가 발생한 컴포넌트만 격리됨
- 우아한 폴백 UI가 표시됨
- 재시도(Retry) 및 리셋(Reset) 기능 제공
- 애플리케이션의 나머지 부분은 정상 작동

### 3. 고급 패턴 (Advanced)

고급 Error Boundary 패턴은 다음 기능을 제공합니다:
- 에러 로깅 및 모니터링
- 컴포넌트별 에러 추적
- 사용자 정의 폴백 UI
- 에러 통계 및 분석

## 🧪 예제 컴포넌트

### 1. BuggyCounter
- 특정 값에 도달하면 에러를 발생시키는 카운터
- 음수가 되면 에러 발생

### 2. BuggyUserProfile
- API 호출 시뮬레이션
- 랜덤하게 에러 발생
- 의도적인 API 실패 옵션

### 3. BuggyRenderer
- 렌더링 중 에러 발생
- 계산 에러 (0으로 나누기)
- null 객체 접근 에러

## 🛠️ Error Boundary 구현

```typescript
class ErrorBoundary extends Component<Props, State> {
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorUI />;
    }
    return this.props.children;
  }
}
```

## 🎨 사용법

### 기본 사용법

```tsx
<ErrorBoundary>
  <BuggyComponent />
</ErrorBoundary>
```

### 커스텀 폴백 UI

```tsx
<ErrorBoundary
  fallback={<CustomErrorUI />}
  onError={(error, errorInfo) => console.log(error)}
  onReset={() => console.log('Reset triggered')}
>
  <BuggyComponent />
</ErrorBoundary>
```

### 재시도 기능

```tsx
<ErrorBoundary
  key={retryKey} // key를 변경하여 컴포넌트 재마운트
  onReset={() => setRetryKey(prev => prev + 1)}
>
  <BuggyComponent />
</ErrorBoundary>
```

## 🔧 주요 기능

### 1. 에러 캐치
- JavaScript 에러를 캐치하여 앱 크래시 방지
- 에러 정보 수집 및 로깅

### 2. 폴백 UI
- 기본 에러 UI 제공
- 사용자 정의 폴백 UI 지원
- 에러 상세 정보 표시 (개발 모드)

### 3. 복구 기능
- 재시도(Retry): 컴포넌트 상태 초기화
- 리셋(Reset): 컴포넌트 완전 재마운트

### 4. 에러 로깅
- 에러 발생 시 콘솔 로깅
- 에러 정보 및 스택 트레이스 수집
- 사용자 정의 에러 핸들러 지원

## 📊 에러 통계

고급 패턴에서는 다음 정보를 추적합니다:
- 총 에러 발생 횟수
- 컴포넌트별 에러 발생 횟수
- 에러 발생 시간
- 에러 메시지 및 스택 트레이스

## 🎯 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

1. **Error Boundary의 필요성**: 에러가 발생했을 때 앱이 크래시되는 문제 이해
2. **에러 격리**: 특정 컴포넌트의 에러가 전체 앱에 영향을 주지 않도록 격리
3. **사용자 경험**: 우아한 에러 처리로 사용자 경험 개선
4. **복구 메커니즘**: 재시도 및 리셋을 통한 에러 복구 방법
5. **에러 모니터링**: 에러 로깅 및 분석 시스템 구축

## 🚨 주의사항

- Error Boundary는 다음 에러를 캐치하지 않습니다:
  - 이벤트 핸들러 내부의 에러
  - 비동기 코드 (Promise, setTimeout 등)
  - 서버 사이드 렌더링 에러
  - Error Boundary 자체에서 발생한 에러

- 이러한 에러들은 try-catch 블록이나 다른 방법으로 처리해야 합니다.

## 📚 추가 리소스

- [React Error Boundaries 공식 문서](https://reactjs.org/docs/error-boundaries.html)
- [Error Boundary 패턴 모범 사례](https://reactjs.org/docs/error-boundaries.html#error-boundaries)
- [React Error Boundary 라이브러리](https://github.com/bvaughn/react-error-boundary)

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 포크하세요
2. 새로운 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
