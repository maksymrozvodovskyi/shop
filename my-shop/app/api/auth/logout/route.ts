import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const store = await cookies();

  store.delete("jwt");
  store.delete("jwtToken");

  return NextResponse.json({ message: "Logged out" });
}
