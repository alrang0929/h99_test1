import { create } from 'zustand';

export const usePurchaseStore = create((set) => ({
  // 초기 상태
  isLoading: false,
  error: null,

  // 액션
  purchaseStart: () => set({ isLoading: true, error: null }),

  purchaseSuccess: () => set({ isLoading: false, error: null }),

  purchaseFailure: (error) => set({ isLoading: false, error }),
}));
