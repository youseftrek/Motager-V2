"use client";

import { useState } from "react";
import DataTable from "@/components/data-table";
import { useDeleteProductMutation } from "@/redux/features/products/productsApi";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import DeleteProductDialog from "./DeleteProductDialog";

type Props = {
  products: any[];
  storeId: string;
};

const ProductsTable = ({ products, storeId }: Props) => {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    product: any | null;
  }>({
    isOpen: false,
    product: null,
  });

  const handleView = (item: any) => {
    router.push(`/dashboard/stores/${storeId}/products/${item.id}`);
  };

  const handleEdit = (item: any) => {
    router.push(`/dashboard/stores/${storeId}/products/${item.id}/edit`);
  };

  const handleDelete = (item: any) => {
    setDeleteDialog({
      isOpen: true,
      product: item,
    });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      await deleteProduct({ 
        storeId: Number(storeId), 
        productId: deleteDialog.product.id 
      });
      toast.success("Product deleted successfully");
      setDeleteDialog({ isOpen: false, product: null });
      // Refresh the page to update the table
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ isOpen: false, product: null });
  };

  return (
    <>
      <DataTable
        enableSearch
        showActions
        data={products}
        pageSize={8}
        defaultHide={["id", "category", "published", "images_url"]}
        hiddenCols={["collection_ids", "has_variants"]}
        sortableCols={["products", "name"]}
        ImgCols={["main_image_url"]}
        priority={{ main_image_url: 1 }}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteProductDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        productName={deleteDialog.product?.name || ""}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ProductsTable; 