import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from './authStore';
import { registerUserAPI } from '@/api/auth';

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async ({ email, password, name }) => {
      return await registerUserAPI(email, password, name);
    },
    onSuccess: (data) => {
      const { setUser } = useAuthStore.getState(); // zustand 상태 업데이트
      setUser(data);
    },
    onError: (error) => {
      console.error('Registration failed:', error.message);
    },
  });
};
