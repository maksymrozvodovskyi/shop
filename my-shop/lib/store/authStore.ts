import { create } from "zustand";

export type AuthUserType = {
  id: number;
  documentId: string;
  username: string;
  email: string;
};

type AuthStoreType = {
  isAuthenticated: boolean;
  user: AuthUserType | null;
  setUser: (u: AuthUserType) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user) => set({ user, isAuthenticated: true }),

  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
