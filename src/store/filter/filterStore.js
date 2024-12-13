import { create } from 'zustand';
import { ALL_CATEGORY_ID } from '@/constants';

export const useFilterStore = create((set) => ({
  // 초기 상태
  minPrice: 0,
  maxPrice: 0,
  title: '',
  categoryId: ALL_CATEGORY_ID,

  // 상태 업데이트 함수
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setTitle: (title) => set({ title }),
  setCategoryId: (categoryId) => set({ categoryId }),
  resetFilter: () =>
    set({
      minPrice: 0,
      maxPrice: 0,
      title: '',
      categoryId: ALL_CATEGORY_ID,
    }),
}));

// filterSelectors.js에서 사용하는 선택자 함수들
export const selectMinPrice = () => useFilterStore((state) => state.minPrice);
export const selectMaxPrice = () => useFilterStore((state) => state.maxPrice);
export const selectTitle = () => useFilterStore((state) => state.title);
export const selectCategoryId = () => useFilterStore((state) => state.categoryId);

export const selectFilter = () =>
  useFilterStore((state) => ({
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
    title: state.title,
    categoryId: state.categoryId,
  }));
