import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
  // 초기 상태
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  // 상태 업데이트 액션
  setItems: (items) => set({ items }),
  setHasNextPage: (hasNextPage) => set({ hasNextPage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setTotalCount: (totalCount) => set({ totalCount }),

  // load
  loadProductsPending: () => set({ isLoading: true }),
  loadProductsFulfilled: (products, hasNextPage, totalCount, isInitial) => {
    const currentItems = get().items;
    set({
      items: isInitial ? products : [...currentItems, ...products],
      hasNextPage,
      totalCount,
      isLoading: false,
      error: null,
    });
  },
  loadProductsRejected: (error) =>
    set({
      isLoading: false,
      error,
    }),

  // addProduct
  addProductPending: () => set({ isLoading: true }),
  addProductFulfilled: (newProduct) => {
    const items = get().items; // 수정된 키
    set({
      items: [newProduct, ...items],
      totalCount: get().totalCount + 1,
      isLoading: false,
      error: null,
    });
  },
  addProductRejected: (error) =>
    set({
      isLoading: false,
      error: error || '상품 등록에 실패하였습니다.',
    }),
}));
