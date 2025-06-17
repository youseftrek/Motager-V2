"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedDashboardPage from "@/app/[locale]/(protected)/dashboard/_components/AnimatedDashboardPage";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Edit, 
  User, 
  DollarSign, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ShoppingBag,
  CreditCard,
  FileText,
  TrendingUp,
  Package,
  Star
} from "lucide-react";
import { useRouter } from "@/i18n/routing";

type Props = {
  customer: any;
};

export default function CustomerView({ customer }: Props) {
  const { storeId } = useParams();
  const router = useRouter();

  const handleBack = () => {
    router.push(`/dashboard/stores/${storeId}/customers`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0001-01-01T00:00:00Z") {
      return "N/A";
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new':
        return 'bg-green-600/20 text-green-600';
      case 'active':
        return 'bg-blue-500/20 text-blue-500';
      case 'premium':
        return 'bg-purple-500/20 text-purple-500';
      case 'inactive':
        return 'bg-gray-500/20 text-gray-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-600';
      case 'completed':
        return 'bg-green-500/20 text-green-600';
      case 'cancelled':
        return 'bg-red-500/20 text-red-600';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  // Calculate total spent from orders
  const totalSpent = customer.orders?.reduce((sum: number, order: any) => {
    return sum + (order.total_price || 0);
  }, 0) || 0;

  // Calculate average order value
  const averageOrder = customer.orders?.length > 0 ? totalSpent / customer.orders.length : 0;

  return (
    <AnimatedDashboardPage>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{customer.customer_name || customer.name || 'Customer'}</h1>
              <p className="text-muted-foreground">Customer Details</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(customer.status)}>
              {customer.status || 'Active'}
            </Badge>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Customer
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-sm font-medium">{customer.customer_name || customer.name || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-sm">{customer.customer_email || customer.email || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-sm">{customer.phone_number || customer.phone || 'N/A'}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
                        <p className="text-sm font-medium">#{customer.custom_id || customer.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Customer Since</label>
                        <p className="text-sm">{formatDate(customer.created_at)}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                        <p className="text-sm">{formatDate(customer.updated_at)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-primary">
                          {customer.orders?.length || 0}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Orders</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(totalSpent)}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Spent</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(averageOrder)}
                        </p>
                        <p className="text-sm text-muted-foreground">Average Order</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      Order History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {customer.orders && customer.orders.length > 0 ? (
                      <div className="space-y-4">
                        {customer.orders.map((order: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">Order #{order.order_id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(order.created_at)}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {order.payment_method} • {order.shipping_method}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatCurrency(order.total_price || 0)}</p>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No orders found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {customer.orders && customer.orders.length > 0 ? (
                      <div className="space-y-4">
                        {customer.orders.map((order: any, index: number) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Order #{order.order_id} Address</h4>
                              <Badge variant="secondary">{order.shipping_method}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.address || 'N/A'}
                              {order.city && `, ${order.city}`}
                              {order.governorate && `, ${order.governorate}`}
                              {order.postal_code && ` ${order.postal_code}`}
                            </p>
                            {order.note && (
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Note:</strong> {order.note}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No addresses found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {customer.orders && customer.orders.length > 0 ? (
                        customer.orders.map((order: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <ShoppingBag className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Order #{order.order_id} placed</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDate(order.created_at)} • {formatCurrency(order.total_price)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground">No recent activity</p>
                        </div>
                      )}
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Account created</p>
                          <p className="text-xs text-muted-foreground">{formatDate(customer.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Customer Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Orders</span>
                  <span className="font-medium">{customer.orders?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Spent</span>
                  <span className="font-medium">{formatCurrency(totalSpent)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Average Order</span>
                  <span className="font-medium">{formatCurrency(averageOrder)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Customer Since</span>
                  <span className="font-medium">{formatDate(customer.created_at)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Customer
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" onClick={handleBack} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Customers
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Account Created</p>
                      <p className="text-xs text-muted-foreground">{formatDate(customer.created_at)}</p>
                    </div>
                  </div>
                  {customer.updated_at && customer.updated_at !== customer.created_at && customer.updated_at !== "0001-01-01T00:00:00Z" && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Last Updated</p>
                        <p className="text-xs text-muted-foreground">{formatDate(customer.updated_at)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedDashboardPage>
  );
} 