import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';

export const useFilterStore = create((set) => ({
  // 초기 상태
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  // 액션
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  resetFilter: () => set({
    minPrice: 0,
    maxPrice: 0,
    title: '',
    categoryId: ALL_CATEGORY_ID,
  }),
}));