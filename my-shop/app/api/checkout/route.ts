import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;

    if (!jwt) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            total: body.total,
            orderStatus: "pending",
            shippingAddress: body.shippingAddress,
          },
        }),
      }
    );

    const orderJson = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json(orderJson, { status: orderRes.status });
    }

    const orderId = orderJson.data.id;

    for (const item of body.items) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            quantity: item.quantity,
            price: item.price,
            product: item.documentId,
            order: orderId,
          },
        }),
      });
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
