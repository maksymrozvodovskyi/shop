"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import ProductCard from "./ProductCard";
import type { ProductType } from "@/lib/types/product";
import Spinner from "../Loader/Spinner";

export default function ProductsList({
  categorySlug,
}: {
  categorySlug?: string;
}) {
  const { data, isLoading, isError } = useProducts(categorySlug);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data!.map((p: ProductType) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
