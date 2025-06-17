"use client";

import React from "react";
import DataTable from "@/components/data-table";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

type Props = {
  customers: any[];
};

const CustomersTable = ({ customers }: Props) => {
  const { storeId } = useParams();
  const router = useRouter();

  const colStyle = {
    status: {
      new: "bg-green-500/20 text-sm dark:bg-green-500/10 text-green-500 rounded-full px-3 py-0.5",
      active: "bg-blue-500/20 text-sm dark:bg-blue-500/10 text-blue-500 rounded-full px-3 py-0.5",
      premium: "bg-purple-500/20 text-sm dark:bg-purple-500/10 text-purple-500 rounded-full px-3 py-0.5",
    },
  };

  const handleViewCustomer = (customer: any) => {
    router.push(`/dashboard/stores/${storeId}/customers/${customer.custom_id}`);
  };

  return (
    <>
      <DataTable
        enableSearch
        showActions
        data={customers}
        pageSize={10}
        defaultHide={["id", "created_at", "updated_at", "store_id"]}
        sortableCols={["name", "email", "total_spent", "orders_count"]}
        colStyle={colStyle}
        onView={handleViewCustomer}
      />
    </>
  );
};

export default CustomersTable; 