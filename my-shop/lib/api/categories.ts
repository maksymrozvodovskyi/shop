import { apiGet } from "../api";
import type { CategoryType } from "../types/category";
import type { StrapiListResponseType } from "../types/strapi";

export type RawCategoryType = {
  id: number;
  documentId: string;
  name: string;
  categoryName: string;
  description: string;
};

export async function getCategories(): Promise<CategoryType[]> {
  const res = await apiGet<StrapiListResponseType<RawCategoryType>>(
    "/categories"
  );

  return res.data.map((item) => ({
    id: item.id,
    categoryId: item.documentId,
    name: item.name,
    categorySlug: item.categoryName,
    description: item.description,
  }));
}
