"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Home, User, Calendar, Hash, CreditCard, Mail, Phone } from "lucide-react"
import { Link } from "@/i18n/routing"

export default function PaymentSuccessPage({data}:any) {
  // Mock transaction data - in real app this would come from props or API

  const user = data.data.userPlanPayment.user;
  const plan = data.data.userPlanPayment.plan;
  const charge = data.data.charge;  
  const transactionData = {
    amount: plan.price,
    items: [
      {
        name: plan.name,
        description: plan.description,
        quantity: 1,
        price: plan.price,
      },
    ],
    subtotal: plan.price,
    tax: 0,
    total: plan.price,
  }
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      timeZone: 'UTC',
      hour12: false,
    });
  };
  return (
    <div className="min-h-screen bg-background">

      <main className="container py-8 mx-auto mt-5 ">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thank you for choosing Motager! Your payment has been processed successfully and your store features are
              now active.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Transaction Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5 text-emerald-600" />
                  Transaction Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <Badge variant="secondary" className="font-mono">
                    {charge.id}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount Paid</span>
                  <span className="font-semibold text-lg">
                    {charge.amount.toFixed(2)} {charge.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date & Time
                  </span>
                  <div className="text-right">
                    <div className="font-medium">{formatDate(charge.transaction.date.completed)}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Payment Method
                  </span>
                  <span className="font-mono">**** **** **** {charge.card.last_four}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                  <span className="text-sm">{user.email}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                    COMPLETED
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactionData.items.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">{Number(plan.price).toFixed(2)}</span>
                      </div>
                      {index < transactionData.items.length - 1 && <Separator className="mt-3" />}
                    </div>
                  ))}

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${Number(transactionData.subtotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{Number(transactionData.tax).toFixed(2)}EGP</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{charge.amount.toFixed(2)}EGP </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard/stores">
              <Button size="lg" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white">
                <User className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-emerald-200 hover:bg-emerald-50 dark:border-emerald-800 dark:hover:bg-emerald-900/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>

            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
            </Link>
          </div>

          {/* Next Steps */}
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="font-semibold text-xl">What's Next?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your Motager Pro features are now active! You'll receive a confirmation email shortly with your
                  receipt and getting started guide. Ready to build your dream store?
                </p>

                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">1</span>
                    </div>
                    <h4 className="font-medium mb-1">Set Up Your Store</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose from premium templates and customize your store
                    </p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">2</span>
                    </div>
                    <h4 className="font-medium mb-1">Add Your Products</h4>
                    <p className="text-sm text-muted-foreground">Upload products and set up your inventory</p>
                  </div>

                  <div className="text-center p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">3</span>
                    </div>
                    <h4 className="font-medium mb-1">Launch & Sell</h4>
                    <p className="text-sm text-muted-foreground">Go live and start selling to customers worldwide</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">Need help getting started?</p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Link href="/support">
                      <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact Support
                      </Button>
                    </Link>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <Link href="/help">
                      <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
                        Help Center
                      </Button>
                    </Link>
                    <span className="text-muted-foreground hidden sm:inline">•</span>
                    <Link href="/tutorials">
                      <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
                        Video Tutorials
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>© 2024 Motager. All rights reserved.</p>
            <p className="mt-1">
              Questions? Contact us at{" "}
              <Link
                href="mailto:support@motager.com"
                className="text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                support@motager.com
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
