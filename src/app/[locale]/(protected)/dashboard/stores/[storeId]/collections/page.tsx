import DataTable from "@/components/data-table";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Grid2x2Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { getStoreCollection } from "@/data/collection";
import { getSession } from "@/actions/getSession";
interface Props {
  params: Promise<{storeId: string }>;
}
const CollectionsPage = async (props:Props) => {
  const { params } = props;
  const { storeId } = await params;
  const t = await getTranslations("CollectionsPage");
  const {token} = await getSession();
  const collections = await getStoreCollection(Number(storeId), token); // Assuming you have a way to get the token, replace "" with the actual token
  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Collections">
        <Link href={`/dashboard/stores/${storeId}/collections/new`} className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "flex items-center gap-2"
        )}>
          <Grid2x2Plus />
          {t("action")}
        </Link>
      </DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={collections}
        pageSize={15}
        defaultHide={["id"]}
        ImgCols={["image_url"]}
        priority={{image_url:1}}
        sortableCols={["products", "name"]}
      />
    </AnimatedDashboardPage>
  );
};

export default CollectionsPage;
