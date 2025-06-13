import React from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import DataTable from "@/components/data-table";
import { getStoreProducts } from "@/data/products";

interface PageProps {
  params: Promise<{ storeId: string }>
}
const ProductsPage = async ({ params }: PageProps) => {
  const {storeId} = await params
  const products = await getStoreProducts(Number(storeId)) ?? []

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader
        title="Products"
        navigateTo="new"
        navigateToTranslation={'create product'}
        navigateToIcon="PackagePlus"
      ></DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={products}
        pageSize={8}
        defaultHide={["id" , "category" , "published" , "images_url"]}
        sortableCols={["products", "name"]}
        ImgCols={["main_image_url"]}
        priority={{ main_image_url: 1 }}
      />
    </AnimatedDashboardPage>
  );
};

export default ProductsPage;
