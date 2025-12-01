"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.push("/sign-in");
  };

  if (!isAuthenticated)
    return (
      <>
        <li>
          <Link href="/sign-in">Login</Link>
        </li>
        <li>
          <Link href="/sign-up">Register</Link>
        </li>
      </>
    );

  return (
    <>
      <li>{user?.email}</li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
}
