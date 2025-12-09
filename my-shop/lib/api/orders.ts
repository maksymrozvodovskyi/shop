import { CheckoutPayload, CheckoutResponse } from "@/lib/types/order";

export async function getOrders() {
  const res = await fetch("/api/orders", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load orders");
  }

  const json = await res.json();

  if (Array.isArray(json)) {
    return json;
  }

  return Array.isArray(json.data) ? json.data : [];
}

export async function checkout(
  payload: CheckoutPayload
): Promise<CheckoutResponse> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  let json: CheckoutResponse | { error: string };
  try {
    json = await res.json();
  } catch {
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    const errorMessage = (json as { error: string }).error || "Checkout failed";
    throw new Error(errorMessage);
  }

  return json as CheckoutResponse;
}
