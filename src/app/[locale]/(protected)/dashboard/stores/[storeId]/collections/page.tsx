import DataTable from "@/components/data-table";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Grid2x2Plus } from "lucide-react";

const CollectionsPage = () => {
  const t = useTranslations("CollectionsPage");

  const data = [
    {
      name: "Collection 1",
      products: 10,
    },
    {
      name: "",
      products: 2,
    },
    {
      name: "Collection 2",
      products: 6,
    },
  ];
  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Collections">
        <Button size="sm">
          <Grid2x2Plus />
          {t("action")}
        </Button>
      </DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={data}
        pageSize={15}
        defaultHide={["id"]}
        sortableCols={["products", "name"]}
      />
    </AnimatedDashboardPage>
  );
};

export default CollectionsPage;
