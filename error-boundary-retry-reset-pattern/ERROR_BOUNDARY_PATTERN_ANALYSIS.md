# Error Boundary & Retry/Reset Pattern 분석

## 📋 목차

1. [패턴 개요](#패턴-개요)
2. [프로젝트 구조 분석](#프로젝트-구조-분석)
3. [패턴 적용 전 (Before)](#패턴-적용-전-before)
4. [패턴 적용 후 (After)](#패턴-적용-후-after)
5. [장단점 분석](#장단점-분석)
6. [패턴 적용 이유](#패턴-적용-이유)
7. [실제 구현 예제](#실제-구현-예제)
8. [고급 패턴](#고급-패턴)
9. [모범 사례](#모범-사례)
10. [결론](#결론)

## 🎯 패턴 개요

Error Boundary & Retry/Reset 패턴은 React 애플리케이션에서 JavaScript 에러를 우아하게 처리하고, 사용자에게 적절한 UI를 제공하며, 에러 복구를 위한 재시도/리셋 기능을 제공하는 패턴입니다.

### 핵심 개념

- **Error Boundary**: React 컴포넌트에서 발생하는 JavaScript 에러를 캐치
- **Fallback UI**: 에러 발생 시 사용자에게 보여줄 대체 UI
- **Retry/Reset**: 에러 복구를 위한 재시도 및 리셋 메커니즘
- **Error Logging**: 에러 정보 수집 및 모니터링

## 📁 프로젝트 구조 분석

```
error-boundary-retry-reset-pattern/
├── src/
│   ├── components/
│   │   ├── before/          # 패턴 적용 전 컴포넌트
│   │   │   ├── BuggyCounter.tsx
│   │   │   ├── BuggyUserProfile.tsx
│   │   │   └── BuggyRenderer.tsx
│   │   └── after/           # 패턴 적용 후 컴포넌트
│   │       ├── ErrorBoundary.tsx
│   │       ├── BuggyCounter.tsx
│   │       ├── BuggyUserProfile.tsx
│   │       └── BuggyRenderer.tsx
│   ├── examples/
│   │   ├── before/          # 패턴 적용 전 예제
│   │   └── after/           # 패턴 적용 후 예제
│   └── patterns/
│       └── AdvancedErrorBoundaryExample.tsx
```

## ❌ 패턴 적용 전 (Before)

### 문제점

Error Boundary 없이 에러가 발생하면:

1. **전체 애플리케이션 크래시**
2. **사용자에게 빈 화면 표시**
3. **복구 방법 없음**
4. **에러 정보 수집 불가**

### 예제 코드

```tsx
// BuggyCounter.tsx (Before)
const BuggyCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count + 1;
    
    // 특정 값에 도달하면 에러 발생
    if (newCount === 5) {
      throw new Error('Counter reached error threshold: 5');
    }
    
    setCount(newCount);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
};
```

### 문제 시나리오

```tsx
// App.tsx (Before)
function App() {
  return (
    <div>
      <Header />
      <BuggyCounter /> {/* 에러 발생 시 전체 앱 크래시 */}
      <Footer />
    </div>
  );
}
```

**결과**: 카운터가 5에 도달하면 전체 애플리케이션이 크래시되고, Header와 Footer도 함께 사라짐.

## ✅ 패턴 적용 후 (After)

### 해결책

Error Boundary를 사용하면:

1. **에러 격리**: 특정 컴포넌트의 에러가 전체 앱에 영향 없음
2. **우아한 폴백 UI**: 사용자 친화적인 에러 메시지
3. **복구 메커니즘**: 재시도 및 리셋 기능
4. **에러 로깅**: 에러 정보 수집 및 모니터링

### Error Boundary 구현

```tsx
// ErrorBoundary.tsx
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>An error occurred while rendering this component.</p>
          
          {this.state.error && (
            <details className="error-details">
              <summary>Error Details</summary>
              <pre>{this.state.error.toString()}</pre>
            </details>
          )}

          <div className="error-actions">
            <button onClick={this.handleRetry}>Try Again</button>
            <button onClick={this.handleReset}>Reset</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 사용 예제

```tsx
// App.tsx (After)
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary
        fallback={<CustomErrorUI />}
        onError={(error, errorInfo) => {
          console.log('Error logged:', error);
        }}
        onReset={() => {
          console.log('Component reset');
        }}
      >
        <BuggyCounter />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
```

**결과**: 카운터가 5에 도달해도 Header와 Footer는 정상 작동하고, 카운터 부분만 에러 UI로 대체됨.

## ⚖️ 장단점 분석

### ✅ 장점

#### 1. **사용자 경험 개선**
- 앱 전체가 크래시되지 않음
- 우아한 에러 메시지 제공
- 복구 옵션 제공

#### 2. **에러 격리**
- 특정 컴포넌트의 에러가 다른 부분에 영향 없음
- 앱의 안정성 향상

#### 3. **디버깅 지원**
- 에러 정보 수집
- 스택 트레이스 제공
- 에러 로깅 및 모니터링

#### 4. **복구 메커니즘**
- 재시도 기능
- 컴포넌트 리셋
- 상태 초기화

#### 5. **유연성**
- 커스텀 폴백 UI
- 에러 핸들러 커스터마이징
- 다양한 복구 전략

### ❌ 단점

#### 1. **제한적 에러 캐치**
- 이벤트 핸들러 에러 캐치 불가
- 비동기 코드 에러 캐치 불가
- 서버 사이드 렌더링 에러 캐치 불가

#### 2. **복잡성 증가**
- 추가적인 컴포넌트 계층
- 에러 처리 로직 필요
- 상태 관리 복잡성

#### 3. **성능 오버헤드**
- Error Boundary 컴포넌트 렌더링
- 에러 상태 관리
- 로깅 시스템

#### 4. **개발 복잡성**
- 적절한 위치에 Error Boundary 배치 필요
- 에러 시나리오 테스트 필요
- 복구 로직 구현 필요

## 🎯 패턴 적용 이유

### 1. **사용자 경험 보호**

```tsx
// Before: 앱 전체 크래시
function App() {
  return (
    <div>
      <Header />
      <BuggyComponent /> {/* 에러 발생 시 전체 앱 크래시 */}
      <Footer />
    </div>
  );
}

// After: 에러 격리
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <BuggyComponent /> {/* 에러 발생 시 해당 부분만 격리 */}
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
```

### 2. **비즈니스 연속성**

- 사용자가 앱을 계속 사용할 수 있음
- 중요한 기능이 에러로 인해 차단되지 않음
- 데이터 손실 방지

### 3. **운영 효율성**

- 에러 정보 수집으로 빠른 문제 해결
- 사용자 신고 없이도 에러 감지
- 시스템 안정성 모니터링

### 4. **개발 효율성**

- 에러 발생 시 빠른 디버깅
- 에러 패턴 분석
- 코드 품질 개선

## 🛠️ 실제 구현 예제

### 1. 기본 Error Boundary

```tsx
// BasicErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class BasicErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default BasicErrorBoundary;
```

### 2. 고급 Error Boundary

```tsx
// AdvancedErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onReset?: () => void;
  retryCount?: number;
  maxRetries?: number;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class AdvancedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 에러 리포팅 서비스로 전송
    this.reportError(error, errorInfo);
  }

  reportError = (error: Error, errorInfo: ErrorInfo) => {
    // 실제 프로덕션에서는 Sentry, LogRocket 등의 서비스 사용
    console.error('Error reported:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  };

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="advanced-error-boundary">
          <div className="error-content">
            <h2>Something went wrong!</h2>
            <p>An error occurred while rendering this component.</p>
            
            {retryCount > 0 && (
              <p>Retry attempt: {retryCount}/{maxRetries}</p>
            )}
            
            {error && (
              <details className="error-details">
                <summary>Error Details</summary>
                <pre>{error.toString()}</pre>
                {errorInfo && (
                  <pre>{errorInfo.componentStack}</pre>
                )}
              </details>
            )}

            <div className="error-actions">
              {retryCount < maxRetries && (
                <button onClick={this.handleRetry} className="retry-button">
                  Try Again ({retryCount + 1}/{maxRetries})
                </button>
              )}
              <button onClick={this.handleReset} className="reset-button">
                Reset Component
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdvancedErrorBoundary;
```

### 3. 에러 발생 컴포넌트

```tsx
// BuggyComponent.tsx
import React, { useState } from 'react';

interface BuggyComponentProps {
  errorThreshold?: number;
  errorType?: 'render' | 'calculation' | 'api';
}

const BuggyComponent: React.FC<BuggyComponentProps> = ({
  errorThreshold = 5,
  errorType = 'render'
}) => {
  const [count, setCount] = useState(0);
  const [shouldCrash, setShouldCrash] = useState(false);

  const increment = () => {
    const newCount = count + 1;
    
    if (newCount === errorThreshold) {
      throw new Error(`Component crashed at count: ${errorThreshold}`);
    }
    
    setCount(newCount);
  };

  const triggerCalculationError = () => {
    // 0으로 나누기 에러
    const result = 10 / 0;
    return result;
  };

  const triggerApiError = async () => {
    // API 에러 시뮬레이션
    throw new Error('API call failed');
  };

  const renderContent = () => {
    switch (errorType) {
      case 'calculation':
        return <div>Result: {triggerCalculationError()}</div>;
      case 'api':
        triggerApiError();
        return <div>API Content</div>;
      default:
        return <div>Normal Content</div>;
    }
  };

  return (
    <div className="buggy-component">
      <h3>Buggy Component</h3>
      <p>Count: {count}</p>
      <p>Error Threshold: {errorThreshold}</p>
      
      <div className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={() => setShouldCrash(true)}>
          Trigger Crash
        </button>
      </div>

      {shouldCrash && (
        <div>
          {(() => {
            throw new Error('Manual crash triggered');
          })()}
        </div>
      )}

      {renderContent()}
    </div>
  );
};

export default BuggyComponent;
```

### 4. 사용 예제

```tsx
// App.tsx
import React, { useState } from 'react';
import AdvancedErrorBoundary from './AdvancedErrorBoundary';
import BuggyComponent from './BuggyComponent';

const App: React.FC = () => {
  const [retryKey, setRetryKey] = useState(0);

  const handleError = (error: Error, errorInfo: any) => {
    console.log('Error logged:', error.message);
    // 에러 리포팅 서비스로 전송
  };

  const handleReset = () => {
    setRetryKey(prev => prev + 1);
  };

  const CustomFallback = () => (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #ff6b6b', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h3>Custom Error UI</h3>
      <p>This component encountered an error.</p>
      <button onClick={handleReset}>Reset Component</button>
    </div>
  );

  return (
    <div className="app">
      <header>
        <h1>Error Boundary Demo</h1>
      </header>

      <main>
        <section>
          <h2>Basic Error Boundary</h2>
          <AdvancedErrorBoundary
            onError={handleError}
            onReset={handleReset}
          >
            <BuggyComponent errorThreshold={3} />
          </AdvancedErrorBoundary>
        </section>

        <section>
          <h2>Custom Fallback UI</h2>
          <AdvancedErrorBoundary
            fallback={<CustomFallback />}
            onError={handleError}
            onReset={handleReset}
          >
            <BuggyComponent errorThreshold={5} />
          </AdvancedErrorBoundary>
        </section>

        <section>
          <h2>With Retry Key</h2>
          <AdvancedErrorBoundary
            key={retryKey}
            onError={handleError}
            onReset={handleReset}
          >
            <BuggyComponent errorThreshold={7} />
          </AdvancedErrorBoundary>
        </section>
      </main>
    </div>
  );
};

export default App;
```

## 🚀 고급 패턴

### 1. 에러 로깅 시스템

```tsx
// ErrorLogger.ts
interface ErrorLog {
  id: string;
  timestamp: Date;
  error: string;
  component: string;
  stack?: string;
  userAgent: string;
  url: string;
}

class ErrorLogger {
  private static logs: ErrorLog[] = [];

  static logError(error: Error, errorInfo: any, componentName: string) {
    const log: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      error: error.message,
      component: componentName,
      stack: errorInfo.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    this.logs.push(log);
    
    // 실제 프로덕션에서는 서버로 전송
    console.log('Error logged:', log);
    
    // 로컬 스토리지에 저장 (선택사항)
    this.saveToLocalStorage(log);
  }

  static getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  static clearLogs() {
    this.logs = [];
  }

  private static saveToLocalStorage(log: ErrorLog) {
    try {
      const existingLogs = JSON.parse(localStorage.getItem('errorLogs') || '[]');
      existingLogs.push(log);
      localStorage.setItem('errorLogs', JSON.stringify(existingLogs.slice(-100))); // 최근 100개만 유지
    } catch (e) {
      console.error('Failed to save error log to localStorage:', e);
    }
  }
}

export default ErrorLogger;
```

### 2. 에러 통계 컴포넌트

```tsx
// ErrorStats.tsx
import React from 'react';
import ErrorLogger from './ErrorLogger';

const ErrorStats: React.FC = () => {
  const logs = ErrorLogger.getLogs();
  
  const errorCountByComponent = logs.reduce((acc, log) => {
    acc[log.component] = (acc[log.component] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentErrors = logs.slice(-5); // 최근 5개 에러

  return (
    <div className="error-stats">
      <h3>Error Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <h4>Total Errors</h4>
          <p>{logs.length}</p>
        </div>
        
        <div className="stat-item">
          <h4>Components with Errors</h4>
          <p>{Object.keys(errorCountByComponent).length}</p>
        </div>
      </div>

      <div className="component-errors">
        <h4>Errors by Component</h4>
        {Object.entries(errorCountByComponent).map(([component, count]) => (
          <div key={component} className="component-error">
            <span>{component}:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      <div className="recent-errors">
        <h4>Recent Errors</h4>
        {recentErrors.map(log => (
          <div key={log.id} className="recent-error">
            <div className="error-header">
              <span className="component">{log.component}</span>
              <span className="timestamp">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="error-message">{log.error}</div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => ErrorLogger.clearLogs()}
        className="clear-logs-btn"
      >
        Clear Logs
      </button>
    </div>
  );
};

export default ErrorStats;
```

## 📋 모범 사례

### 1. Error Boundary 배치 전략

```tsx
// 전략 1: 페이지 레벨
function App() {
  return (
    <ErrorBoundary>
      <PageComponent />
    </ErrorBoundary>
  );
}

// 전략 2: 기능별 그룹
function Dashboard() {
  return (
    <div>
      <ErrorBoundary>
        <UserProfile />
      </ErrorBoundary>
      <ErrorBoundary>
        <Analytics />
      </ErrorBoundary>
      <ErrorBoundary>
        <Notifications />
      </ErrorBoundary>
    </div>
  );
}

// 전략 3: 중요도별
function CriticalApp() {
  return (
    <div>
      <CriticalFeature /> {/* Error Boundary 없음 - 크래시 허용 */}
      <ErrorBoundary>
        <NonCriticalFeature /> {/* Error Boundary 적용 */}
      </ErrorBoundary>
    </div>
  );
}
```

### 2. 에러 타입별 처리

```tsx
// ErrorBoundaryFactory.tsx
interface ErrorBoundaryConfig {
  type: 'critical' | 'non-critical' | 'experimental';
  fallback: ReactNode;
  retryCount: number;
  onError: (error: Error, errorInfo: any) => void;
}

const ErrorBoundaryFactory = {
  create(config: ErrorBoundaryConfig) {
    return class ConfigurableErrorBoundary extends Component<Props, State> {
      // 구현...
    };
  }
};

// 사용 예제
const CriticalErrorBoundary = ErrorBoundaryFactory.create({
  type: 'critical',
  fallback: <CriticalErrorUI />,
  retryCount: 1,
  onError: (error) => {
    // 즉시 알림 발송
    sendAlert(error);
  }
});

const NonCriticalErrorBoundary = ErrorBoundaryFactory.create({
  type: 'non-critical',
  fallback: <NonCriticalErrorUI />,
  retryCount: 3,
  onError: (error) => {
    // 로그만 기록
    logError(error);
  }
});
```

### 3. 비동기 에러 처리

```tsx
// AsyncErrorBoundary.tsx
import React, { useState, useEffect } from 'react';

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError: (error: Error) => void;
}

const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({
  children,
  fallback,
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setError(event.reason);
      setHasError(true);
      onError(event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      setError(event.error);
      setHasError(true);
      onError(event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [onError]);

  if (hasError) {
    return fallback;
  }

  return <>{children}</>;
};

export default AsyncErrorBoundary;
```

## 🎯 결론

### 패턴 적용의 필요성

Error Boundary & Retry/Reset 패턴은 현대적인 React 애플리케이션에서 필수적인 패턴입니다:

1. **사용자 경험 보호**: 앱 크래시로 인한 사용자 이탈 방지
2. **비즈니스 연속성**: 중요한 기능의 안정적 운영
3. **운영 효율성**: 에러 모니터링 및 빠른 문제 해결
4. **개발 효율성**: 디버깅 및 코드 품질 개선

### 구현 권장사항

1. **적절한 배치**: 중요도와 기능별로 Error Boundary 배치
2. **사용자 친화적 UI**: 명확하고 도움이 되는 에러 메시지
3. **복구 메커니즘**: 재시도 및 리셋 기능 제공
4. **에러 로깅**: 에러 정보 수집 및 모니터링 시스템 구축
5. **테스트**: 다양한 에러 시나리오 테스트

### 성공적인 적용을 위한 체크리스트

- [ ] Error Boundary 컴포넌트 구현
- [ ] 적절한 위치에 Error Boundary 배치
- [ ] 사용자 친화적 폴백 UI 설계
- [ ] 재시도 및 리셋 메커니즘 구현
- [ ] 에러 로깅 시스템 구축
- [ ] 에러 시나리오 테스트
- [ ] 모니터링 및 알림 시스템 설정

이 패턴을 올바르게 적용하면 React 애플리케이션의 안정성과 사용자 경험을 크게 향상시킬 수 있습니다.
