"use client";

import { useProduct } from "@/lib/hooks/useProduct";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cart";
import { useRouter } from "next/navigation";

export default function ProductDetailsClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useProduct(id);
  const router = useRouter();

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !data) return <p>Product not found</p>;

  const handleBuy = () => {
    addItem({
      documentId: data.documentId,
      title: data.title,
      price: data.price,
      imageUrl: data.imageUrl,
      quantity: 1,
    });

    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="relative w-full h-96 border rounded-lg">
        {data.imageUrl && (
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="object-contain"
            unoptimized
          />
        )}
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>

        <p className="text-2xl font-semibold">{data.price} $</p>

        <p className="text-gray-700">
          {data.description?.[0]?.children?.[0]?.text}
        </p>

        <button
          onClick={handleBuy}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Buy
        </button>
      </div>
    </div>
  );
}
