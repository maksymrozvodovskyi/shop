// lib/auth/register.ts

import { nextServer } from "@/lib/api/nextServer";
import type { StrapiErrorResponseType } from "@/lib/types/strapi";

export type RegisterRequestType = {
  username: string;
  email: string;
  password: string;
};

export type StrapiRegisterResponseType = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export async function register(data: RegisterRequestType) {
  try {
    const res = await nextServer.post<StrapiRegisterResponseType>(
      "/auth/register",
      data
    );

    return res.data;
  } catch (err) {
    const error = err as {
      response?: { data?: StrapiErrorResponseType };
      message?: string;
    };

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "Registration error"
    );
  }
}
