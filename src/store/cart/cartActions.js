import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from './cartStore';
import { setCartToLocalStorage, resetCartAtLocalStorage } from './cartUtils';

// 장바구니 아이템 추가
export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((state) => state.setCart);

  return useMutation({
    mutationFn: async ({ item, userId, count }) => {
      const currentCart = queryClient.getQueryData(['cart', userId]) || [];
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

      setCartToLocalStorage(updatedCart, userId);
      return updatedCart;
    },
    onSuccess: (updatedCart, { userId }) => {
      queryClient.setQueryData(['cart', userId], updatedCart);
      setCart(updatedCart);
    },
    onError: (error) => {
      console.error('Failed to add cart item:', error.message);
    },
  });
};

// 장바구니 리셋
export const useResetCart = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((state) => state.setCart);

  return useMutation({
    mutationFn: async (userId) => {
      resetCartAtLocalStorage(userId);
      return [];
    },
    onSuccess: (_, userId) => {
      queryClient.setQueryData(['cart', userId], []);
      setCart([]);
    },
    onError: (error) => {
      console.error('Failed to reset cart:', error.message);
    },
  });
};
