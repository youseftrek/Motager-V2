"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, Home, ShoppingBag, Mail, CreditCard, Calendar, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PaymentSuccessProps {
  userEmail: string
  totalAmount: number
  currency?: string
  transactionId?: string
  lastFour?: string
  orderDate?: string
  total?:number
  items?: Array<{
    name: string
    quantity: number
    price: number
  }>
  store?:any
}

export default function OrderPaymentSuccess({
  userEmail = "customer@example.com",
  totalAmount = 99.99,
  currency = "USD",
  transactionId = "TXN-123456789",
  orderDate = new Date().toLocaleDateString(),
  lastFour,
  store
}: PaymentSuccessProps) {
  const tax = 0 // You can calculate tax based on your business logic

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thank you for your purchase! Your payment has been processed successfully.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-1">
          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-green-600" />
                Transaction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction ID</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {transactionId}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-semibold text-lg">
                  ${totalAmount.toFixed(2)} {currency}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </span>
                <span className="font-medium">{orderDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Method
                </span>
                <span className="font-mono text-sm">{`**** **** **** ${lastFour ?? '1234'}`}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </span>
                <span className="text-sm">{userEmail}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                  COMPLETED
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={`/shop/${store.slug}`} className={cn(buttonVariants({
            variant: "outline",
            size: "lg",
            className: "flex items-center justify-center sm:justify-start",
          }),"w-full sm:w-auto")}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>

          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>

          <Button variant="ghost" size="lg" className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>

        {/* Confirmation Message */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-xl">What's Next?</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You'll receive a confirmation email at <strong>{userEmail}</strong> with your receipt and order details.
                If you have any questions, please don't hesitate to contact our support team.
              </p>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Need help? Contact us at{" "}
                  <a href="mailto:support@example.com" className="text-green-600 hover:text-green-700 hover:underline">
                    support@example.com
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
