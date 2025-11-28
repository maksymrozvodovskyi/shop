import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "../api/products";
import type { ProductType } from "../types/product";
import { QUERY_KEYS } from "../query-keys";

export function useProducts(categorySlug?: string) {
  return useQuery<ProductType[]>({
    queryKey: [QUERY_KEYS.PRODUCTS, categorySlug],
    queryFn: () => getProductsList(categorySlug),
  });
}
