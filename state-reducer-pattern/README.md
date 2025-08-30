# State Reducer Pattern in React

이 프로젝트는 React에서 사용되는 **State Reducer 패턴**을 보여주는 예제 모음입니다. State Reducer 패턴은 컴포넌트의 상태 관리 로직을 외부에서 제어할 수 있게 해주는 강력한 패턴입니다.

## 🎯 State Reducer 패턴이란?

State Reducer 패턴은 컴포넌트가 `stateReducer` prop을 받아서 상태 변경 로직을 외부에서 주입받는 패턴입니다. 이를 통해:

- **동일한 컴포넌트**가 **다양한 동작**을 할 수 있습니다
- **코드 수정 없이** 컴포넌트의 동작을 커스터마이징할 수 있습니다
- **재사용성**과 **유연성**을 크게 향상시킵니다

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── before/          # State Reducer 패턴 적용 전
│   │   ├── Toggle.tsx
│   │   ├── Counter.tsx
│   │   └── Form.tsx
│   └── after/           # State Reducer 패턴 적용 후
│       ├── Toggle.tsx
│       ├── Counter.tsx
│       └── Form.tsx
├── examples/
│   ├── before/          # 패턴 적용 전 예제들
│   │   ├── ToggleExample.tsx
│   │   ├── CounterExample.tsx
│   │   └── FormExample.tsx
│   └── after/           # 패턴 적용 후 예제들
│       ├── ToggleExample.tsx
│       ├── CounterExample.tsx
│       └── FormExample.tsx
└── App.tsx              # 메인 애플리케이션
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

## 📖 예제 설명

### 1. Toggle 컴포넌트

#### Before (패턴 적용 전)
```tsx
// 하드코딩된 동작만 가능
<Toggle onToggle={handleToggle}>
  {({ on, toggle }) => (
    <button onClick={toggle}>
      {on ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>
```

#### After (패턴 적용 후)
```tsx
// 다양한 커스텀 동작 가능
const limitedToggleReducer = (state, action) => {
  if (action.type === 'TOGGLE' && state.toggleCount >= 3) {
    return state; // 3번만 토글 가능
  }
  // ... 커스텀 로직
};

<Toggle 
  onToggle={handleToggle}
  stateReducer={limitedToggleReducer}
>
  {({ on, toggle }) => (
    <button onClick={toggle}>
      {on ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>
```

**예제 동작들:**
- **Limited Toggle**: 3번만 토글 가능
- **Delayed Toggle**: 1초 쿨다운
- **Time Restricted Toggle**: 업무시간(9AM-5PM)에만 동작

### 2. Counter 컴포넌트

#### Before (패턴 적용 전)
```tsx
// 항상 1씩 증가/감소
<Counter initialCount={0}>
  {({ count, increment, decrement }) => (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
</Counter>
```

#### After (패턴 적용 후)
```tsx
// 다양한 커스텀 동작 가능
const doubleIncrementReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 2 }; // 2씩 증가
    // ... 다른 로직들
  }
};

<Counter 
  initialCount={0}
  stateReducer={doubleIncrementReducer}
>
  {({ count, increment, decrement }) => (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
</Counter>
```

**예제 동작들:**
- **Double Increment**: 2씩 증가
- **Even Only**: 짝수만 허용
- **Logging Counter**: 모든 액션 로깅
- **Step Counter**: 단계별 히스토리 추적

### 3. Form 컴포넌트

#### Before (패턴 적용 전)
```tsx
// 기본 폼 동작만
<Form onSubmit={handleSubmit}>
  {({ values, setValue }) => (
    <input
      value={values.name}
      onChange={(e) => setValue('name', e.target.value)}
    />
  )}
</Form>
```

#### After (패턴 적용 후)
```tsx
// 다양한 커스텀 동작 가능
const autoCapitalizeReducer = (state, action) => {
  if (action.type === 'SET_VALUE' && action.field === 'name') {
    return {
      ...state,
      values: {
        ...state.values,
        [action.field]: action.payload?.toUpperCase() || '',
      },
    };
  }
  // ... 다른 로직들
};

<Form 
  onSubmit={handleSubmit}
  stateReducer={autoCapitalizeReducer}
>
  {({ values, setValue }) => (
    <input
      value={values.name}
      onChange={(e) => setValue('name', e.target.value)}
    />
  )}
</Form>
```

**예제 동작들:**
- **Auto Capitalize**: 이름 자동 대문자 변환
- **Validation Form**: 실시간 유효성 검사
- **Character Limit**: 글자 수 제한

## 🔧 State Reducer 패턴의 핵심

### 1. 기본 구조
```tsx
interface ComponentProps {
  stateReducer?: (state: State, action: Action) => State;
  // ... 다른 props
}
```

### 2. Reducer 함수
```tsx
const customReducer = (state: State, action: Action): State => {
  // 커스텀 로직
  switch (action.type) {
    case 'SOME_ACTION':
      return { ...state, /* 커스텀 변경사항 */ };
    default:
      return state; // 변경하지 않음
  }
};
```

### 3. 컴포넌트 내부
```tsx
const dispatch = useCallback((action: Action) => {
  const newState = stateReducer(state, action);
  setState(newState);
}, [state, stateReducer]);
```

## 💡 장점

1. **유연성**: 동일한 컴포넌트로 다양한 동작 구현
2. **재사용성**: 코드 수정 없이 다른 컨텍스트에서 사용
3. **테스트 용이성**: 상태 로직을 독립적으로 테스트
4. **조합 가능성**: 여러 reducer를 조합하여 사용
5. **제어 역전**: 부모 컴포넌트가 자식 동작 제어

## 🎨 사용 사례

- **폼 유효성 검사**: 다양한 검증 규칙 적용
- **카운터 동작**: 증가량, 제한, 히스토리 등 커스터마이징
- **토글 동작**: 제한, 지연, 시간 제약 등
- **리스트 필터링**: 다양한 필터링 로직
- **모달 동작**: 열기/닫기 조건 커스터마이징

## 📚 추가 학습 자료

- [Kent C. Dodds - State Reducer Pattern](https://kentcdodds.com/blog/the-state-reducer-pattern)
- [React Patterns](https://reactpatterns.com/)
- [Advanced React Patterns](https://advanced-react-patterns.vercel.app/)

## 🤝 기여하기

이 프로젝트에 기여하고 싶으시다면:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
