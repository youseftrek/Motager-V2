import { getStoreCategories } from "@/data/get-store-categories";
import ClientForm from "./_components/ClientForm";

type Props = {
  params: Promise<{ storeId: number }>;
};

export default async function NewProductPage({ params }: Props) {
  const { storeId } = await params;
  const categories = (await getStoreCategories(Number(storeId))) ?? [];

  return <ClientForm categories={categories || []} />;
}
