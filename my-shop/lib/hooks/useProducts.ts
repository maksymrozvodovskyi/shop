import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { Product } from "../types/product";

export function useProducts(category?: string) {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });
}
