import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CheckoutPayload } from "@/lib/types/order";

export async function POST(req: Request) {
  try {
    const body: CheckoutPayload = await req.json();

    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt")?.value;
    const userId = cookieStore.get("user_id")?.value;

    if (!jwt || !userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = {
      data: {
        total: Number(body.total),
        orderStatus: "pending",
        shippingAddress: body.shippingAddress,
      },
    };

    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const orderJson = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json(orderJson, { status: orderRes.status });
    }

    const orderId = orderJson.data.documentId || orderJson.data.id;

    const orderItemsPromises = body.items.map(async (item) => {
      const itemRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order-items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: {
              quantity: item.quantity,
              price: item.price,
              product: item.product,
              order: orderId,
            },
          }),
        }
      );

      if (!itemRes.ok) {
        const errorData = await itemRes.json().catch(() => ({}));
        throw new Error(
          `Failed to create order item: ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      return itemRes.json();
    });

    await Promise.all(orderItemsPromises);

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
