import React from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { getStoreProducts } from "@/data/products";
import ProductsTable from "./_components/ProductsTable";

interface PageProps {
  params: Promise<{ storeId: string }>;
}
const ProductsPage = async ({ params }: PageProps) => {
  const { storeId } = await params;
  const products = (await getStoreProducts(Number(storeId))) ?? [];

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader
        title="Products"
        navigateTo="new"
        navigateToTranslation={"create product"}
        navigateToIcon="PackagePlus"
      ></DashboardPageHeader>

      <ProductsTable products={products} storeId={storeId} />
    </AnimatedDashboardPage>
  );
};

export default ProductsPage;
