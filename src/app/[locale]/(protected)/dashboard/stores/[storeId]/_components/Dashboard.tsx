"use client";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  User,
  Eye,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks";
import { useParams } from "next/navigation";
import { getDashboardData } from "@/data/get-dashboard-data";

const Dashboard = () => {
  const { token } = useAuth();
  const params = useParams();
  const storeId = params.storeId as string;
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-12-31",
  });
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      if (token && storeId) {
        const data = await getDashboardData(
          storeId,
          token,
          dateRange.start,
          dateRange.end
        );
        if (data) {
          setDashboardData(data);
        }
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, [token, storeId, dateRange]);

  // Use dashboardData if available, otherwise fallback to mock data
  // Mock data - replace with your API calls
  const mockData = {
    summary: {
      totalRevenue: 0,
      totalProducts: 0,
      totalOrders: 0,
      revenueChange: 0,
      productsChange: 0,
      ordersChange: 0,
    },
    monthlySales: [
      { month: "Jan", sales: 0 },
      { month: "Feb", sales: 0 },
      { month: "Mar", sales: 0 },
      { month: "Apr", sales: 0 },
      { month: "May", sales: 0 },
      { month: "Jun", sales: 0 },
      { month: "Jul", sales: 0 },
      { month: "Aug", sales: 0 },
      { month: "Sep", sales: 0 },
      { month: "Oct", sales: 0 },
      { month: "Nov", sales: 0 },
      { month: "Dec", sales: 0 },
    ],
    latestOrders: [],
    latestCustomers: [],
  };

  // Use real data if available, otherwise use mock data
  const data = dashboardData || mockData;

  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "processing":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleDateChange = (type: "start" | "end", value: string) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="min-h-screen p-6 rounded-md">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor your ecommerce performance
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-2 shadow-sm border">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="border-none outline-none text-sm bg-transparent"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="border-none outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {formatCurrency(data.summary.totalRevenue)}
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Products
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {data.summary.totalProducts.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-full">
                    <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {data.summary.totalOrders.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-violet-500/10 p-3 rounded-full">
                    <ShoppingCart className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Monthly Sales Chart */}
              <Card className="xl:col-span-2 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Monthly Sales</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Sales Revenue</span>
                  </div>
                </div>
                {data.monthlySales && data.monthlySales.length > 0 ? (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.monthlySales}>
                        <defs>
                          <linearGradient
                            id="salesGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0.3}
                            />
                            <stop
                              offset="95%"
                              stopColor="hsl(var(--primary))"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />
                        <XAxis
                          dataKey="month"
                          className="text-xs"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis
                          className="text-xs"
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "calc(var(--radius) - 2px)",
                            boxShadow: "0 0 0 1px hsl(var(--border))",
                          }}
                          formatter={(value: any) => [
                            formatCurrency(value),
                            "Sales",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          fill="url(#salesGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-80 flex flex-col items-center justify-center border border-dashed rounded-lg">
                    <TrendingUp className="h-12 w-12 text-muted-foreground/50 mb-2" />
                    <p className="text-muted-foreground">
                      No sales data available for this period
                    </p>
                  </div>
                )}
              </Card>

              {/* Latest Orders */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Latest Orders</h3>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                    View All <Eye className="w-4 h-4" />
                  </button>
                </div>
                {data.latestOrders && data.latestOrders.length > 0 ? (
                  <div className="space-y-4">
                    {data.latestOrders.map((order: any) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium">{order.id}</p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {order.customer}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-sm font-semibold">
                              {formatCurrency(order.amount)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {order.date}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center border border-dashed rounded-lg">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-2" />
                    <p className="text-muted-foreground">No recent orders</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Latest Customers */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Latest Customers</h3>
                <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                  View All <Eye className="w-4 h-4" />
                </button>
              </div>
              {data.latestCustomers && data.latestCustomers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">
                          Customer
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Orders
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Total Spent
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Join Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.latestCustomers.map((customer: any) => (
                        <tr
                          key={customer.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                              </div>
                              <span className="font-medium">
                                {customer.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {customer.email}
                          </td>
                          <td className="py-4 px-4">
                            <span className="bg-muted text-foreground px-2 py-1 rounded-full text-sm font-medium">
                              {customer.orders}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-semibold">
                            {formatCurrency(customer.totalSpent)}
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">
                            {customer.joinDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed rounded-lg">
                  <User className="h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p className="text-muted-foreground">
                    No customer data available
                  </p>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
