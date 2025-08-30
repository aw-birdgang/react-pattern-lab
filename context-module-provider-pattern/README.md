# React Context Module / Provider Pattern

이 프로젝트는 React에서 Context Module / Provider 패턴을 사용하기 전과 후를 비교하여 보여주는 데모 애플리케이션입니다.

## 📖 상세 분석 문서

**[CONTEXT_MODULE_PATTERN_ANALYSIS.md](./CONTEXT_MODULE_PATTERN_ANALYSIS.md)** - 패턴의 상세한 분석과 예제를 확인하세요!

## 🎯 목적

Context Module / Provider 패턴의 장점을 실제 코드를 통해 비교하고 학습할 수 있도록 구성되었습니다.

## 📁 프로젝트 구조

```
src/
├── patterns/                    # 패턴별 완전히 독립적인 구현
│   ├── props-drilling/         # Props Drilling 패턴 (Before)
│   │   ├── types.ts           # 타입 정의
│   │   ├── UserProfile.tsx    # 사용자 프로필 컴포넌트
│   │   ├── ThemeToggle.tsx    # 테마 토글 컴포넌트
│   │   ├── Header.tsx         # 헤더 컴포넌트
│   │   └── PropsDrillingApp.tsx # 메인 앱 컴포넌트
│   ├── context-module/        # Context Module 패턴 (After)
│   │   ├── UserContext.tsx    # 사용자 상태 관리 Context
│   │   ├── ThemeContext.tsx   # 테마 상태 관리 Context
│   │   ├── UserProfile.tsx    # 사용자 프로필 컴포넌트
│   │   ├── ThemeToggle.tsx    # 테마 토글 컴포넌트
│   │   ├── Header.tsx         # 헤더 컴포넌트
│   │   └── ContextModuleApp.tsx # 메인 앱 컴포넌트
│   ├── shopping-cart-context/ # 쇼핑 카트 Context Module
│   │   ├── types.ts           # 타입 정의
│   │   ├── CartContext.tsx    # 카트 상태 관리 Context
│   │   ├── ProductCard.tsx    # 상품 카드 컴포넌트
│   │   ├── CartSidebar.tsx    # 카트 사이드바 컴포넌트
│   │   └── ShoppingCartApp.tsx # 메인 앱 컴포넌트
│   └── form-management-context/ # 폼 관리 Context Module
│       ├── types.ts           # 타입 정의
│       ├── FormContext.tsx    # 폼 상태 관리 Context
│       ├── FormField.tsx      # 폼 필드 컴포넌트
│       └── FormManagementApp.tsx # 메인 앱 컴포넌트
│   └── advanced-context-example/ # 고급 Context Module 예제
│       ├── NotificationContext.tsx # 알림 시스템 Context
│       ├── NotificationToast.tsx # 알림 토스트 컴포넌트
│       ├── NotificationContainer.tsx # 알림 컨테이너
│       └── AdvancedContextExample.tsx # 고급 예제 앱
├── contexts/                   # 기존 Context (참고용)
├── components/                 # 기존 컴포넌트 (참고용)
├── examples/                   # 기존 예제 (참고용)
└── App.tsx                    # 메인 앱 컴포넌트
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

## 📚 패턴 설명

### 🔗 Props Drilling Pattern (Before)

Context를 사용하지 않는 전통적인 방식:

```tsx
// 부모 컴포넌트에서 모든 상태 관리
const [user, setUser] = useState<User>({...});
const [theme, setTheme] = useState<Theme>('light');

// 자식 컴포넌트에 props로 전달
<UserProfile 
  user={user}
  onLogin={handleLogin}
  onLogout={handleLogout}
  onUpdateProfile={handleUpdateProfile}
/>
```

**문제점:**
- Props drilling: 상태를 여러 레벨의 컴포넌트를 거쳐 전달
- 컴포넌트 간 강한 결합
- 재사용성 저하
- 유지보수 어려움
- 코드 복잡성 증가

### 🎯 Context Module Pattern (After)

Context Module을 사용한 개선된 방식:

```tsx
// Context Module 정의
export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialState);
  
  const value = {
    user,
    login,
    logout,
    updateProfile,
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 컴포넌트에서 직접 사용
export function UserProfile() {
  const { user, login, logout, updateProfile } = useUser();
  // ...
}
```

**장점:**
- Props drilling 해결
- 컴포넌트 간 느슨한 결합
- 재사용성 향상
- 유지보수 용이
- 타입 안전성 보장
- 코드 가독성 향상

### 🛍️ Shopping Cart Context Module

복잡한 상태 로직을 관리하는 쇼핑 카트 예제:

```tsx
// 복잡한 카트 상태 관리
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

// 다양한 액션 타입
type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' };

// 컴포넌트에서 사용
function ProductCard({ product }) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  // ...
}
```

**특징:**
- 복잡한 상태 로직을 useReducer로 관리
- 전역 카트 상태를 모든 컴포넌트에서 접근
- 실시간 가격 계산 및 수량 관리
- 사이드바 형태의 카트 UI

### 📝 Form Management Context Module

폼 상태와 유효성 검사를 관리하는 예제:

```tsx
// 폼 상태 관리
interface FormState {
  fields: Record<string, FormField>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  submitCount: number;
}

