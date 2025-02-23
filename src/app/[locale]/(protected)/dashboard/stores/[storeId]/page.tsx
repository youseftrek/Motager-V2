import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";

type StorePageProps = {
  params: Promise<{ storeId: string }>;
};

export default async function StorePage({ params }: StorePageProps) {
  const { storeId } = await params;
  return <AnimatedDashboardPage>storeId: {storeId}</AnimatedDashboardPage>;
}
