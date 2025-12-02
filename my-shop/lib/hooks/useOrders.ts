"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { getOrders } from "../api/orders";

export function useOrders() {
  return useQuery({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: getOrders,
  });
}
