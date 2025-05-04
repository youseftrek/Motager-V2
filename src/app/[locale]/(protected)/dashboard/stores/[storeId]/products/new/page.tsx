import { ProductFormProvider } from "@/providers/product-form";
import AnimatedDashboardPage from "../../../../_components/AnimatedDashboardPage";
import ProductForm from "./_components/ProductForm";
import { checkAiStatus } from "@/data/ai";

export default async function page() {
  const res = await checkAiStatus();

  return (
    <AnimatedDashboardPage>
      <ProductFormProvider>
        <ProductForm isModelReady={res.success} />
      </ProductFormProvider>
    </AnimatedDashboardPage>
  );
}
