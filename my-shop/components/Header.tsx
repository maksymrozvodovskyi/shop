import Link from "next/link";
import AuthNavigation from "./AuthNavigation";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Shop
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="hover:text-blue-600 transition">
            Catalog
          </Link>

          <Link href="/orders" className="hover:text-blue-600 transition">
            Orders
          </Link>

          <AuthNavigation />
        </nav>
      </div>
    </header>
  );
}
