import React from 'react';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectActiveUsers, selectUsersByRole, selectUserStats,} from '../store/selectors/userSelectors';
import {
  selectCartItemsByPriceRange,
  selectCartStatsByCategory,
  selectCartSummary,
} from '../store/selectors/cartSelectors';
import {
  selectHighPriorityUnreadNotifications,
  selectNotificationsGroupedByDate,
  selectNotificationStats,
  selectPrioritizedNotifications,
} from '../store/selectors/notificationSelectors';
import {selectResponsiveTheme, selectThemeCSSVariables, selectThemeSummary,} from '../store/selectors/themeSelectors';
import {addUser} from '../store/slices/userSlice';
import {addToCart} from '../store/slices/cartSlice';
import {addNotification} from '../store/slices/notificationSlice';

const AdvancedSelectorExample: React.FC = () => {
  const dispatch = useAppDispatch();

  // 고급 셀렉터 사용 예시들
  const userStats = useAppSelector(selectUserStats);
  const adminUsers = useAppSelector(state => selectUsersByRole(state, 'admin'));
  const activeUsers = useAppSelector(selectActiveUsers);
  const cartStatsByCategory = useAppSelector(selectCartStatsByCategory);
  const expensiveItems = useAppSelector(state => selectCartItemsByPriceRange(state, 20, 100));
  const cartSummary = useAppSelector(selectCartSummary);
  const notificationStats = useAppSelector(selectNotificationStats);
  const notificationsByDate = useAppSelector(selectNotificationsGroupedByDate);
  const prioritizedNotifications = useAppSelector(selectPrioritizedNotifications);
  const highPriorityUnread = useAppSelector(selectHighPriorityUnreadNotifications);
  const themeCSSVars = useAppSelector(selectThemeCSSVariables);
  const themeSummary = useAppSelector(selectThemeSummary);
  const mobileTheme = useAppSelector(state => selectResponsiveTheme(state, 'mobile'));

  const handleAddSampleData = () => {
    // 샘플 사용자 추가
    dispatch(addUser({
      id: Date.now().toString(),
      name: '샘플 사용자',
      email: 'sample@example.com',
      role: 'user',
      preferences: {
        theme: 'light',
        language: 'ko',
        notifications: true,
      },
    }));

    // 샘플 상품을 카트에 추가
    dispatch(addToCart({
      id: 'sample-product',
      name: '샘플 상품',
      price: 49.99,
      description: '고급 셀렉터 테스트용 상품',
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
      stock: 5,
    }));

    // 샘플 알림 추가
    dispatch(addNotification({
      type: 'warning',
      title: '고급 셀렉터 테스트',
      message: '이 알림은 고급 셀렉터 패턴을 테스트하기 위한 것입니다.',
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>고급 셀렉터 패턴 예제</h1>

      <button
        onClick={handleAddSampleData}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        샘플 데이터 추가
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 사용자 통계 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>사용자 통계 (selectUserStats)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(userStats, null, 2)}
          </pre>
        </div>

        {/* 카트 요약 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>카트 요약 (selectCartSummary)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(cartSummary, null, 2)}
          </pre>
        </div>

        {/* 알림 통계 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>알림 통계 (selectNotificationStats)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(notificationStats, null, 2)}
          </pre>
        </div>

        {/* 테마 요약 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>테마 요약 (selectThemeSummary)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(themeSummary, null, 2)}
          </pre>
        </div>

        {/* 카테고리별 카트 통계 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>카테고리별 카트 통계 (selectCartStatsByCategory)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(cartStatsByCategory, null, 2)}
          </pre>
        </div>

        {/* 우선순위 알림 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>우선순위 알림 (selectPrioritizedNotifications)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(prioritizedNotifications.slice(0, 3), null, 2)}
          </pre>
        </div>

        {/* CSS 변수 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>CSS 변수 (selectThemeCSSVariables)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(themeCSSVars, null, 2)}
          </pre>
        </div>

        {/* 모바일 테마 */}
        <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '20px' }}>
          <h3>모바일 테마 (selectResponsiveTheme)</h3>
          <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
            {JSON.stringify(mobileTheme, null, 2)}
          </pre>
        </div>
      </div>

      {/* 고급 셀렉터 설명 */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h3>고급 셀렉터 패턴 설명</h3>

        <h4>1. 복합 셀렉터 (Composite Selectors)</h4>
        <p>여러 기본 셀렉터를 조합하여 복잡한 데이터를 계산하는 셀렉터입니다.</p>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
{`export const selectCartSummary = createSelector(
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
    // ... 포맷된 값들
  })
);`}
        </pre>

        <h4>2. 매개변수가 있는 셀렉터 (Parameterized Selectors)</h4>
        <p>동적 매개변수를 받아서 특정 조건에 맞는 데이터를 반환하는 셀렉터입니다.</p>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
{`export const selectUsersByRole = createSelector(
  [selectUsers, (state: RootState, role: User['role']) => role],
  (users, role) => users.filter(user => user.role === role)
);

// 사용법
const adminUsers = useAppSelector(state => selectUsersByRole(state, 'admin'));`}
        </pre>

        <h4>3. 조건부 셀렉터 (Conditional Selectors)</h4>
        <p>조건에 따라 다른 데이터를 반환하거나 계산하는 셀렉터입니다.</p>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
{`export const selectShippingCost = createSelector(
  [selectCartTotalPrice, (state: RootState, freeShippingThreshold: number = 50) => freeShippingThreshold],
  (total, threshold) => total >= threshold ? 0 : 10
);`}
        </pre>

        <h4>4. 정규화된 셀렉터 (Normalized Selectors)</h4>
        <p>복잡한 데이터 구조를 정규화하여 효율적으로 접근할 수 있게 하는 셀렉터입니다.</p>
        <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
{`export const selectNotificationsGroupedByDate = createSelector(
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
);`}
        </pre>

        <h4>5. 메모이제이션 최적화</h4>
        <p>createSelector는 자동으로 메모이제이션을 수행하여 불필요한 재계산을 방지합니다.</p>
        <ul>
          <li><strong>입력 의존성:</strong> 첫 번째 배열의 셀렉터들이 변경될 때만 재계산</li>
          <li><strong>출력 메모이제이션:</strong> 동일한 입력에 대해 동일한 출력을 캐시</li>
          <li><strong>얕은 비교:</strong> 참조 동일성을 통해 변경 감지</li>
        </ul>
      </div>
    </div>
  );
};

export default AdvancedSelectorExample;
