import { getSingleOrder } from "@/data/orders";
import OrderView from "./_components/OrderView";

type Props = {
  params: Promise<{ storeId: number; orderId: number }>;
};

export default async function ViewOrderPage({ params }: Props) {
  const { storeId, orderId } = await params;
  
  const order = await getSingleOrder(Number(storeId), Number(orderId));

  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Order not found</p>
      </div>
    );
  }

  return <OrderView order={order} />;
} 