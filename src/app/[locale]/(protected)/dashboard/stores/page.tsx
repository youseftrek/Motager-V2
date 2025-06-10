import { buttonVariants } from "@/components/ui/button";
import AnimatedDashboardPage from "../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import { CirclePlus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import StoreCards from "./_components/StoreCards";
import { getTranslations } from "next-intl/server";
import { getStores } from "@/data/stores";
import { getSession } from "@/actions/get-session";
import { StoresInitializer } from "../_components/StoresInitializer";

export default async function StoresPage() {
  const t = await getTranslations("StoresPage");
  const { token, user } = await getSession();
  const stores = await getStores(user?.user_id, token);
  console.log(stores);

  return (
    <div className="p-2 md:p-4 h-[calc(100vh-64px)] lg:h-[calc(100vh-70px)]">
      <StoresInitializer stores={stores.data} />
      <AnimatedDashboardPage>
        <DashboardPageHeader title={t("title")} description={t("description")}>
          <Link
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "flex gap-2"
            )}
            href="stores/new"
          >
            <CirclePlus />
            {t("createStore")}
          </Link>
        </DashboardPageHeader>

        <StoreCards stores={stores.data} />
      </AnimatedDashboardPage>
    </div>
  );
}
