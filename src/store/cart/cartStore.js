import { create } from 'zustand';
import {
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from './cartUtils';

export const useCartStore = create((set, get) => ({
  // 초기 상태
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  // 장바구니 초기화
  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
  },

  // 장바구니 리셋
  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({
      cart: [],
      totalCount: 0,
      totalPrice: 0,
    });
  },

  // 로컬 상태 업데이트
  updateCartState: (updatedCart, userId) => {
    const total = calculateTotal(updatedCart);
    set({
      cart: updatedCart,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
    setCartToLocalStorage(updatedCart, userId);
  },
}));
