import React, { useState } from 'react';
import Header from '../../components/before/Header';
import UserProfile from '../../components/before/UserProfile';
import ShoppingCart from '../../components/before/ShoppingCart';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    language: 'ko' | 'en';
    notifications: boolean;
  };
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const BeforeExample: React.FC = () => {
  // Props Drilling을 위한 상태들
  const [user, setUser] = useState<User | null>({
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
  });

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

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

  // Props Drilling을 위한 핸들러들
  const handleUpdateUserPreferences = (preferences: Partial<User['preferences']>) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      };
    });
  };

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setUser(null);
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

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleCart = () => {
    setCartIsOpen(prev => !prev);
  };

  // 카트 총액과 아이템 수 계산 (Props Drilling의 문제점: 매번 계산)
  React.useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(total);
    setCartItemCount(count);
  }, [cartItems]);

  return (
    <div style={{ 
      backgroundColor: theme === 'dark' ? '#121212' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      minHeight: '100vh'
    }}>
      <Header
        user={user}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onLogout={handleLogout}
        unreadNotifications={unreadNotifications}
      />

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* 사용자 프로필 */}
          <div>
            <UserProfile
              user={user}
              onUpdatePreferences={handleUpdateUserPreferences}
              onLogout={handleLogout}
            />
          </div>

          {/* 상품 목록 */}
          <div>
            <h2>상품 목록 (Props Drilling)</h2>
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

        {/* Props Drilling 문제점 설명 */}
        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>Props Drilling 패턴의 문제점</h3>
          <ul>
            <li><strong>Props 전달의 복잡성:</strong> 상태를 여러 레벨의 컴포넌트를 거쳐 전달해야 함</li>
            <li><strong>컴포넌트 간 강한 결합:</strong> 부모 컴포넌트가 자식의 모든 상태를 알아야 함</li>
            <li><strong>불필요한 리렌더링:</strong> 상태 변경 시 많은 컴포넌트가 리렌더링됨</li>
            <li><strong>코드 유지보수 어려움:</strong> 상태 구조 변경 시 모든 props를 수정해야 함</li>
            <li><strong>타입 안전성 부족:</strong> props 타입이 명확하지 않을 수 있음</li>
          </ul>
        </div>
      </div>

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
    </div>
  );
};

export default BeforeExample;
