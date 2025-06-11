import { getSession } from "@/actions/getSession";
import { checkStore } from "@/data/stores";
import { redirect } from "next/navigation";

type StoreLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ storeId: string; locale: string }>;
};

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const { storeId, locale } = await params;
  const { user, token } = await getSession();

  const validateStore = await checkStore(user?.user_id, token, Number(storeId));

  if (!validateStore) {
    redirect(`/${locale}/dashboard/stores`);
  }

  return <>{children}</>;
}
