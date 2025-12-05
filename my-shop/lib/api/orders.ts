export async function getOrders() {
  const res = await fetch("/api/orders", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load orders");
  }

  const json = await res.json();

  return Array.isArray(json.data) ? json.data : [];
}

export async function checkout(payload: any) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let json = null;
  try {
    json = await res.json();
  } catch (e) {
    console.error("Response is not JSON");
  }

  if (!res.ok) {
    console.error("Checkout failed", json);
    throw new Error("Checkout failed");
  }

  return json;
}
