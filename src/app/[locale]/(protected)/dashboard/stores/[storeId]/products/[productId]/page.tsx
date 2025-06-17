import { getStoreCategories } from "@/data/get-store-categories";
import { getSingleProduct } from "@/data/products";
import ProductView from "./_components/ProductView";

type Props = {
  params: Promise<{ storeId: number; productId: number }>;
};

export default async function ViewProductPage({ params }: Props) {
  const { storeId, productId } = await params;
  const categories = (await getStoreCategories(Number(storeId))) ?? [];
  const product = await getSingleProduct(Number(storeId), Number(productId));
  console.log(product);
  

  if (!product) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return <ProductView product={product} categories={categories} />;
} 