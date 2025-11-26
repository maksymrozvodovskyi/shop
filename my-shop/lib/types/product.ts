import { StrapiRichText } from "./strapi-rich-text";

export interface Product {
  id: number;
  documentId: string;
  title: string;
  price: number;
  imageUrl: string | null;
}

export interface ProductRaw {
  id: number;
  documentId: string;
  title: string;
  productTitle: string;
  description: StrapiRichText;
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
}
