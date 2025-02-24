import React from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { FileBox } from "lucide-react";
import { useTranslations } from "next-intl";

const OrdersPage = () => {
  const t = useTranslations("OrdersPage");

  const data = [
    {
      id: 1,
      orderNumber: "ORD001",
      customer: "John Doe",
      total: 150.5,
      status: "Completed",
    },
    {
      id: 2,
      orderNumber: "ORD002",
      customer: "Jane Smith",
      total: 299.99,
      status: "Pending",
    },
    {
      id: 3,
      orderNumber: "ORD003",
      customer: "Alice Johnson",
      total: 75.0,
      status: "Cancelled",
    },
    {
      id: 4,
      orderNumber: "ORD004",
      customer: "Bob Brown",
      total: 220.25,
      status: "Processing",
    },
    {
      id: 5,
      orderNumber: "ORD005",
      customer: "Charlie Davis",
      total: 89.99,
      status: "Completed",
    },
    {
      id: 6,
      orderNumber: "ORD006",
      customer: "Diana Evans",
      total: 49.99,
      status: "Pending",
    },
    {
      id: 7,
      orderNumber: "ORD007",
      customer: "Eve Walker",
      total: 400.0,
      status: "Completed",
    },
    {
      id: 8,
      orderNumber: "ORD008",
      customer: "Frank Harris",
      total: 120.0,
      status: "Processing",
    },
    {
      id: 9,
      orderNumber: "ORD009",
      customer: "Grace Lee",
      total: 55.75,
      status: "Completed",
    },
  ];

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
    <AnimatedDashboardPage>
      <DashboardPageHeader title="Orders">
        <Button size="sm">
          <FileBox />
          {t("action")}
        </Button>
      </DashboardPageHeader>

      <DataTable
        enableSearch
        showActions
        data={data}
        pageSize={10}
        defaultHide={["id"]}
        sortableCols={["orderNumber", "customer", "total", "status"]}
        colStyle={colStyle}
      />
    </AnimatedDashboardPage>
  );
};

export default OrdersPage;