// 동적 필드 관리
function FormField({ name, label, validation }) {
  const { getFieldValue, setFieldValue, getFieldError } = useForm();
  // ...
}

// 폼 제출 처리
const handleSubmit = (onSubmit) => (e) => {
  e.preventDefault();
  if (validateForm()) {
    // 폼 제출 로직
  }
};
```

**특징:**
- 동적 폼 필드 생성 및 관리
- 실시간 유효성 검사
- 폼 상태 추적 (dirty, valid, submitting)
- 재사용 가능한 FormField 컴포넌트

## 🛠️ 주요 기능

### 1. 사용자 관리
- 로그인/로그아웃
- 프로필 정보 수정
- 사용자 상태 전역 관리

### 2. 테마 관리
- 라이트/다크 모드 전환
- 테마별 스타일 자동 적용
- 테마 상태 전역 관리

### 3. 쇼핑 카트 관리
- 상품 추가/제거
- 수량 변경
- 실시간 가격 계산
- 카트 사이드바 UI

### 4. 폼 관리
- 동적 폼 필드 생성
- 실시간 유효성 검사
- 폼 상태 추적
- 제출 처리

### 5. 실시간 비교
- 4가지 패턴을 탭으로 즉시 비교 가능
- 동일한 기능을 다른 패턴으로 구현
- 상세한 패턴 분석 및 비교

## 🎨 사용된 기술

- **React 18** - 최신 React 기능 활용
- **TypeScript** - 타입 안전성 보장
- **Context API** - 전역 상태 관리
- **useReducer** - 복잡한 상태 로직 관리
- **Custom Hooks** - 재사용 가능한 로직 분리

## 📖 학습 포인트

### 1. Props Drilling Pattern
- 상태를 props로 전달하는 방식
- 컴포넌트 간 강한 결합의 문제점
- Props drilling의 한계

### 2. Context Module Pattern
- Context 생성 및 Provider 구현
- Custom Hook을 통한 상태 접근
- 타입 안전성 보장
- 컴포넌트 간 느슨한 결합

### 3. Shopping Cart Context Module
- 복잡한 상태 로직 관리
- useReducer를 통한 액션 기반 상태 변경
- 전역 상태의 효율적인 관리
- 실시간 계산 및 UI 업데이트

### 4. Form Management Context Module
- 동적 폼 상태 관리
- 실시간 유효성 검사
- 폼 필드의 재사용성
- 복잡한 폼 로직의 중앙화

### 5. 패턴 비교
- 각 패턴의 장단점 비교
- 실제 사용 사례 분석
- 성능 및 유지보수성 고려사항

## 🔧 패턴별 독립성

각 패턴은 완전히 독립적으로 구현되어 있어:

1. **독립적인 타입 정의**: 각 패턴마다 별도의 타입 파일
2. **독립적인 컴포넌트**: 동일한 기능을 다른 방식으로 구현
3. **독립적인 상태 관리**: 각 패턴에 맞는 상태 관리 방식
4. **독립적인 앱 구조**: 완전히 분리된 앱 컴포넌트

## 📊 패턴 비교표

| 구분 | Props Drilling | Context Module | Shopping Cart | Form Management |
|------|----------------|----------------|---------------|-----------------|
| 상태 전달 | Props로 수동 전달 | Context로 자동 접근 | Context로 자동 접근 | Context로 자동 접근 |
| 컴포넌트 결합도 | 높음 (강한 결합) | 낮음 (느슨한 결합) | 낮음 (느슨한 결합) | 낮음 (느슨한 결합) |
| 재사용성 | 낮음 | 높음 | 높음 | 높음 |
| 유지보수성 | 어려움 | 쉬움 | 쉬움 | 쉬움 |
| 코드 복잡성 | 높음 | 낮음 | 중간 | 중간 |
| 타입 안전성 | 부분적 | 완전 | 완전 | 완전 |
| 상태 로직 복잡도 | 낮음 | 낮음 | 높음 | 높음 |
| 실시간 계산 | 어려움 | 쉬움 | 쉬움 | 쉬움 |

## 🔧 커스터마이징

### 새로운 패턴 추가

1. `src/patterns/` 디렉토리에 새 패턴 폴더 생성
2. 패턴별 독립적인 파일들 구현
3. 메인 App.tsx에 새 패턴 추가

### 기존 패턴 수정

각 패턴은 완전히 독립적이므로 다른 패턴에 영향을 주지 않고 수정 가능

## 📝 라이선스

MIT License

## 🤝 기여

이슈나 풀 리퀘스트를 통해 기여해주세요!
