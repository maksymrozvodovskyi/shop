"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";

export function useOrders() {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: async () => {
      const res = await fetch("/api/orders", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load orders");
      const json = await res.json();
      return json.data ?? [];
    },
  });
}
