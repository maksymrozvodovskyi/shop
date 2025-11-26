import { apiGet } from "../api";
import type { Category } from "../types/category";
import type { StrapiListResponse } from "../types/strapi";

interface RawCategory {
  id: number;
  documentId: string;
  name: string;
  categoryName: string;
  description: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await apiGet<StrapiListResponse<RawCategory>>("/categories");

  return res.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    name: item.name,
    categoryName: item.categoryName,
    description: item.description,
  }));
}
