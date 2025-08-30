import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  selectCartItems, 
  selectCartTotal, 
  selectCartItemCount, 
  selectCartIsOpen,
  selectCartItemsWithDetails,
  selectCartSummary
} from '../../store/selectors/cartSelectors';
import { 
  toggleCart, 
  updateQuantity, 
  removeFromCart, 
  clearCart 
} from '../../store/slices/cartSlice';

const ShoppingCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const itemCount = useAppSelector(selectCartItemCount);
  const isOpen = useAppSelector(selectCartIsOpen);
  const itemsWithDetails = useAppSelector(selectCartItemsWithDetails);
  const cartSummary = useAppSelector(selectCartSummary);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!isOpen) {
    return (
      <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
        <button
          onClick={handleToggleCart}
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
        <h2 style={{ margin: 0 }}>쇼핑 카트 (Redux + Selectors)</h2>
        <button
          onClick={handleToggleCart}
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
          itemsWithDetails.map((item) => (
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
                  {item.totalPriceFormatted}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
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
                    onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
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
                    onClick={() => handleRemoveItem(item.product.id)}
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
        <div style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>총 {cartSummary.itemCount}개 상품</span>
            <span>{cartSummary.subtotalFormatted}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>할인 (10%)</span>
            <span>-{cartSummary.discountFormatted}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
            <span>배송비</span>
            <span>{cartSummary.shippingFormatted}</span>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            borderTop: '1px solid #dee2e6',
            paddingTop: '10px',
            fontWeight: 'bold'
          }}>
            <span>총 결제금액</span>
            <span>{cartSummary.finalPriceFormatted}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleClearCart}
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
            onClick={handleToggleCart}
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
