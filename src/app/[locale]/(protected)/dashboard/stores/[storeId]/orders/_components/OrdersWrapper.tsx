"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FileBox, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import OrdersTable from "./OrdersTable";

type Props = {
  orders: any[];
  isLoading?: boolean;
  error?: string | null;
};

const OrdersWrapper = ({ orders, isLoading = false, error = null }: Props) => {
  const t = useTranslations("OrdersPage");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <p className="text-destructive">Failed to load orders</p>
          <p className="text-sm text-muted-foreground">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return <OrdersTable orders={orders} />;
};

export default OrdersWrapper; 