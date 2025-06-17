import React from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { FileBox } from "lucide-react";
import { getStoreOrders } from "@/data/orders";
import OrdersWrapper from "./_components/OrdersWrapper";

interface PageProps {
  params: Promise<{ storeId: string }>;
}

const OrdersPage = async ({ params }: PageProps) => {
  const { storeId } = await params;
  
  try {
    const orders = await getStoreOrders(Number(storeId));
    
    return (
      <AnimatedDashboardPage>
        <DashboardPageHeader title="Orders">
          <Button size="sm">
            <FileBox />
            Action
          </Button>
        </DashboardPageHeader>

        <OrdersWrapper orders={orders} />
      </AnimatedDashboardPage>
    );
  } catch (error) {
    console.error('Error in OrdersPage:', error);
    
    return (
      <AnimatedDashboardPage>
        <DashboardPageHeader title="Orders">
          <Button size="sm" disabled>
            <FileBox />
            Action
          </Button>
        </DashboardPageHeader>

        <OrdersWrapper 
          orders={[]} 
          error="Failed to load orders. Please try refreshing the page." 
        />
      </AnimatedDashboardPage>
    );
  }
};

export default OrdersPage;
