import React from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { getStoreCustomers } from "@/data/customers";
import CustomersWrapper from "./_components/CustomersWrapper";

interface PageProps {
  params: Promise<{ storeId: string }>;
}

const CustomersPage = async ({ params }: PageProps) => {
  const { storeId } = await params;
  
  try {
    const customers = await getStoreCustomers(Number(storeId));
    
    return (
      <AnimatedDashboardPage>
        <DashboardPageHeader title="Customers">
          <Button size="sm">
            <UserPlus />
            Add Customer
          </Button>
        </DashboardPageHeader>
        <CustomersWrapper customers={customers} />
      </AnimatedDashboardPage>
    );
  } catch (error) {
    console.error('Error in CustomersPage:', error);
    
    return (
      <AnimatedDashboardPage>
        <DashboardPageHeader title="Customers">
          <Button size="sm" disabled>
            <UserPlus />
            Add Customer
          </Button>
        </DashboardPageHeader>

        <CustomersWrapper 
          customers={[]} 
          error="Failed to load customers. Please try refreshing the page." 
        />
      </AnimatedDashboardPage>
    );
  }
};

export default CustomersPage;
