import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Header from '../../components/after/Header';
import UserProfile from '../../components/after/UserProfile';
import ShoppingCart from '../../components/after/ShoppingCart';
import { setCurrentUser } from '../../store/slices/userSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { addNotification } from '../../store/slices/notificationSlice';
import { Product } from '../../store/slices/cartSlice';

const AfterExample: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(state => state.theme.mode);

  // 샘플 상품 데이터
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'React 패턴 가이드',
      price: 29.99,
      description: 'React 패턴에 대한 종합 가이드',
      image: 'https://via.placeholder.com/150',
      category: 'books',
      stock: 10,
    },
    {
      id: '2',
      name: 'TypeScript 핸드북',
      price: 24.99,
      description: 'TypeScript 완벽 가이드',
      image: 'https://via.placeholder.com/150',
      category: 'books',
      stock: 15,
    },
    {
      id: '3',
      name: 'Redux Toolkit 가이드',
      price: 19.99,
      description: 'Redux Toolkit 사용법',
      image: 'https://via.placeholder.com/150',
      category: 'books',
      stock: 8,
    },
  ];

  // 초기 데이터 설정
  useEffect(() => {
    // 사용자 정보 설정
    dispatch(setCurrentUser({
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      role: 'user',
      avatar: 'https://via.placeholder.com/100',
      preferences: {
        theme: 'light',
        language: 'ko',
        notifications: true,
      },
    }));

    // 샘플 알림 추가
    dispatch(addNotification({
      type: 'info',
      title: '환영합니다!',
      message: 'Redux + Selectors 패턴 데모에 오신 것을 환영합니다.',
      duration: 5000,
    }));

    dispatch(addNotification({
      type: 'success',
      title: '시스템 준비 완료',
      message: '모든 시스템이 정상적으로 작동하고 있습니다.',
      duration: 3000,
    }));
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    
    // 알림 추가
    dispatch(addNotification({
      type: 'success',
      title: '카트에 추가됨',
      message: `${product.name}이(가) 카트에 추가되었습니다.`,
      duration: 2000,
    }));
  };

  return (
    <div style={{ 
      backgroundColor: themeMode === 'dark' ? '#121212' : '#ffffff',
      color: themeMode === 'dark' ? '#ffffff' : '#000000',
      minHeight: '100vh'
    }}>
      <Header />

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 사용자 프로필 */}
          <div>
            <UserProfile />
          </div>

          {/* 상품 목록 */}
          <div>
            <h2>상품 목록 (Redux + Selectors)</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              {sampleProducts.map(product => (
                <div
                  key={product.id}
                  style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '8px',
                    padding: '15px',
                    display: 'flex',
                    gap: '15px'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0' }}>{product.name}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#6c757d' }}>
                      {product.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        카트에 추가
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Redux + Selectors 장점 설명 */}
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>Redux + Selectors 패턴의 장점</h3>
          <ul>
            <li><strong>중앙화된 상태 관리:</strong> 모든 상태가 하나의 스토어에서 관리됨</li>
            <li><strong>셀렉터를 통한 효율적인 데이터 접근:</strong> 필요한 데이터만 선택적으로 가져옴</li>
            <li><strong>성능 최적화:</strong> 불필요한 리렌더링 방지</li>
            <li><strong>예측 가능한 상태 변화:</strong> 액션을 통한 명확한 상태 변경</li>
            <li><strong>타입 안전성:</strong> TypeScript와 완벽한 통합</li>
            <li><strong>개발자 도구:</strong> Redux DevTools를 통한 디버깅</li>
            <li><strong>코드 유지보수성:</strong> 명확한 구조와 분리된 관심사</li>
          </ul>
        </div>

        {/* 셀렉터 사용 예시 */}
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>셀렉터 사용 예시</h3>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto'
          }}>
{`// 기본 셀렉터
const user = useAppSelector(selectCurrentUser);

// 파생된 셀렉터
const isLoggedIn = useAppSelector(selectIsLoggedIn);
const isAdmin = useAppSelector(selectIsAdmin);

// 복합 셀렉터
const cartSummary = useAppSelector(selectCartSummary);
const userStats = useAppSelector(selectUserStats);

// 매개변수가 있는 셀렉터
const userById = useAppSelector(state => selectUserById(state, 'user-id'));
const cartItemQuantity = useAppSelector(state => 
  selectCartItemQuantity(state, 'product-id')
);`}
          </pre>
        </div>
      </div>

      <ShoppingCart />
    </div>
  );
};

export default AfterExample;
