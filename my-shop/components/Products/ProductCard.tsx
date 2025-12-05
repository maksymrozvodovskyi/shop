import Image from "next/image";
import Link from "next/link";

export type ProductCardPropsType = {
  id: number;
  documentId: string;
  title: string;
  price: number;
  imageUrl: string | null;
};

export default function ProductCard({
  documentId,
  title,
  price,
  imageUrl,
}: ProductCardPropsType) {
  return (
    <div className="border rounded-lg p-6 flex flex-col">
      <div className="relative w-full h-64 mb-4">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            unoptimized
          />
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="font-bold text-xl mb-4">{price} $</p>

      <Link
        href={`/products/${documentId}`}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md text-center"
      >
        Buy
      </Link>
    </div>
  );
}
