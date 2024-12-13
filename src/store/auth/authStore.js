import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  // 초기 상태
  isLogin: false,
  user: null,
  registerStatus: 'idle',
  registerError: null,

  // 상태 업데이트 함수
  setIsLogin: (isLogin) => set({ isLogin }),
  setRegisterStatus: (status) => set({ registerStatus: status }),
  setRegisterError: (error) => set({ registerError: error }),
  setUser: (user) => set({ user, isLogin: true }),
  logout: () => set({ user: null, isLogin: false }),

  // 상태 접근 헬퍼 함수
  selectIsLogin: () => get().isLogin,
  selectUser: () => get().user,
  selectRegisterStatus: () => get().registerStatus,
  selectRegisterError: () => get().registerError,
}));
