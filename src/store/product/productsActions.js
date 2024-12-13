import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchProducts, addProductAPI } from '@/api/product';
import { useProductsStore } from './productsStore';

// 상품 목록 가져오기
 const useLoadProducts = (filter, pageSize, page, isInitial) => {
  const setItems = useProductsStore((state) => state.setItems);
  const setHasNextPage = useProductsStore((state) => state.setHasNextPage);
  const setTotalCount = useProductsStore((state) => state.setTotalCount);

  return useQuery({
    queryKey: ['products', filter, pageSize, page],
    queryFn: async () => {
      const result = await fetchProducts(filter, pageSize, page);
      return { ...result, isInitial };
    },
    onSuccess: ({ products, hasNextPage, totalCount, isInitial }) => {
      setItems(isInitial ? products : (prev) => [...prev, ...products]);
      setHasNextPage(hasNextPage);
      setTotalCount(totalCount);
    },
    onError: (error) => {
      console.error('Failed to load products:', error.message);
    },
  });
};

// 상품 추가
const useAddProduct = () => {
  return useMutation({
    mutationFn: async (productData) => {
      try {
        const newProduct = await addProductAPI(productData);
        return newProduct;
      } catch (error) {
        throw new Error(error.message || 'Failed to add product');
      }
    },
    onSuccess: (data) => {
      console.log('Product added successfully:', data);
      // 상태 업데이트 로직을 여기서 처리 (e.g., Zustand 상태 업데이트)
    },
    onError: (error) => {
      console.error('Failed to add product:', error.message);
    },
  });
};
export {useLoadProducts,useAddProduct};