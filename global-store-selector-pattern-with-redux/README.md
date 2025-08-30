# Global Store + Selector Pattern with Redux

이 프로젝트는 React에서 글로벌 스토어 + 셀렉터(Selector) 패턴을 Redux를 사용하여 구현하는 방법을 보여줍니다.

## 패턴 설명

### 글로벌 스토어 + 셀렉터 패턴이란?

글로벌 스토어 + 셀렉터 패턴은 애플리케이션의 상태를 중앙화된 스토어에서 관리하고, 컴포넌트에서 필요한 데이터만 선택적으로 가져오는 패턴입니다.

**주요 특징:**
- **중앙화된 상태 관리**: 모든 애플리케이션 상태를 하나의 스토어에서 관리
- **셀렉터를 통한 데이터 접근**: 컴포넌트에서 필요한 데이터만 선택적으로 가져옴
- **성능 최적화**: 불필요한 리렌더링 방지
- **예측 가능한 상태 변화**: 액션을 통한 명확한 상태 변경

### Before vs After

#### Before (Props Drilling)
- 상태를 props로 계속 전달
- 컴포넌트 간 강한 결합
- 상태 변경 시 많은 컴포넌트가 리렌더링
- 코드 유지보수 어려움

#### After (Redux + Selectors)
- 중앙화된 스토어에서 상태 관리
- 셀렉터를 통한 효율적인 데이터 접근
- 필요한 컴포넌트만 리렌더링
- 명확한 상태 변경 흐름

## 프로젝트 구조

```
src/
├── components/
│   ├── before/          # Redux 사용 전 (Props Drilling)
│   └── after/           # Redux 사용 후 (Global Store + Selectors)
├── examples/
│   ├── before/          # Before 예제들
│   └── after/           # After 예제들
├── store/               # Redux 스토어 설정
│   ├── slices/          # Redux Toolkit slices
│   ├── selectors/       # 셀렉터 함수들
│   └── index.ts         # 스토어 설정
└── patterns/            # 고급 패턴 예제
```

## 실행 방법

```bash
npm start
```

## 주요 예제

1. **사용자 관리 시스템**: 사용자 정보, 권한, 설정 관리
2. **쇼핑 카트**: 상품 목록, 카트 상태, 주문 관리
3. **테마 시스템**: 다크/라이트 모드, 사용자 설정
4. **알림 시스템**: 전역 알림 상태 관리

## 학습 포인트

- Redux Toolkit의 사용법
- 셀렉터 패턴의 구현
- 성능 최적화 기법
- 상태 정규화
- 비동기 액션 처리
