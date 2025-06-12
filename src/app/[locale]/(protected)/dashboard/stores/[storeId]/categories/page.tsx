import DataTable from "@/components/data-table";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./_components/CategoryDialog";
import { getStoreCategory } from "@/data/categories";
interface PageProps {
  params: Promise<{ storeId: string }>
}
export default async function CategoriesPage ({ params }: PageProps)  {
  const categories = await getStoreCategory(Number( (await params).storeId)) ?? [];
  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Categories">
        <CategoryDialog
          id={(await params).storeId}
          mode="create"
          trigger={
            <Button size="sm">
              <BookmarkPlus />
              {"Create category"}
            </Button>
          }
        />
      </DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={categories}
        pageSize={10}
        defaultHide={["id" , "store_id"]}
        sortableCols={["name", "description"]}
      />
    </AnimatedDashboardPage>
  );
};

