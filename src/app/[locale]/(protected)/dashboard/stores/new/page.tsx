import { getCategories } from "@/data/categories";
import ClientForm from "./_components/ClientForm";

export default async function NewStorePage() {
  const categories = await getCategories();

  return <ClientForm categories={categories} />;
}
