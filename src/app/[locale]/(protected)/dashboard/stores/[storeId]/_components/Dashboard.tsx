"use client";
import React, { useState } from "react";
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

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({
    start: "2024-01-01",
    end: "2024-12-31",
  });

  // Mock data - replace with your API calls
  const mockData = {
    summary: {
      totalRevenue: 145650.75,
      totalProducts: 1247,
      totalOrders: 3456,
      revenueChange: 12.5,
      productsChange: 5.2,
      ordersChange: 8.7,
    },
    monthlySales: [
      { month: "Jan", sales: 12500 },
      { month: "Feb", sales: 15200 },
      { month: "Mar", sales: 18700 },
      { month: "Apr", sales: 16800 },
      { month: "May", sales: 22400 },
      { month: "Jun", sales: 25600 },
      { month: "Jul", sales: 24800 },
      { month: "Aug", sales: 28900 },
      { month: "Sep", sales: 26300 },
      { month: "Oct", sales: 31200 },
      { month: "Nov", sales: 29800 },
      { month: "Dec", sales: 33450 },
    ],
    latestOrders: [
      {
        id: "#ORD-2024-001",
        customer: "Sarah Johnson",
        amount: 299.99,
        status: "completed",
        date: "2024-06-16",
      },
      {
        id: "#ORD-2024-002",
        customer: "Michael Chen",
        amount: 149.5,
        status: "processing",
        date: "2024-06-16",
      },
      {
        id: "#ORD-2024-003",
        customer: "Emma Wilson",
        amount: 89.99,
        status: "shipped",
        date: "2024-06-15",
      },
      {
        id: "#ORD-2024-004",
        customer: "James Miller",
        amount: 199.99,
        status: "completed",
        date: "2024-06-15",
      },
      {
        id: "#ORD-2024-005",
        customer: "Lisa Anderson",
        amount: 75.25,
        status: "processing",
        date: "2024-06-15",
      },
    ],
    latestCustomers: [
      {
        id: 1,
        name: "Alex Thompson",
        email: "alex@email.com",
        orders: 3,
        totalSpent: 450.75,
        joinDate: "2024-06-16",
      },
      {
        id: 2,
        name: "Maria Garcia",
        email: "maria@email.com",
        orders: 1,
        totalSpent: 125.99,
        joinDate: "2024-06-15",
      },
      {
        id: 3,
        name: "David Kim",
        email: "david@email.com",
        orders: 2,
        totalSpent: 299.5,
        joinDate: "2024-06-15",
      },
      {
        id: 4,
        name: "Sophie Brown",
        email: "sophie@email.com",
        orders: 5,
        totalSpent: 678.25,
        joinDate: "2024-06-14",
      },
      {
        id: 5,
        name: "Ryan Davis",
        email: "ryan@email.com",
        orders: 1,
        totalSpent: 89.99,
        joinDate: "2024-06-14",
      },
    ],
  };

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
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="border-none outline-none text-sm bg-transparent"
            />
            <span className="text-muted-foreground">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="border-none outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(mockData.summary.totalRevenue)}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    +{mockData.summary.revenueChange}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    from last period
                  </span>
                </div>
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
                  {mockData.summary.totalProducts.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    +{mockData.summary.productsChange}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    from last period
                  </span>
                </div>
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
                  {mockData.summary.totalOrders.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-violet-500 mr-1" />
                  <span className="text-sm text-violet-600 dark:text-violet-400 font-medium">
                    +{mockData.summary.ordersChange}%
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">
                    from last period
                  </span>
                </div>
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
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.monthlySales}>
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
                    formatter={(value: any) => [formatCurrency(value), "Sales"]}
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
          </Card>

          {/* Latest Orders */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Latest Orders</h3>
              <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1">
                View All <Eye className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {mockData.latestOrders.map((order) => (
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
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium">Customer</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Orders</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 font-medium">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {mockData.latestCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{customer.name}</span>
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
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
