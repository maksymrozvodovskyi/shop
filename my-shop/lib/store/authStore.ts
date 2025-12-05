import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (user) => set({ user, isAuthenticated: true }),

      clearAuth: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
