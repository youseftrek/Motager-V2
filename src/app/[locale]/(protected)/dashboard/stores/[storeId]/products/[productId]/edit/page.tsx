import { getStoreCategories } from "@/data/get-store-categories";
import { getSingleProduct } from "@/data/products";
import ClientEditForm from "./_components/ClientEditForm";

type Props = {
  params: Promise<{ storeId: number; productId: number }>;
};

export default async function EditProductPage({ params }: Props) {
  const { storeId, productId } = await params;
  const categories = (await getStoreCategories(Number(storeId))) ?? [];
  const product = await getSingleProduct(Number(storeId), Number(productId));

  return <ClientEditForm categories={categories || []} product={product} />;
} 