import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { CartItem, Product } from '../slices/cartSlice';

// 기본 셀렉터들
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartItemCount = (state: RootState) => state.cart.itemCount;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartLoading = (state: RootState) => state.cart.loading;
export const selectCartError = (state: RootState) => state.cart.error;

// 파생된 셀렉터들
export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
);

export const selectCartTotalPriceFormatted = createSelector(
  [selectCartTotalPrice],
  (total) => `$${total.toFixed(2)}`
);

// 특정 상품 관련 셀렉터들
export const selectCartItemById = createSelector(
  [selectCartItems, (state: RootState, productId: string) => productId],
  (items, productId) => items.find(item => item.product.id === productId)
);

export const selectCartItemQuantity = createSelector(
  [selectCartItemById],
  (item) => item?.quantity || 0
);

export const selectIsProductInCart = createSelector(
  [selectCartItemById],
  (item) => item !== undefined
);

// 카트 아이템 상세 정보
export const selectCartItemsWithDetails = createSelector(
  [selectCartItems],
  (items) => items.map(item => ({
    ...item,
    totalPrice: item.product.price * item.quantity,
    totalPriceFormatted: `$${(item.product.price * item.quantity).toFixed(2)}`,
  }))
);

// 카테고리별 아이템 그룹화
export const selectCartItemsByCategory = createSelector(
  [selectCartItems],
  (items) => {
    const grouped = items.reduce((acc, item) => {
      const category = item.product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {} as Record<string, CartItem[]>);
    
    return grouped;
  }
);

// 카테고리별 통계
export const selectCartStatsByCategory = createSelector(
  [selectCartItemsByCategory],
  (groupedItems) => {
    const stats = Object.entries(groupedItems).map(([category, items]) => ({
      category,
      itemCount: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
    }));
    
    return stats.sort((a, b) => b.totalPrice - a.totalPrice);
  }
);

// 가격대별 필터링
export const selectCartItemsByPriceRange = createSelector(
  [selectCartItems, (state: RootState, minPrice: number, maxPrice: number) => ({ minPrice, maxPrice })],
  (items, { minPrice, maxPrice }) => 
    items.filter(item => 
      item.product.price >= minPrice && item.product.price <= maxPrice
    )
);

// 할인 계산 (예: 10% 할인)
export const selectCartDiscount = createSelector(
  [selectCartTotalPrice, (state: RootState, discountPercent: number = 10) => discountPercent],
  (total, discountPercent) => (total * discountPercent) / 100
);

export const selectCartFinalPrice = createSelector(
  [selectCartTotalPrice, selectCartDiscount],
  (total, discount) => total - discount
);

export const selectCartFinalPriceFormatted = createSelector(
  [selectCartFinalPrice],
  (finalPrice) => `$${finalPrice.toFixed(2)}`
);

// 배송비 계산 (예: $50 이상 무료배송)
export const selectShippingCost = createSelector(
  [selectCartTotalPrice, (state: RootState, freeShippingThreshold: number = 50) => freeShippingThreshold],
  (total, threshold) => total >= threshold ? 0 : 10
);

export const selectCartWithShipping = createSelector(
  [selectCartTotalPrice, selectShippingCost],
  (total, shipping) => total + shipping
);

// 복합 셀렉터 - 카트 요약 정보
export const selectCartSummary = createSelector(
  [
    selectCartItemsCount,
    selectCartTotalQuantity,
    selectCartTotalPrice,
    selectCartDiscount,
    selectShippingCost,
    selectCartFinalPrice,
  ],
  (itemCount, totalQuantity, subtotal, discount, shipping, finalPrice) => ({
    itemCount,
    totalQuantity,
    subtotal,
    discount,
    shipping,
    finalPrice,
    subtotalFormatted: `$${subtotal.toFixed(2)}`,
    discountFormatted: `$${discount.toFixed(2)}`,
    shippingFormatted: shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`,
    finalPriceFormatted: `$${finalPrice.toFixed(2)}`,
  })
);
