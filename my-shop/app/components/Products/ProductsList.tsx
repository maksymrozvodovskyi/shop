"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types/product";
import Spinner from "../Loader/Spinner";

export default function ProductsList({ category }: { category?: string }) {
  const { data, isLoading, isError } = useProducts(category);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data!.map((p: Product) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
