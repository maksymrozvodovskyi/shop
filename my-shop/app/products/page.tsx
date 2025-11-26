import ProductsList from "../components/Products/ProductsList";

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await props.searchParams;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        {category ? `Category: ${category}` : "All Products"}
      </h1>

      <ProductsList category={category} />
    </div>
  );
}
