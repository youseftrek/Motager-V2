import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import { UserBanner } from "./_components/UserBanner";
import { getStores } from "@/data/stores";
import { getSession } from "@/actions/getSession";
import { StoresInitializer } from "../../_components/StoresInitializer";
import Dashboard from "./_components/Dashboard";

type StorePageProps = {
  params: Promise<{ storeId: string; locale: string }>;
};

export default async function StorePage() {
  const { user, token } = await getSession();
  const storesResponse = await getStores(user?.user_id, token);

  return (
    <>
      <StoresInitializer stores={storesResponse.data} />
      <AnimatedDashboardPage>
        <UserBanner userName={user.name} />
        <Dashboard />
      </AnimatedDashboardPage>
    </>
  );
}
