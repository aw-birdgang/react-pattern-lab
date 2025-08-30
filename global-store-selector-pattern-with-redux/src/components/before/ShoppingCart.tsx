import React from 'react';

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

interface ShoppingCartProps {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
  onToggleCart: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  total,
  itemCount,
  isOpen,
  onToggleCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) {
    return (
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <button
          onClick={onToggleCart}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          🛒 카트 ({itemCount})
        </button>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      borderLeft: '1px solid #dee2e6',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #dee2e6',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>쇼핑 카트 (Props Drilling)</h2>
        <button
          onClick={onToggleCart}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      {/* 카트 아이템들 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6c757d' }}>
            <p>카트가 비어있습니다.</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.product.id}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                display: 'flex',
                gap: '15px'
              }}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{item.product.name}</h4>
                <p style={{ margin: '0 0 10px 0', color: '#6c757d', fontSize: '14px' }}>
                  ${item.product.price}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '1px solid #dee2e6',
                      backgroundColor: 'white',
                      cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    -
                  </button>
                  
                  <span style={{ minWidth: '30px', textAlign: 'center' }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      border: '1px solid #dee2e6',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    style={{
                      marginLeft: 'auto',
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 푸터 */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span><strong>총 {itemCount}개 상품</strong></span>
          <span><strong>${total.toFixed(2)}</strong></span>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClearCart}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            카트 비우기
          </button>
          
          <button
            onClick={onToggleCart}
            style={{
              flex: 1,
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
