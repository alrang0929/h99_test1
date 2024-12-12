import { create } from 'zustand';
import { registerUser } from './authActions';

export const useAuthStore = create((set) => ({
  // 초기 상태
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // 상태 업데이트 함수
  setIsLogin: (isLogin) => set({ isLogin }),

  setUser: (user) => set({
    user,
    isLogin: true,
  }),

  logout: () => set({
    isLogin: false,
    user: null,
  }),

  // registerUser 상태 관리
  registerUserPending: () => set({ registerStatus: 'loading' }),

  registerUserFulfilled: (user) => set({
    registerStatus: 'succeeded',
    user,
    isLogin: true,
  }),

  registerUserRejected: (error) => set({
    registerStatus: 'failed',
    registerError: error || 'Registration failed',
  }),
}));
