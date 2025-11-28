import ProductDetailsClient from "./ProductDetailsClient";

export type ProductPagePropsType = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductPagePropsType) {
  const { productId } = await params;

  return <ProductDetailsClient productId={productId} />;
}
