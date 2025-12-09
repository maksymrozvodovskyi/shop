import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import type { StrapiErrorResponseType } from "@/lib/types/strapi";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post("/api/auth/local", body);

    const jwt: string | undefined = apiRes.data?.jwt;
    const user = apiRes.data?.user;

    if (!jwt || !user || !user.id) {
      return NextResponse.json(
        { error: "Invalid response from server" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();

    cookieStore.set("jwt", jwt, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set("user_id", user.id.toString(), {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(user);
  } catch (err) {
    const error = err as {
      response?: { data?: StrapiErrorResponseType };
      message?: string;
    };

    const message =
      error.response?.data?.error?.message ?? error.message ?? "Login failed";

    return NextResponse.json(
      { error: message },
      { status: error.response?.data?.error?.status ?? 400 }
    );
  }
}
