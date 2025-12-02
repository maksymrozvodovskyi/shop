import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query-keys";
import { getOrders } from "../api/orders";
import { OrderType } from "../types/order";

export function useOrders() {
  return useQuery<OrderType[]>({
    queryKey: [QUERY_KEYS.ORDERS],
    queryFn: getOrders,
  });
}
