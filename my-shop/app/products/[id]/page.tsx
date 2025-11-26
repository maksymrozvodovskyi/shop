import ProductDetailsClient from "./ProductDetailsClient";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;

  return <ProductDetailsClient id={id} />;
}
