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
