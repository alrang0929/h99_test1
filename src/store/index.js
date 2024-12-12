import { useAuthStore } from './auth/authStore';
import { useCartStore } from './cart/cartStore';
import { useFilterStore } from './filter/filterStore';
import { useProductsStore } from './product/productsStore';
import { usePurchaseStore } from './purchase/purchaseStore';

export const store = () => ({
  auth: useAuthStore(),
  cart: useCartStore(),
  filter: useFilterStore(),
  products: useProductsStore(),
  purchase: usePurchaseStore(),
});
