import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { CategoryType } from "../types/category";
import { QUERY_KEYS } from "../query-keys";

export function useCategories() {
  return useQuery<CategoryType[]>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
  });
}
