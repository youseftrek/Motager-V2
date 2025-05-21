"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, CreditCard, DollarSign, Phone, ShoppingBag, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useRouter } from "@/i18n/routing"
import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage"
import DashboardPageHeader from "../../_components/DashboardPageHeader"

const storeSchema = z.object({
  categoryId: z.string().nonempty("Category is required"),
  store_name: z.string().nonempty("Store name is required"),
  description: z.string().nonempty("Description is required").min(10, "Description must be at least 10 characters"),
  business_phone: z.string().nonempty("Business phone is required"),
  plan_id: z.string().nonempty("Plan is required"),
  store_currency: z.string().nonempty("Store currency is required"),
  user_id: z.string().nonempty("User ID is required"),
})

type StoreSchemaFields = z.infer<typeof storeSchema>

const Page = () => {
  const router = useRouter()
  const form = useForm<StoreSchemaFields>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      categoryId: "",
      store_name: "",
      description: "",
      business_phone: "",
      plan_id: "",
      store_currency: "",
      user_id: "",
    },
  })

  const onSubmit = async (data: StoreSchemaFields) => {
    try {
      console.log(data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Success message
      toast.success("Store created successfully!")
      
      // Redirect to stores page
      router.push("/dashboard/stores")
    } catch (error) {
      console.error("Error creating store:", error)
      toast.error("Failed to create store. Please try again.")
    }
  }

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader 
        title="Create Your Store" 
        description="Fill in the details to set up your new store" 
      />
      <div className="container mx-auto py-6 px-4 md:px-0">
        <Card className="max-w-3xl mx-auto border shadow-sm">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="store_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Building2 className="h-4 w-4 text-primary" />
                          Store Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="My Amazing Store"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <ShoppingBag className="h-4 w-4 text-primary" />
                          Category
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="food">Food & Beverages</SelectItem>
                            <SelectItem value="health">Health & Beauty</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-medium">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your store and what you sell..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of your store to attract customers.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="business_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <Phone className="h-4 w-4 text-primary" />
                          Business Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="store_currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <DollarSign className="h-4 w-4 text-primary" />
                          Currency
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                            <SelectItem value="cad">CAD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-1">
                  <FormField
                    control={form.control}
                    name="plan_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 font-medium">
                          <CreditCard className="h-4 w-4 text-primary" />
                          Subscription Plan
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a plan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="pro">Professional</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => router.push("/dashboard/stores")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    loading={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Creating..." : "Create Store"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AnimatedDashboardPage>
  )
}

export default Page
