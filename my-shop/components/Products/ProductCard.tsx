import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  documentId: string;
  title: string;
  price: number;
  imageUrl: string | null;
}

export default function ProductCard({
  documentId,
  title,
  price,
  imageUrl,
}: Props) {
  return (
    <div className="border rounded-lg bg-white hover:shadow-md transition p-6 flex flex-col">
      <div className="relative w-full h-64 mb-4 bg-white flex items-center justify-center">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain p-2"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md" />
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>

      <p className="font-bold text-gray-800 text-xl mb-4">{price} $</p>

      <Link
        href={`/products/${documentId}`}
        className="mt-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-center hover:bg-blue-700 transition"
      >
        Buy
      </Link>
    </div>
  );
}
