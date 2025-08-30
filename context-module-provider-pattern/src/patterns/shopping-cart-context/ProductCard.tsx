import React from 'react';
import { Product } from './types';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
        fontSize: '48px'
      }}>
        {product.image}
      </div>
      
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 'bold' }}>
        {product.name}
      </h3>
      
      <p style={{ 
        margin: '0 0 8px 0', 
        color: '#666', 
        fontSize: '14px',
        lineHeight: '1.4',
        height: '40px',
        overflow: 'hidden'
      }}>
        {product.description}
      </p>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <span style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: '#007bff' 
        }}>
          ${product.price.toFixed(2)}
        </span>
        
        <span style={{ 
          fontSize: '12px', 
          color: '#666',
          backgroundColor: '#f8f9fa',
          padding: '2px 8px',
          borderRadius: '12px'
        }}>
          {product.category}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => addItem(product)}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          {quantity > 0 ? `Add More (${quantity})` : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
