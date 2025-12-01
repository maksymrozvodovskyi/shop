import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const jwt = cookieStore.get("jwt")?.value;
  const userId = cookieStore.get("user_id")?.value;

  if (!jwt || !userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/orders?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: "no-store",
    }
  );

  const json = await res.json();
  console.log("Orders fetch response:", json.data);

  if (!json?.data) {
    return NextResponse.json({ data: [] });
  }

  return NextResponse.json({ data: json.data });
}
