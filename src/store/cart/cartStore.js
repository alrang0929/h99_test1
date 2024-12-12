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

  // 장바구니 아이템 추가
  addCartItem: ({ item, userId, count }) => {
    const currentCart = get().cart;
    const existingItemIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...currentCart];
      updatedCart[existingItemIndex].count += count;
    } else {
      updatedCart = [...currentCart, { ...item, count }];
    }

    const total = calculateTotal(updatedCart);
    set({
      cart: updatedCart,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });

    setCartToLocalStorage(updatedCart, userId);
  },

  // 장바구니 아이템 제거
  removeCartItem: ({ itemId, userId }) => {
    const currentCart = get().cart;
    const updatedCart = currentCart.filter((item) => item.id !== itemId);

    const total = calculateTotal(updatedCart);
    set({
      cart: updatedCart,
      totalCount: total.totalCount,
      totalPrice: total.totalPrice,
    });

    setCartToLocalStorage(updatedCart, userId);
  },

  // 장바구니 아이템 수량 변경
  changeCartItemCount: ({ itemId, count, userId }) => {
    const currentCart = get().cart;
    const itemIndex = currentCart.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[itemIndex].count = count;

      const total = calculateTotal(updatedCart);
      set({
        cart: updatedCart,
        totalCount: total.totalCount,
        totalPrice: total.totalPrice,
      });

      setCartToLocalStorage(updatedCart, userId);
    }
  },
}));
