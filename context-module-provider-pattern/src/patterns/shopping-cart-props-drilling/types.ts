// Props Drilling 방식의 쇼핑 카트 타입 정의

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
}

// Props 타입들
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  getItemQuantity: (productId: string) => number;
}

export interface CartSidebarProps {
  cart: CartState;
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onCloseCart: () => void;
}

export interface HeaderProps {
  cart: CartState;
  onToggleCart: () => void;
}
