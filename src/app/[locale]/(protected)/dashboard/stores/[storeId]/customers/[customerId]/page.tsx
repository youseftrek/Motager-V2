import { getSingleCustomer } from "@/data/customers";
import CustomerView from "./_components/CustomerView";

type Props = {
  params: Promise<{ storeId: number; customerId: number }>;
};

export default async function ViewCustomerPage({ params }: Props) {
  const { storeId, customerId } = await params;
  console.log('Viewing customer:', customerId, 'from store:', storeId);
  
  const customer = await getSingleCustomer(Number(storeId), Number(customerId));

  if (!customer) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Customer not found</p>
      </div>
    );
  }

  return <CustomerView customer={customer} />;
} 