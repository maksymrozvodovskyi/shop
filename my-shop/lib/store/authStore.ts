import { create } from "zustand";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  setUser: (u: AuthUser) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
