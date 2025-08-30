import React, { useState, useCallback, useMemo } from 'react';

// 지역화된 상태를 사용하는 고급 예제
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const AdvancedCoLocatedExample: React.FC = () => {
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 25, category: 'Electronics' },
    { id: 3, name: 'Book', price: 15, category: 'Books' },
    { id: 4, name: 'Coffee Mug', price: 8, category: 'Home' },
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 필터링된 제품 목록 (메모이제이션)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // 카트 총액 (메모이제이션)
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  // 제품 추가 함수 (메모이제이션)
  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  }, []);

  // 제품 제거 함수 (메모이제이션)
  const removeFromCart = useCallback((productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }, []);

  // 수량 변경 함수 (메모이제이션)
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  return (
    <div className="advanced-example">
      <h2>고급 지역화된 상태 패턴 예제</h2>
      <p>
        이 예제는 지역화된 상태 패턴을 사용하여 복잡한 쇼핑 카트 기능을 구현합니다.
        모든 상태와 로직이 하나의 컴포넌트에 캡슐화되어 있습니다.
      </p>

      <div className="shopping-container">
        {/* 제품 목록 섹션 */}
        <div className="products-section">
          <h3>제품 목록</h3>
          
          {/* 필터 및 검색 */}
          <div className="filters">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">모든 카테고리</option>
              <option value="Electronics">전자제품</option>
              <option value="Books">도서</option>
              <option value="Home">홈용품</option>
            </select>
            
            <input
              type="text"
              placeholder="제품 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 제품 목록 */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <h4>{product.name}</h4>
                <p>카테고리: {product.category}</p>
                <p className="price">${product.price}</p>
                <button onClick={() => addToCart(product)}>
                  카트에 추가
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 쇼핑 카트 섹션 */}
        <div className="cart-section">
          <h3>쇼핑 카트</h3>
          
          {cart.length === 0 ? (
            <p>카트가 비어있습니다.</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <p>${item.product.price} x {item.quantity}</p>
                    </div>
                    <div className="item-controls">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="remove-btn"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-total">
                <h4>총액: ${cartTotal}</h4>
                <button 
                  onClick={() => setCart([])}
                  className="clear-cart-btn"
                >
                  카트 비우기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCoLocatedExample;
