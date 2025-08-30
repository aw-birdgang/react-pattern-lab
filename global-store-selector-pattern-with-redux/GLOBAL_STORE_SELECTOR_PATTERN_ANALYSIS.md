# 글로벌 스토어 + 셀렉터 패턴 (Redux) 분석

## 목차
1. [패턴 개요](#패턴-개요)
2. [프로젝트 구조 분석](#프로젝트-구조-분석)
3. [Before vs After 비교](#before-vs-after-비교)
4. [패턴 적용 이유](#패턴-적용-이유)
5. [구현 예제](#구현-예제)
6. [성능 최적화](#성능-최적화)
7. [실제 사용 사례](#실제-사용-사례)
8. [결론](#결론)

## 패턴 개요

### 글로벌 스토어 + 셀렉터 패턴이란?

글로벌 스토어 + 셀렉터 패턴은 애플리케이션의 상태를 중앙화된 스토어에서 관리하고, 컴포넌트에서 필요한 데이터만 선택적으로 가져오는 패턴입니다.

**핵심 개념:**
- **중앙화된 상태 관리**: 모든 애플리케이션 상태를 하나의 스토어에서 관리
- **셀렉터를 통한 데이터 접근**: 컴포넌트에서 필요한 데이터만 선택적으로 가져옴
- **성능 최적화**: 불필요한 리렌더링 방지
- **예측 가능한 상태 변화**: 액션을 통한 명확한 상태 변경

## 프로젝트 구조 분석

```
global-store-selector-pattern-with-redux/
├── src/
│   ├── store/                    # Redux 스토어 설정
│   │   ├── slices/              # Redux Toolkit slices
│   │   │   ├── userSlice.ts     # 사용자 관리
│   │   │   ├── cartSlice.ts     # 쇼핑 카트
│   │   │   ├── themeSlice.ts    # 테마 시스템
│   │   │   └── notificationSlice.ts # 알림 시스템
│   │   ├── selectors/           # 셀렉터 함수들
│   │   │   ├── userSelectors.ts
│   │   │   ├── cartSelectors.ts
│   │   │   ├── themeSelectors.ts
│   │   │   └── notificationSelectors.ts
│   │   ├── index.ts             # 스토어 설정
│   │   └── hooks.ts             # 타입 안전한 훅들
│   ├── components/
│   │   ├── before/              # Props Drilling 패턴
│   │   └── after/               # Redux + Selectors 패턴
│   ├── examples/
│   │   ├── before/              # Before 예제
│   │   └── after/               # After 예제
│   └── patterns/                # 고급 패턴 예제
```

### 스토어 구조

```typescript
// store/index.ts
export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    theme: themeReducer,
    notification: notificationReducer,
  },
});
```

## Before vs After 비교

### Before (Props Drilling 패턴)

#### 문제점
1. **Props 전달의 복잡성**
   ```typescript
   // BeforeExample.tsx
   const [user, setUser] = useState<User | null>({...});
   const [theme, setTheme] = useState<'light' | 'dark'>('light');
   const [cartItems, setCartItems] = useState<CartItem[]>([]);
   const [cartTotal, setCartTotal] = useState(0);
   const [cartItemCount, setCartItemCount] = useState(0);
   const [cartIsOpen, setCartIsOpen] = useState(false);
   const [unreadNotifications, setUnreadNotifications] = useState(3);
   ```

2. **복잡한 핸들러 전달**
   ```typescript
   // BeforeExample.tsx
   <Header
     user={user}
     theme={theme}
     onToggleTheme={handleToggleTheme}
     onLogout={handleLogout}
     unreadNotifications={unreadNotifications}
   />
   
   <UserProfile
     user={user}
     onUpdatePreferences={handleUpdateUserPreferences}
     onLogout={handleLogout}
   />
   
   <ShoppingCart
     items={cartItems}
     total={cartTotal}
     itemCount={cartItemCount}
     isOpen={cartIsOpen}
     onToggleCart={handleToggleCart}
     onUpdateQuantity={handleUpdateQuantity}
     onRemoveItem={handleRemoveItem}
     onClearCart={handleClearCart}
   />
   ```

3. **수동 계산의 필요성**
   ```typescript
   // BeforeExample.tsx
   React.useEffect(() => {
     const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
     const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
     setCartTotal(total);
     setCartItemCount(count);
   }, [cartItems]);
   ```

#### Before 패턴의 문제점
- **Props 전달의 복잡성**: 상태를 여러 레벨의 컴포넌트를 거쳐 전달해야 함
- **컴포넌트 간 강한 결합**: 부모 컴포넌트가 자식의 모든 상태를 알아야 함
- **불필요한 리렌더링**: 상태 변경 시 많은 컴포넌트가 리렌더링됨
- **코드 유지보수 어려움**: 상태 구조 변경 시 모든 props를 수정해야 함
- **타입 안전성 부족**: props 타입이 명확하지 않을 수 있음

### After (Redux + Selectors 패턴)

#### 해결책
1. **중앙화된 상태 관리**
   ```typescript
   // store/slices/userSlice.ts
   const userSlice = createSlice({
     name: 'user',
     initialState,
     reducers: {
       setCurrentUser: (state, action: PayloadAction<User>) => {
         state.currentUser = action.payload;
       },
       updateUserPreferences: (state, action: PayloadAction<Partial<User['preferences']>>) => {
         if (state.currentUser) {
           state.currentUser.preferences = {
             ...state.currentUser.preferences,
             ...action.payload,
           };
         }
       },
       // ... 기타 액션들
     },
   });
   ```

2. **셀렉터를 통한 효율적인 데이터 접근**
   ```typescript
   // store/selectors/userSelectors.ts
   export const selectCurrentUser = (state: RootState) => state.user.currentUser;
   export const selectIsLoggedIn = createSelector(
     [selectCurrentUser],
     (currentUser) => currentUser !== null
   );
   export const selectUserRole = createSelector(
     [selectCurrentUser],
     (currentUser) => currentUser?.role || 'guest'
   );
   ```

3. **간단한 컴포넌트 구조**
   ```typescript
   // components/after/Header.tsx
   const Header: React.FC = () => {
     const dispatch = useAppDispatch();
     const currentUser = useAppSelector(selectCurrentUser);
     const isLoggedIn = useAppSelector(selectIsLoggedIn);
     const themeMode = useAppSelector(selectThemeMode);
     const unreadCount = useAppSelector(selectUnreadCount);

     const handleToggleTheme = () => {
       dispatch(toggleTheme());
     };

     const handleLogout = () => {
       dispatch(logout());
     };

     return (
       <header>
         {/* JSX */}
       </header>
     );
   };
   ```

## 패턴 적용 이유

### 1. 상태 관리의 복잡성 해결

**Before (Props Drilling)**
```typescript
// 상태가 여러 컴포넌트에 분산됨
const [user, setUser] = useState<User | null>(null);
const [theme, setTheme] = useState<'light' | 'dark'>('light');
const [cartItems, setCartItems] = useState<CartItem[]>([]);
// ... 더 많은 상태들

// 각 상태를 개별적으로 관리해야 함
const handleUpdateUser = (updates: Partial<User>) => {
  setUser(prev => prev ? { ...prev, ...updates } : null);
};

const handleAddToCart = (product: Product) => {
  setCartItems(prev => {
    const existingItem = prev.find(item => item.product.id === product.id);
    if (existingItem) {
      return prev.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...prev, { product, quantity: 1 }];
  });
};
```

**After (Redux + Selectors)**
```typescript
// 중앙화된 상태 관리
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserPreferences: (state, action) => {
      if (state.currentUser) {
        state.currentUser.preferences = {
          ...state.currentUser.preferences,
          ...action.payload,
        };
      }
    },
  },
});

// 액션을 통한 명확한 상태 변경
const handleUpdateUser = (updates: Partial<User>) => {
  dispatch(updateUser(updates));
};

const handleAddToCart = (product: Product) => {
  dispatch(addToCart(product));
};
```

### 2. 성능 최적화

**Before (Props Drilling)**
```typescript
// 모든 상태 변경 시 관련 없는 컴포넌트도 리렌더링
const [cartItems, setCartItems] = useState<CartItem[]>([]);
const [cartTotal, setCartTotal] = useState(0);
const [cartItemCount, setCartItemCount] = useState(0);

// 상태 변경 시 모든 계산을 다시 수행
React.useEffect(() => {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  setCartTotal(total);
  setCartItemCount(count);
}, [cartItems]);
```

**After (Redux + Selectors)**
```typescript
// 메모이제이션된 셀렉터로 성능 최적화
export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

// 컴포넌트에서 필요한 데이터만 선택적으로 가져옴
const cartTotal = useAppSelector(selectCartTotal);
const cartItemCount = useAppSelector(selectCartItemCount);
```

### 3. 타입 안전성 확보

**Before (Props Drilling)**
```typescript
// props 타입이 명확하지 않을 수 있음
interface HeaderProps {
  user: User | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
  unreadNotifications: number;
  // 새로운 기능 추가 시 props가 계속 늘어남
}
```

**After (Redux + Selectors)**
```typescript
// 타입 안전한 커스텀 훅
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// 컴포넌트에서 타입 안전하게 사용
const currentUser = useAppSelector(selectCurrentUser); // User | null
const isLoggedIn = useAppSelector(selectIsLoggedIn);   // boolean
const themeMode = useAppSelector(selectThemeMode);     // 'light' | 'dark'
```

## 구현 예제

### 1. 기본 셀렉터

```typescript
// store/selectors/userSelectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// 기본 셀렉터들
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUsers = (state: RootState) => state.user.users;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// 파생된 셀렉터들
export const selectIsLoggedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser !== null
);

export const selectUserRole = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.role || 'guest'
);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'admin'
);
```

### 2. 복합 셀렉터

```typescript
// store/selectors/cartSelectors.ts
export const selectCartSummary = createSelector(
  [
    selectCartItemsCount,
    selectCartTotalQuantity,
    selectCartTotalPrice,
    selectCartDiscount,
    selectShippingCost,
    selectCartFinalPrice,
  ],
  (itemCount, totalQuantity, subtotal, discount, shipping, finalPrice) => ({
    itemCount,
    totalQuantity,
    subtotal,
    discount,
    shipping,
    finalPrice,
    subtotalFormatted: `$${subtotal.toFixed(2)}`,
    discountFormatted: `$${discount.toFixed(2)}`,
    shippingFormatted: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
    finalPriceFormatted: `$${finalPrice.toFixed(2)}`,
  })
);
```

### 3. 매개변수가 있는 셀렉터

```typescript
// store/selectors/userSelectors.ts
export const selectUsersByRole = createSelector(
  [selectUsers, (state: RootState, role: User['role']) => role],
  (users, role) => users.filter(user => user.role === role)
);

export const selectUserById = createSelector(
  [selectUsers, (state: RootState, userId: string) => userId],
  (users, userId) => users.find(user => user.id === userId)
);

// 사용법
const adminUsers = useAppSelector(state => selectUsersByRole(state, 'admin'));
const specificUser = useAppSelector(state => selectUserById(state, 'user-id'));
```

### 4. 조건부 셀렉터

```typescript
// store/selectors/cartSelectors.ts
export const selectShippingCost = createSelector(
  [selectCartTotalPrice, (state: RootState, freeShippingThreshold: number = 50) => freeShippingThreshold],
  (total, threshold) => total >= threshold ? 0 : 10
);

export const selectCartItemsByPriceRange = createSelector(
  [selectCartItems, (state: RootState, minPrice: number, maxPrice: number) => ({ minPrice, maxPrice })],
  (items, { minPrice, maxPrice }) => 
    items.filter(item => 
      item.product.price >= minPrice && item.product.price <= maxPrice
    )
);
```

### 5. 정규화된 셀렉터

```typescript
// store/selectors/notificationSelectors.ts
export const selectNotificationsGroupedByDate = createSelector(
  [selectNotifications],
  (notifications) => {
    const grouped = notifications.reduce((acc, notification) => {
      const date = new Date(notification.timestamp);
      const dateKey = date.toDateString();
      
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(notification);
      return acc;
    }, {} as Record<string, Notification[]>);
    
    return grouped;
  }
);
```

## 성능 최적화

### 1. 메모이제이션

```typescript
// createSelector는 자동으로 메모이제이션을 수행
export const selectExpensiveCalculation = createSelector(
  [selectCartItems, selectUserPreferences],
  (items, preferences) => {
    // 복잡한 계산이지만 입력이 변경되지 않으면 재계산하지 않음
    return items.reduce((result, item) => {
      // ... 복잡한 계산 로직
      return result;
    }, 0);
  }
);
```

### 2. 선택적 구독

```typescript
// 컴포넌트에서 필요한 데이터만 구독
const CartSummary: React.FC = () => {
  // 전체 카트 상태 대신 필요한 데이터만 선택
  const cartSummary = useAppSelector(selectCartSummary);
  const isCartEmpty = useAppSelector(selectIsCartEmpty);
  
  // 카트 아이템이 변경되어도 이 컴포넌트는 리렌더링되지 않음
  // (cartSummary가 메모이제이션되어 있기 때문)
  
  return (
    <div>
      <p>총 {cartSummary.itemCount}개 상품</p>
      <p>총 금액: {cartSummary.finalPriceFormatted}</p>
    </div>
  );
};
```

### 3. 정규화된 상태 구조

```typescript
// 비정규화된 상태 (비효율적)
const state = {
  users: [
    { id: '1', name: 'John', posts: [{ id: '1', title: 'Post 1' }, { id: '2', title: 'Post 2' }] },
    { id: '2', name: 'Jane', posts: [{ id: '3', title: 'Post 3' }] }
  ]
};

// 정규화된 상태 (효율적)
const state = {
  users: {
    '1': { id: '1', name: 'John' },
    '2': { id: '2', name: 'Jane' }
  },
  posts: {
    '1': { id: '1', title: 'Post 1', authorId: '1' },
    '2': { id: '2', title: 'Post 2', authorId: '1' },
    '3': { id: '3', title: 'Post 3', authorId: '2' }
  },
  userPosts: {
    '1': ['1', '2'],
    '2': ['3']
  }
};
```

## 실제 사용 사례

### 1. 쇼핑 카트 시스템

```typescript
// 카트 관련 셀렉터들
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => state.cart.itemCount;

// 파생된 셀렉터들
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

export const selectCartTotalPriceFormatted = createSelector(
  [selectCartTotalPrice],
  (total) => `$${total.toFixed(2)}`
);

// 컴포넌트에서 사용
const CartIcon: React.FC = () => {
  const itemCount = useAppSelector(selectCartItemCount);
  const isCartEmpty = useAppSelector(selectIsCartEmpty);
  
  return (
    <div className="cart-icon">
      <span className="cart-count">{itemCount}</span>
      {isCartEmpty && <span className="empty-indicator">카트가 비어있습니다</span>}
    </div>
  );
};
```

### 2. 사용자 권한 시스템

```typescript
// 권한 관련 셀렉터들
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserRole = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser?.role || 'guest'
);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'admin'
);

export const selectCanEditPost = createSelector(
  [selectCurrentUser, (state: RootState, postAuthorId: string) => postAuthorId],
  (currentUser, postAuthorId) => {
    if (!currentUser) return false;
    if (currentUser.role === 'admin') return true;
    return currentUser.id === postAuthorId;
  }
);

// 컴포넌트에서 사용
const PostActions: React.FC<{ postAuthorId: string }> = ({ postAuthorId }) => {
  const canEdit = useAppSelector(state => selectCanEditPost(state, postAuthorId));
  const isAdmin = useAppSelector(selectIsAdmin);
  
  return (
    <div className="post-actions">
      {canEdit && <button>편집</button>}
      {isAdmin && <button>삭제</button>}
    </div>
  );
};
```

### 3. 테마 시스템

```typescript
// 테마 관련 셀렉터들
export const selectThemeMode = (state: RootState) => state.theme.mode;
export const selectThemeColors = (state: RootState) => state.theme.colors;

export const selectIsDarkMode = createSelector(
  [selectThemeMode],
  (mode) => mode === 'dark'
);

export const selectThemeCSSVariables = createSelector(
  [selectThemeColors],
  (colors) => ({
    '--color-primary': colors.primary,
    '--color-secondary': colors.secondary,
    '--color-background': colors.background,
    '--color-text': colors.text,
    // ... 기타 CSS 변수들
  })
);

// 컴포넌트에서 사용
const ThemeProvider: React.FC = () => {
  const cssVariables = useAppSelector(selectThemeCSSVariables);
  const isDarkMode = useAppSelector(selectIsDarkMode);
  
  React.useEffect(() => {
    Object.entries(cssVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [cssVariables]);
  
  return null;
};
```

## 결론

### 글로벌 스토어 + 셀렉터 패턴의 장점

1. **중앙화된 상태 관리**
   - 모든 상태가 하나의 스토어에서 관리됨
   - 상태 변경의 추적과 디버깅이 용이함

2. **성능 최적화**
   - 메모이제이션을 통한 불필요한 재계산 방지
   - 필요한 컴포넌트만 리렌더링

3. **타입 안전성**
   - TypeScript와 완벽한 통합
   - 컴파일 타임에 타입 오류 감지

4. **코드 유지보수성**
   - 명확한 구조와 분리된 관심사
   - 테스트하기 쉬운 구조

5. **개발자 경험**
   - Redux DevTools를 통한 디버깅
   - 예측 가능한 상태 변화

### 언제 사용해야 하는가?

**글로벌 스토어 + 셀렉터 패턴을 사용해야 하는 경우:**
- 복잡한 상태 관리가 필요한 대규모 애플리케이션
- 여러 컴포넌트에서 공유되는 상태가 많은 경우
- 성능 최적화가 중요한 경우
- 타입 안전성이 중요한 경우
- 팀 개발에서 일관된 상태 관리가 필요한 경우

**로컬 상태로 충분한 경우:**
- 간단한 폼 상태
- 컴포넌트 내부에서만 사용되는 상태
- 일회성 UI 상태 (모달, 드롭다운 등)

### 마이그레이션 전략

1. **점진적 도입**
   - 가장 복잡한 상태부터 Redux로 마이그레이션
   - 기존 props drilling과 병행 사용

2. **셀렉터 우선 설계**
   - 상태 구조 설계 전에 셀렉터를 먼저 설계
   - 컴포넌트에서 필요한 데이터를 파악

3. **성능 모니터링**
   - React DevTools Profiler로 성능 측정
   - 불필요한 리렌더링 감지 및 최적화

글로벌 스토어 + 셀렉터 패턴은 복잡한 React 애플리케이션에서 상태 관리를 체계적이고 효율적으로 만들어주는 강력한 패턴입니다. 적절한 상황에서 이 패턴을 적용하면 코드의 가독성, 유지보수성, 성능을 크게 향상시킬 수 있습니다.
