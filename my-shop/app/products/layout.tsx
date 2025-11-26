import Link from "next/link";
import { fetchCategories } from "@/lib/api/categories";
import type { Category } from "@/lib/types/category";

export default async function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories: Category[] = await fetchCategories();

  return (
    <div className="flex gap-8">
      <aside className="w-64 border-r pr-4">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>

        <ul className="space-y-2">
          <li>
            <Link
              href="/products"
              className="text-blue-600 hover:underline block"
            >
              All products
            </Link>
          </li>

          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/products?category=${c.categoryName}`}
                className="hover:underline block"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
