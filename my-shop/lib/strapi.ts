import { api } from "./api";

export async function getProducts() {
  const res = await api.get("/api/products?populate=*");
  return res.data.data;
}

export async function getProductBySlug(slug: string) {
  const res = await api.get(
    `/api/products?filters[slug][$eq]=${slug}&populate=*`
  );
  return res.data.data[0];
}

export async function getCategories() {
  const res = await api.get("/api/categories?populate=*");
  return res.data.data;
}
