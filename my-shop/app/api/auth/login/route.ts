import { NextRequest, NextResponse } from "next/server";
import { api } from "@/lib/api/api";
import { cookies } from "next/headers";
import type { StrapiErrorResponse } from "@/lib/types/strapi";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post("/api/auth/local", body);

    const jwt: string | undefined = apiRes.data?.jwt;
    const user = apiRes.data?.user;

    if (!jwt) {
      return NextResponse.json({ error: "No token received" }, { status: 400 });
    }

    const cookieStore = await cookies();

    cookieStore.set("jwt", jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(user);
  } catch (err) {
    const error = err as {
      response?: { data?: StrapiErrorResponse };
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
