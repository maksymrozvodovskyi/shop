import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage(props: {
  params: Promise<{ documentId: string }>;
}) {
  const { documentId } = await props.params;

  return <ProductDetailsClient id={documentId} />;
}
