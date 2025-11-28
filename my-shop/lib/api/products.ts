import { apiGet } from "../api";
import type { ProductRawType } from "../types/product";
import type { ProductType } from "../types/product";
import type { ProductDetailsType } from "../types/product-details";
import type { StrapiListResponseType } from "../types/strapi";

export async function getProductsList(
  categorySlug?: string
): Promise<ProductType[]> {
  const filter = categorySlug
    ? `&filters[category][categoryName][$eq]=${categorySlug}`
    : "";

  const res = await apiGet<StrapiListResponseType<ProductRawType>>(
    `/products?populate=*${filter}`
  );

  return res.data.map((item) => {
    const img = item.images?.[0]?.url || null;
    const imageUrl = img ? `${process.env.NEXT_PUBLIC_API_URL}${img}` : null;

    return {
      id: item.id,
      productId: item.productId,
      title: item.title,
      price: item.price,
      imageUrl,
    };
  });
}

export async function getProductById(
  productId: string
): Promise<ProductDetailsType> {
  const res = await apiGet(`/products/${productId}?populate=*`);
  const item = res.data;

  const img = item.images?.[0]?.url || null;
  const imageUrl = img ? `${process.env.NEXT_PUBLIC_API_URL}${img}` : null;

  return {
    id: item.id,
    productId: item.productId,
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
