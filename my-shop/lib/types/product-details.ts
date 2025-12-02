import type { StrapiRichTextType } from "./strapi-rich-text";

export type ProductDetailsType = {
  id: number;
  documentId: string;
  title: string;
  description: StrapiRichTextType;
  price: number;
  salePrice: number | null;
  brand: string;
  color: string;
  storage: string;
  chipset: string;
  stock: number;
  imageUrl: string | null;
};
