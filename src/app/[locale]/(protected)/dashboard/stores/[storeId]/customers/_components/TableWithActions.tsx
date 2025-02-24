/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DataTable from "@/components/data-table";
import { toast } from "sonner";

type Props = {
  products: any[];
};

const TableWithActions = ({ products }: Props) => {
  const handleEdit = (item: any) => {
    console.log(item);
    toast.success("product edited successfully");
  };

  const handleDelete = (item: any) => {
    console.log(item);
    toast.success("product deleted successfully");
  };

  const colStyle = {
    status: {
      new: "bg-green-500/20 text-sm dark:bg-green-500/10 text-green-500 rounded-full px-3 py-0.5",
      active:
        "bg-blue-500/20 text-sm dark:bg-blue-500/10 text-blue-500 rounded-full px-3 py-0.5",
      premium:
        "bg-purple-500/20 text-sm dark:bg-purple-500/10 text-purple-500 rounded-full px-3 py-0.5",
    },
  };

  return (
    <DataTable
      enableSearch
      colStyle={colStyle}
      data={products}
      pageSize={10}
      showActions
      hiddenCols={["id", "storeId", "categoryId", "createdAt"]}
      sortableCols={["name", "price", "category"]}
      priority={{
        name: 1,
        description: 2,
        price: 3,
        category: 4,
      }}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default TableWithActions;
