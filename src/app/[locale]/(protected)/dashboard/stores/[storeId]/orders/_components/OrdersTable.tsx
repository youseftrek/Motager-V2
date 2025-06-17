"use client";

import React, { useState } from "react";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FileBox } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useDeleteOrderMutation } from "@/redux/features/orders/orderApi";
import { toast } from "sonner";
import DeleteOrderDialog from "./DeleteOrderDialog";

type Props = {
  orders: any[];
};

const OrdersTable = ({ orders }: Props) => {
  const t = useTranslations("OrdersPage");
  const router = useRouter();
  const { storeId } = useParams();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    order: any | null;
  }>({
    isOpen: false,
    order: null,
  });

  const handleView = (item: any) => {
    router.push(`/dashboard/stores/${storeId}/orders/${item.order_id}`);
  };

  const handleEdit = (item: any) => {
    // TODO: Implement edit order functionality
    console.log('Edit order:', item);
  };

  const handleDelete = (item: any) => {
    setDeleteDialog({
      isOpen: true,
      order: item,
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.order) return;

    try {
      await deleteOrder({ 
        storeId: Number(storeId), 
        orderId: deleteDialog.order.order_id 
      });
      toast.success("Order deleted successfully");
      setDeleteDialog({ isOpen: false, order: null });
      // Refresh the page to update the table
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, order: null });
  };

  const colStyle = {
    status: {
      completed:
        "bg-green-600/20 text-sm dark:bg-green-600/10 text-green-600 rounded-full px-3 py-0.5",
      pending:
        "bg-yellow-500/20 text-sm dark:bg-yellow-500/10 text-yellow-500 rounded-full px-3 py-0.5",
      cancelled:
        "bg-red-500/20 text-sm dark:bg-red-500/10 text-red-500 rounded-full px-3 py-0.5",
      processing:
        "bg-blue-400/20 text-sm dark:bg-blue-400/10 text-blue-400 rounded-full px-3 py-0.5",
    },
  };

  return (
    <>
      <DataTable
        enableSearch
        showActions
        data={orders}
        pageSize={10}
        defaultHide={["id" , "created_at" , "updated_at" , "store_id" , "store_name" , "address"]}
        sortableCols={["orderNumber", "customer", "total", "status"]}
        colStyle={colStyle}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteOrderDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        orderNumber={deleteDialog.order?.order_id || ""}
        isLoading={isDeleting}
      />
    </>
  );
};

export default OrdersTable; 