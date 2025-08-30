# Custom Hooks로 로직 캡슐화

React에서 Custom Hooks를 사용하여 로직을 캡슐화하는 패턴을 보여주는 프로젝트입니다.

## 🎯 목표

이 프로젝트는 Custom Hooks를 사용하기 전과 후의 코드를 비교하여 다음을 보여줍니다:

- **로직 재사용성 향상**
- **컴포넌트 간 관심사 분리**
- **테스트 용이성**
- **코드 가독성 향상**
- **상태 관리 단순화**

## 📁 프로젝트 구조

```
src/
├── hooks/                    # Custom Hooks
│   ├── useCounter.ts        # 카운터 로직
│   ├── useForm.ts           # 폼 로직
│   ├── useApi.ts            # API 호출 로직
│   ├── useLocalStorage.ts   # LocalStorage 로직
│   └── useWindowSize.ts     # 윈도우 크기 감지 로직
├── components/
│   ├── before/              # Custom Hook 사용 전
│   │   ├── Counter.tsx
│   │   └── Form.tsx
│   └── after/               # Custom Hook 사용 후
│       ├── Counter.tsx
│       └── Form.tsx
├── examples/                # 예제 컴포넌트들
│   ├── before/              # Before 예제들
│   │   ├── CounterExample.tsx
│   │   ├── FormExample.tsx
│   │   ├── ApiExample.tsx
│   │   ├── LocalStorageExample.tsx
│   │   └── WindowSizeExample.tsx
│   └── after/               # After 예제들
│       ├── CounterExample.tsx
│       ├── FormExample.tsx
│       ├── ApiExample.tsx
│       ├── LocalStorageExample.tsx
│       └── WindowSizeExample.tsx
└── App.tsx                  # 메인 앱 컴포넌트
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

### 사용 방법

1. **메인 페이지**에서 "Before" 또는 "After" 패턴을 선택하세요.
2. **원하는 예제**를 클릭하여 해당 패턴의 구현을 확인하세요.
3. **Before**: Custom Hook을 사용하지 않은 원본 구현
4. **After**: Custom Hook을 사용한 개선된 구현
5. 실제로 동작하는 인터랙티브한 예제들을 통해 차이점을 직접 체험해보세요!

## 📚 예제들

### 1. Counter 예제
- **Before**: 각 컴포넌트마다 중복되는 카운터 로직
- **After**: `useCounter` Hook으로 로직 캡슐화

### 2. Form 예제
- **Before**: 복잡한 폼 로직과 유효성 검사가 컴포넌트에 결합
- **After**: `useForm` Hook으로 폼 로직과 유효성 검사 분리

### 3. API 호출 예제
- **Before**: 각 컴포넌트마다 중복되는 API 호출 로직
- **After**: `useApi` Hook으로 API 호출 로직 캡슐화

### 4. LocalStorage 예제
- **Before**: 각 컴포넌트마다 중복되는 LocalStorage 로직
- **After**: `useLocalStorage` Hook으로 LocalStorage 로직 캡슐화

### 5. Window 크기 감지 예제
- **Before**: 각 컴포넌트마다 중복되는 윈도우 크기 감지 로직
- **After**: `useWindowSize` Hook으로 윈도우 크기 감지 로직 캡슐화

## 🛠️ Custom Hooks

### useCounter
```typescript
const { count, increment, decrement, reset } = useCounter(initialValue);
```

### useForm
```typescript
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  resetForm
} = useForm(initialValues, validationSchema);
```

### useApi
```typescript
const { data, loading, error, refetch } = useApi(apiCall);
```

### useLocalStorage
```typescript
const [value, setValue] = useLocalStorage(key, initialValue);
```

### useWindowSize
```typescript
const { width, height, isMobile, isTablet, isDesktop } = useWindowSize();
```

## 🎨 주요 특징

- **Before/After 패턴 분리**: 각 예제가 Before와 After로 완전히 분리되어 구현
- **패턴 선택 UI**: Before/After 패턴을 쉽게 전환할 수 있는 직관적인 인터페이스
- **실시간 데모**: 모든 예제가 실제로 동작하는 인터랙티브한 데모
- **코드 비교**: Before/After 코드를 명확히 비교하여 차이점을 표시
- **반응형 디자인**: 모바일, 태블릿, 데스크톱에서 모두 잘 작동
- **TypeScript**: 완전한 타입 안전성 제공

## 📖 학습 포인트

1. **로직 재사용**: Custom Hook을 사용하면 동일한 로직을 여러 컴포넌트에서 쉽게 재사용할 수 있습니다.

2. **관심사 분리**: 비즈니스 로직과 UI 로직을 분리하여 코드의 가독성과 유지보수성을 향상시킵니다.

3. **테스트 용이성**: Custom Hook은 독립적으로 테스트할 수 있어 테스트 작성이 쉬워집니다.

4. **코드 중복 제거**: 동일한 로직이 여러 컴포넌트에 중복되는 것을 방지합니다.

5. **일관성**: 동일한 로직을 사용하는 모든 컴포넌트에서 일관된 동작을 보장합니다.

## 🔧 기술 스택

- **React 18**
- **TypeScript**
- **React Router DOM**
- **CSS3** (Grid, Flexbox, Custom Properties)

## 📝 라이선스

MIT License
