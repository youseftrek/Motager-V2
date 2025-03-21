import { ProductFormProvider } from "@/providers/product-form";
import AnimatedDashboardPage from "../../../../_components/AnimatedDashboardPage";
import ProductForm from "./_components/ProductForm";

export default function page() {
  return (
    <AnimatedDashboardPage>
      <ProductFormProvider>
        <ProductForm />
      </ProductFormProvider>
    </AnimatedDashboardPage>
  );
}
