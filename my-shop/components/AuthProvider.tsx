"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        clearAuth();
      }
    }

    check();
  }, [setUser, clearAuth]);

  return children;
}
