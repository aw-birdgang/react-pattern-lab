import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartAction, CartContextType, Product } from './types';

// 초기 상태
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
};

// 리듀서 함수
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        // 기존 아이템이 있으면 수량 증가
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        // 새 아이템 추가
        const newItem = { product: action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.product.id === action.payload);
      if (!itemToRemove) return state;
      
      const updatedItems = state.items.filter(item => item.product.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.product.price * itemToRemove.quantity),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (!item) return state;
      
      if (quantity <= 0) {
        // 수량이 0 이하면 아이템 제거
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
          totalItems: state.totalItems - item.quantity,
          totalPrice: state.totalPrice - (item.product.price * item.quantity),
        };
      }
      
      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.product.price * quantityDiff),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false,
      };
    
    default:
      return state;
  }
}

// Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider 컴포넌트
interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
