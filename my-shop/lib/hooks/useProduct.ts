import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import type { ProductDetailsType } from "../types/product-details";
import { QUERY_KEYS } from "../query-keys";

export function useProduct(productId: string) {
  return useQuery<ProductDetailsType>({
    queryKey: [QUERY_KEYS.PRODUCT, productId],
    queryFn: () => getProductById(productId),
  });
}
