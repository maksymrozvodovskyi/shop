import type { StrapiRichTextType } from "./strapi-rich-text";

export type ProductType = {
  id: number;
  documentId: string;
  title: string;
  price: number;
  imageUrl: string | null;
};

export type ProductRawType = {
  id: number;
  documentId: string;
  title: string;
  productTitle: string;
  description: StrapiRichTextType;
  price: number;
  salePrice: number | null;
  brand: string;
  color: string;
  storage: string;
  chipset: string;
  stock: number;
  images?: Array<{
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  }>;
};
