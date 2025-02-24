import DataTable from "@/components/data-table";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { BookmarkPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const CategoriesPage = () => {
  const t = useTranslations("CategoriesPage");

  const data = [
    { id: 1, name: "Electronics", description: "Gadgets and devices" },
    { id: 2, name: "Footwear", description: "Shoes and sandals" },
    {
      id: 3,
      name: "Outdoor Gear",
      description: "Equipment for outdoor activities",
    },
    {
      id: 4,
      name: "Fitness",
      description: "Fitness equipment and accessories",
    },
    {
      id: 5,
      name: "Accessories",
      description: "Phone and computer accessories",
    },
    {
      id: 6,
      name: "Home Office",
      description: "Furniture and office supplies",
    },
    { id: 7, name: "Gaming", description: "Gaming gear and peripherals" },
    { id: 8, name: "Kitchen", description: "Kitchen appliances and utensils" },
    { id: 9, name: "Stationery", description: "Office and school supplies" },
  ];

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Categories">
        <Button size="sm">
          <BookmarkPlus />
          {t("action")}
        </Button>
      </DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={data}
        pageSize={10}
        defaultHide={["id"]}
        sortableCols={["name", "description"]}
      />
    </AnimatedDashboardPage>
  );
};

export default CategoriesPage;
