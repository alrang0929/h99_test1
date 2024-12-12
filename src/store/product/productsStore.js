import { create } from 'zustand';

export const useProductsStore = create((set, get) => ({
  // 초기 상태
  items: [],
  hasNextPage: true,
  isLoading: false,
  error: null,
  totalCount: 0,

  // 액션
  loadProductsPending: () => set({ isLoading: true }),

  loadProductsFulfilled: ({ products, hasNextPage, totalCount, isInitial }) => {
    const currentItems = get().items;
    set({
      items: isInitial ? products : [...currentItems, ...products],
      hasNextPage,
      totalCount,
      isLoading: false,
      error: null,
    });
  },

  loadProductsRejected: (error) => set({ isLoading: false, error }),

  addProductPending: () => set({ isLoading: true }),

  addProductFulfilled: (product) => {
    const currentItems = get().items;
    set({
      items: [product, ...currentItems],
      totalCount: get().totalCount + 1,
      isLoading: false,
      error: null,
    });
  },

  addProductRejected: (error) => set({
    isLoading: false,
    error: error || '상품 등록에 실패하였습니다.',
  }),
}));