import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }
      
      // 총액과 아이템 수 업데이트
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      
      // 총액과 아이템 수 업데이트
      state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
        
        // 총액과 아이템 수 업데이트
        state.total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
