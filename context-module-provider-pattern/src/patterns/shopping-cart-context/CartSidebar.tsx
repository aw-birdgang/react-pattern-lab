import React from 'react';
import { useCart } from './CartContext';

export function CartSidebar() {
  const { cart, removeItem, updateQuantity, clearCart, closeCart } = useCart();

  if (!cart.isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      width: '400px',
      height: '100vh',
      backgroundColor: 'white',
      boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          Shopping Cart ({cart.totalItems})
        </h2>
        <button
          onClick={closeCart}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {cart.items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
            <p>Your cart is empty</p>
            <p>Add some products to get started!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.items.map((item) => (
              <div key={item.product.id} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  {item.product.image}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {item.product.name}
                  </h4>
                  <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                    ${item.product.price.toFixed(2)}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      -
                    </button>
                    
                    <span style={{ 
                      minWidth: '30px', 
                      textAlign: 'center',
                      fontWeight: 'bold'
                    }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        border: '1px solid #ddd',
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      +
                    </button>
                    
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: '#dc3545',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.items.length > 0 && (
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total:</span>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
              ${cart.totalPrice.toFixed(2)}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={clearCart}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Clear Cart
            </button>
            
            <button
              onClick={() => alert('Checkout functionality would go here!')}
              style={{
                flex: 2,
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
