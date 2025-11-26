import { apiGet } from "../api";
import { ProductRaw } from "../types/product";
import { ProductDetails } from "../types/product-details";
import { StrapiListResponse } from "../types/strapi";

export async function fetchProducts(category?: string) {
  const filter = category
    ? `&filters[category][categoryName][$eq]=${category}`
    : "";

  const data = await apiGet<StrapiListResponse<ProductRaw>>(
    `/products?populate=*${filter}`
  );

  return data.data.map((item) => {
    const img = item.images?.[0]?.url || null;
    const imageUrl = img ? `${process.env.NEXT_PUBLIC_API_URL}${img}` : null;

    return {
      id: item.id,
      documentId: item.documentId,
      title: item.title,
      price: item.price,
      imageUrl,
    };
  });
}

export async function fetchProduct(
  documentId: string
): Promise<ProductDetails> {
  const data = await apiGet(`/products/${documentId}?populate=*`);
  const item = data.data;

  const img = item.images?.[0]?.url || null;
  const imageUrl = img ? `${process.env.NEXT_PUBLIC_API_URL}${img}` : null;

  return {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    price: item.price,
    salePrice: item.salePrice,
    brand: item.brand,
    color: item.color,
    storage: item.storage,
    chipset: item.chipset,
    stock: item.stock,
    imageUrl,
  };
}
