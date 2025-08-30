import React from 'react';
import { CartProvider } from './CartContext';
import { ProductCard } from './ProductCard';
import { CartSidebar } from './CartSidebar';
import { useCart } from './CartContext';
import { Product } from './types';

// 샘플 상품 데이터
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    image: '🎧',
    description: 'High-quality wireless headphones with noise cancellation',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: '⌚',
    description: 'Feature-rich smartwatch with health tracking',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Coffee Maker',
    price: 79.99,
    image: '☕',
    description: 'Automatic coffee maker for perfect brew every time',
    category: 'Home'
  },
  {
    id: '4',
    name: 'Yoga Mat',
    price: 29.99,
    image: '🧘',
    description: 'Premium yoga mat for comfortable practice',
    category: 'Fitness'
  },
  {
    id: '5',
    name: 'Laptop Stand',
    price: 49.99,
    image: '💻',
    description: 'Adjustable laptop stand for better ergonomics',
    category: 'Office'
  },
  {
    id: '6',
    name: 'Plant Pot',
    price: 19.99,
    image: '🌱',
    description: 'Beautiful ceramic plant pot for your indoor garden',
    category: 'Home'
  }
];

function AppContent() {
  const { cart, toggleCart } = useCart();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            🛍️ Shopping Cart Context
          </h1>
          
          <button
            onClick={toggleCart}
            style={{
              padding: '12px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            🛒 Cart ({cart.totalItems})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>
            Context Module Pattern - Shopping Cart
          </h2>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            이 예제는 Context Module Pattern을 사용하여 쇼핑 카트 기능을 구현한 것입니다.
            전역 상태 관리를 통해 카트 상태를 효율적으로 관리합니다.
          </p>
          
          <div style={{
            backgroundColor: '#e7f3ff',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #b3d9ff'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0056b3' }}>Context Module Pattern의 장점</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>전역 상태 관리:</strong> 카트 상태를 앱 전체에서 접근 가능</li>
              <li><strong>복잡한 상태 로직:</strong> useReducer를 통한 복잡한 카트 로직 관리</li>
              <li><strong>타입 안전성:</strong> TypeScript로 모든 액션과 상태 타입 정의</li>
              <li><strong>재사용성:</strong> useCart Hook으로 어디서든 카트 기능 사용</li>
              <li><strong>성능 최적화:</strong> 필요한 컴포넌트만 리렌더링</li>
            </ul>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            Products
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {sampleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Context Module 구조</h3>
          <pre style={{
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
{`// 1. 타입 정의
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

// 2. 액션 타입
type CartAction = 
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } };

// 3. Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Provider 컴포넌트
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  // ... 상태 관리 로직
}

// 5. Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

// 6. 컴포넌트에서 사용
function ProductCard({ product }) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  // ...
}`}
          </pre>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar />
    </div>
  );
}

export function ShoppingCartApp() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
