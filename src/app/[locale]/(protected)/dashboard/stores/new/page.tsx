import { getCategories } from "@/data/categories";
import ClientForm from "./_components/ClientForm";
import { getSession } from "@/actions/getSession";

export default async function NewStorePage() {
  const categories = await getCategories();
  const { token } = await getSession();

  return <ClientForm categories={categories} token={token!} />;
}
