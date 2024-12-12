import { useMutation } from '@tanstack/react-query';
import { useCartStore } from './cartStore';

export const useAddCartItem = () => {
  return useMutation({
    mutationFn: async ({ item, userId, count }) => {
      const store = useCartStore.getState();
      const existingItemIndex = store.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...store.cart];
        updatedCart[existingItemIndex].count += count;
      } else {
        updatedCart = [...store.cart, { ...item, count }];
      }

      return { updatedCart, userId };
    },
    onSuccess: ({ updatedCart, userId }) => {
      const updateCartState = useCartStore.getState().updateCartState;
      updateCartState(updatedCart, userId);
    },
    onError: (error) => {
      console.error('Failed to add cart item:', error);
    },
  });
};

export const useRemoveCartItem = () => {
  return useMutation({
    mutationFn: async ({ itemId, userId }) => {
      const store = useCartStore.getState();
      const updatedCart = store.cart.filter((item) => item.id !== itemId);
      return { updatedCart, userId };
    },
    onSuccess: ({ updatedCart, userId }) => {
      const updateCartState = useCartStore.getState().updateCartState;
      updateCartState(updatedCart, userId);
    },
    onError: (error) => {
      console.error('Failed to remove cart item:', error);
    },
  });
};
