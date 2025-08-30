# Controlled vs Uncontrolled Components

React에서 사용하는 두 가지 중요한 컴포넌트 패턴을 비교하고 학습할 수 있는 프로젝트입니다.

## 🎯 프로젝트 목적

이 프로젝트는 React의 **Controlled Components**와 **Uncontrolled Components** 패턴의 차이점을 실제 코드로 비교하여 학습할 수 있도록 만들어졌습니다.

## 📚 학습 내용

### Uncontrolled Components (Before)
- `useRef`를 사용한 DOM 직접 접근
- 폼 데이터가 React 상태로 관리되지 않음
- 제출 시에만 값을 가져옴
- 구현이 간단하지만 제어가 어려움

### Controlled Components (After)
- `useState`를 사용한 상태 관리
- 모든 입력 변경사항이 실시간으로 추적됨
- 실시간 유효성 검사 가능
- 완전한 상태 제어 가능

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

## 📁 프로젝트 구조

```
src/
├── patterns/              # 패턴별 컴포넌트 구현
│   ├── uncontrolled/      # Uncontrolled Components
│   │   ├── UncontrolledForm.tsx
│   │   ├── UncontrolledInput.tsx
│   │   └── UncontrolledSelect.tsx
│   └── controlled/        # Controlled Components
│       ├── ControlledForm.tsx
│       ├── ControlledInput.tsx
│       └── ControlledSelect.tsx
├── examples/              # 예제 컴포넌트들
│   ├── uncontrolled/      # Uncontrolled 예제들
│   │   ├── UncontrolledFormExample.tsx
│   │   ├── UncontrolledInputExample.tsx
│   │   └── UncontrolledSelectExample.tsx
│   └── controlled/        # Controlled 예제들
│       ├── ControlledFormExample.tsx
│       ├── ControlledInputExample.tsx
│       └── ControlledSelectExample.tsx
└── App.tsx               # 메인 애플리케이션
```

## 🎮 사용법

1. **Example Type** 버튼을 클릭하여 비교할 컴포넌트 유형을 선택하세요:
   - Form
   - Input
   - Select

2. **Pattern** 버튼을 클릭하여 패턴을 전환하세요:
   - Uncontrolled (Before)
   - Controlled (After)

3. 각 패턴의 특징과 동작을 비교해보세요.

## 🔍 주요 차이점

| 특징 | Uncontrolled | Controlled |
|------|-------------|------------|
| 상태 관리 | DOM에서 직접 접근 | React 상태로 관리 |
| 실시간 추적 | 불가능 | 가능 |
| 유효성 검사 | 어려움 | 쉬움 |
| 프로그래밍적 제어 | 어려움 | 쉬움 |
| 구현 복잡도 | 간단 | 복잡 |
| 성능 | 좋음 | 상대적으로 나쁨 |

## 💡 언제 어떤 패턴을 사용할까?

### Uncontrolled Components 사용 시기
- 간단한 폼
- 성능이 중요한 경우
- 기존 HTML 폼과 유사한 동작이 필요한 경우
- 제출 시에만 값이 필요한 경우

### Controlled Components 사용 시기
- 복잡한 폼 로직
- 실시간 유효성 검사가 필요한 경우
- 프로그래밍적으로 값을 제어해야 하는 경우
- 테스트가 중요한 경우

## 🛠️ 기술 스택

- React 18
- TypeScript
- CSS3
- Create React App

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.
