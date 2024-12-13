import { create } from 'zustand';
import {
  getCartFromLocalStorage,
  resetCartAtLocalStorage,
  setCartToLocalStorage,
  calculateTotal,
} from './cartUtils';
// import { count } from 'console';

export const useCartStore = create((set) => ({
  // 초기 상태
  cart: [],
  totalCount: 0,
  totalPrice: 0,

  initCart: (userId) => {
    if (!userId) return;
    const prevCartItems = getCartFromLocalStorage(userId);
    const total = calculateTotal(prevCartItems);
    set({
      cart: prevCartItems,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    }),
      setCartToLocalStorage(cart, userId);
  }, //initCart

  resetCart: (userId) => {
    resetCartAtLocalStorage(userId);
    set({ cart: [], totalCount: 0, totalPrice: 0 });
  },

  addCartItem: (item, userId, count) => {
    const cart = get().cart; //현재 상태 가져오기
    const existingItemIndex = state.cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      // 기존 아이템이 있는 경우 수량 업데이트트
      updatedCart = [...cart];
      updatedCart[existingItemIndex].count += count;
    } else {
      updatedCart = [...cart, { ...item, count }];
    }
    const total = calculateTotal(cart);
    set({
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
    setCartToLocalStorage(cart, userId);
  },
  removeCartItem: (itemId, userId) => {
    const cart = get().cart; //현재 상태 가져오기
    const updateCart = cart.filter((item) => item.id !== itemId);
    const total = calculateTotal(updateCart);
    set({
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
    setCartToLocalStorage(updateCart, userId);
  },

  changeCartItemCount: (itemId, count, userId) => {
    const cart = get().cart; // 현재 상태 가져오기
    const updatedCart = cart.map(
      (item) => (item.id === itemId ? { ...item, count } : item) // 변경된 아이템만 업데이트
    );

    const total = calculateTotal(updatedCart);

    // 상태 업데이트 및 로컬 스토리지 저장
    set({
      cart: updatedCart,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });
    setCartToLocalStorage(updatedCart, userId);
  },
}));
