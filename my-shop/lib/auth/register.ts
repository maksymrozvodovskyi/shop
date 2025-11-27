// lib/auth/register.ts

import { nextServer } from "@/lib/api/nextServer";
import type { StrapiErrorResponse } from "@/lib/types/strapi";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type StrapiRegisterResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function register(data: RegisterRequest) {
  try {
    const res = await nextServer.post<StrapiRegisterResponse>(
      "/auth/register",
      data
    );

    return res.data;
  } catch (err) {
    const error = err as {
      response?: { data?: StrapiErrorResponse };
      message?: string;
    };

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Registration error"
    );
  }
}
