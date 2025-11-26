import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products";
import { ProductDetails } from "../types/product-details";

export function useProduct(documentId: string) {
  return useQuery<ProductDetails>({
    queryKey: ["product", documentId],
    queryFn: () => fetchProduct(documentId),
  });
}
