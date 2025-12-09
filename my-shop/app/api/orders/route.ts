import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const userId = cookieStore.get("user_id")?.value;

    if (!jwt || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/orders`;
    const params = new URLSearchParams({
      populate: "*",
      publicationState: "live",
    });

    const url = `${baseUrl}?${params.toString()}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const responseText = await res.text();

    if (!res.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { message: responseText };
      }
      console.error("Orders API error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch orders", details: errorData },
        { status: res.status }
      );
    }

    let json;
    try {
      json = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from server" },
        { status: 500 }
      );
    }

    return NextResponse.json(json.data ?? []);
  } catch (error) {
    console.error("Orders route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
