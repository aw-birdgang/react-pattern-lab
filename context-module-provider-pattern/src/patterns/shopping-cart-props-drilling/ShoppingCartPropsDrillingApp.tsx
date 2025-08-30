import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CartSidebar } from './CartSidebar';
import { Product, CartState, CartItem } from './types';

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

export function ShoppingCartPropsDrillingApp() {
  const [cart, setCart] = useState<CartState>({
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isOpen: false,
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // 기존 아이템이 있으면 수량 증가
        const updatedItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...prevCart,
          items: updatedItems,
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + product.price,
        };
      } else {
        // 새 아이템 추가
        const newItem: CartItem = { product, quantity: 1 };
        return {
          ...prevCart,
          items: [...prevCart.items, newItem],
          totalItems: prevCart.totalItems + 1,
          totalPrice: prevCart.totalPrice + product.price,
        };
      }
    });
  };

  const removeItem = (productId: string) => {
    setCart(prevCart => {
      const itemToRemove = prevCart.items.find(item => item.product.id === productId);
      if (!itemToRemove) return prevCart;
      
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
      return {
        ...prevCart,
        items: updatedItems,
        totalItems: prevCart.totalItems - itemToRemove.quantity,
        totalPrice: prevCart.totalPrice - (itemToRemove.product.price * itemToRemove.quantity),
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      const item = prevCart.items.find(item => item.product.id === productId);
      if (!item) return prevCart;
      
      if (quantity <= 0) {
        // 수량이 0 이하면 아이템 제거
        return {
          ...prevCart,
          items: prevCart.items.filter(item => item.product.id !== productId),
          totalItems: prevCart.totalItems - item.quantity,
          totalPrice: prevCart.totalPrice - (item.product.price * item.quantity),
        };
      }
      
      const quantityDiff = quantity - item.quantity;
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      
      return {
        ...prevCart,
        items: updatedItems,
        totalItems: prevCart.totalItems + quantityDiff,
        totalPrice: prevCart.totalPrice + (item.product.price * quantityDiff),
      };
    });
  };

  const clearCart = () => {
    setCart(prevCart => ({
      ...prevCart,
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }));
  };

  const toggleCart = () => {
    setCart(prevCart => ({
      ...prevCart,
      isOpen: !prevCart.isOpen,
    }));
  };

  const closeCart = () => {
    setCart(prevCart => ({
      ...prevCart,
      isOpen: false,
    }));
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

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
            🛍️ Shopping Cart (Props Drilling)
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
            Props Drilling Pattern - Shopping Cart
          </h2>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
            이 예제는 Props Drilling 방식을 사용하여 쇼핑 카트 기능을 구현한 것입니다.
            모든 상태와 함수들을 props로 전달해야 하는 번거로움을 보여줍니다.
          </p>
          
          <div style={{
            backgroundColor: '#fff3cd',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #ffeaa7'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#856404' }}>Props Drilling의 문제점</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>복잡한 Props 전달:</strong> 카트 상태와 함수들을 모든 컴포넌트에 전달</li>
              <li><strong>컴포넌트 간 강한 결합:</strong> 부모 컴포넌트가 모든 로직을 관리</li>
              <li><strong>재사용성 저하:</strong> 다른 곳에서 사용하려면 동일한 props 구조 필요</li>
              <li><strong>유지보수 어려움:</strong> 상태 변경 시 여러 컴포넌트 수정 필요</li>
              <li><strong>코드 복잡성:</strong> props가 많아질수록 컴포넌트 인터페이스 복잡</li>
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
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={addToCart}
                getItemQuantity={getItemQuantity}
              />
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
          <h3 style={{ margin: '0 0 16px 0', color: '#333' }}>Props Drilling 구조</h3>
          <pre style={{
            backgroundColor: '#2d3748',
            color: '#e2e8f0',
            padding: '16px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
{`// 부모 컴포넌트에서 모든 상태 관리
const [cart, setCart] = useState<CartState>({...});

// 복잡한 카트 로직을 부모에서 관리
const addToCart = (product: Product) => {
  setCart(prevCart => {
    const existingItem = prevCart.items.find(item => 
      item.product.id === product.id
    );
    // ... 복잡한 로직
  });
};

// 자식 컴포넌트에 모든 함수들을 props로 전달
<ProductCard 
  product={product}
  onAddToCart={addToCart}
  getItemQuantity={getItemQuantity}
/>

<CartSidebar 
  cart={cart}
  onRemoveItem={removeItem}
  onUpdateQuantity={updateQuantity}
  onClearCart={clearCart}
  onCloseCart={closeCart}
/>`}
          </pre>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar 
        cart={cart}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
        onClearCart={clearCart}
        onCloseCart={closeCart}
      />
    </div>
  );
}
