"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, RegisterRequest } from "@/lib/auth/register";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (formData: FormData) => {
    setError("");

    const values = Object.fromEntries(formData) as RegisterRequest;

    try {
      const res = await register(values);
      if (res) router.push("/profile");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>

      <form action={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="font-medium">Username</label>
          <input
            name="username"
            required
            className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>

      <p className="text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <a href="/sign-in" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
