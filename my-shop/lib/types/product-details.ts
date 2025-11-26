import type { StrapiRichText } from "./strapi-rich-text";

export interface ProductDetails {
  id: number;
  documentId: string;
  title: string;
  description: StrapiRichText;
  price: number;
  salePrice: number | null;
  brand: string;
  color: string;
  storage: string;
  chipset: string;
  stock: number;
  imageUrl: string | null;
}
