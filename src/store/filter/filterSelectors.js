export const selectMinPrice = () => useFilterStore((state) => state.minPrice);
export const selectMaxPrice = () => useFilterStore((state) => state.maxPrice);
export const selectTitle = () => useFilterStore((state) => state.title);
export const selectCategoryId = () => useFilterStore((state) => state.categoryId);
export const selectFilter = () => useFilterStore((state) => ({
  minPrice: state.minPrice,
  maxPrice: state.maxPrice,
  title: state.title,
  categoryId: state.categoryId,
}));
``