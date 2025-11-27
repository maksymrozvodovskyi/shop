"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setUser(data);
      router.push("/products");
    } catch {
      setError("Login error");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg bg-white shadow">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>

      <form action={handleSubmit} className="flex flex-col gap-4">
        <input
          name="identifier"
          type="email"
          className="border p-2 rounded"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          className="border p-2 rounded"
          placeholder="Password"
          required
        />

        <button className="bg-blue-600 text-white py-2 rounded">Login</button>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
