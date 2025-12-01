import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/lib/api/api";

export async function GET() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return NextResponse.json({ success: false });
  }

  try {
    const meRes = await api.get("/users/me", {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    return NextResponse.json({
      success: true,
      user: meRes.data,
    });
  } catch {
    cookieStore.delete("jwt");
    return NextResponse.json({ success: false });
  }
}
