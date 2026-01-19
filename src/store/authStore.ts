import { create } from 'zustand';
import { STORAGE_KEYS } from '@/constants';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearAuth: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  isAuthenticated: false,
  setToken: (token: string) => {
    localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
    set({ token, isAuthenticated: true });
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
    set({ token: null, isAuthenticated: false });
  },
  initAuth: () => {
    const token = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));
