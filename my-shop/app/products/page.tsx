import ProductsList from "@/components/Products/ProductsList";

export default async function ProductsPage(props: {
  searchParams: Promise<{ categorySlug?: string }>;
}) {
  const { categorySlug } = await props.searchParams;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {categorySlug ? `Category: ${categorySlug}` : "All Products"}
      </h1>

      <ProductsList categorySlug={categorySlug} />
    </div>
  );
}
