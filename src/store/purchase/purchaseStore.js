import { create } from 'zustand';

export const usePurchaseStore = create((set) => ({
  // 초기 상태
  isLoading: false,
  error: null,

  // 상태 업데이트 함수
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  resetState: () => set({ isLoading: false, error: null }),

  purchaseStart: () => set({ isLoading: true, error: null }),
  purchaseSuccess: () => set({ isLoading: false, error: null }),
  purchaseFailure: (error) => set({ isLoading: false, error }),
}));
