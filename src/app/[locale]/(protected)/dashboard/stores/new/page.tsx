"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  CreditCard,
  DollarSign,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import AnimatedDashboardPage from "../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../_components/DashboardPageHeader";

const Page = () => {
  const router = useRouter();
  const t = useTranslations("addStore");
  const categoriesT = useTranslations("CategoriesPage");

  const storeSchema = z.object({
    categoryId: z.string().nonempty(t("categoryRequired")),
    store_name: z.string().nonempty(t("nameRequired")),
    description: z
      .string()
      .nonempty(t("descriptionRequired"))
      .min(10, t("descriptionMinLength")),
    business_phone: z.string().nonempty(t("phoneRequired")),
    plan_id: z.string().nonempty(t("planRequired")),
    store_currency: z.string().nonempty(t("currencyRequired")),
  });

  type StoreSchemaFields = z.infer<typeof storeSchema>;

  const form = useForm<StoreSchemaFields>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      categoryId: "",
      store_name: "",
      description: "",
      business_phone: "",
      plan_id: "",
      store_currency: "",
    },
  });

  const onSubmit = async (data: StoreSchemaFields) => {
    try {
      console.log(data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success message
      toast.success(t("successMessage"));

      // Redirect to stores page
      router.push("/dashboard/stores");
    } catch (error) {
      console.error("Error creating store:", error);
      toast.error(t("errorMessage"));
    }
  };

  return (
    <div className="p-2 md:p-4 h-[calc(100vh-64px)] lg:h-[calc(100vh-70px)]">
      <AnimatedDashboardPage>
        <DashboardPageHeader
          title={t("createStore")}
          description={t("description")}
        />
        <div className="container mx-auto py-6 px-4 md:px-0">
          <Card className="max-w-3xl mx-auto border shadow-sm">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="store_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-medium">
                            <Building2 className="h-4 w-4 text-primary" />
                            {t("name")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("namePlaceholder")}
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
                            {t("category")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("categoryPlaceholder")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="electronics">
                                {t("categories.electronics")}
                              </SelectItem>
                              <SelectItem value="clothing">
                                {t("categories.clothing")}
                              </SelectItem>
                              <SelectItem value="food">
                                {t("categories.food")}
                              </SelectItem>
                              <SelectItem value="health">
                                {t("categories.health")}
                              </SelectItem>
                              <SelectItem value="home">
                                {t("categories.home")}
                              </SelectItem>
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
                          {t("description")}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("descriptionPlaceholder")}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {t("descriptionHelp")}
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
                            {t("phone")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("phonePlaceholder")}
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
                            {t("currency")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("currencyPlaceholder")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="usd">
                                {t("currencies.usd")}
                              </SelectItem>
                              <SelectItem value="eur">
                                {t("currencies.eur")}
                              </SelectItem>
                              <SelectItem value="gbp">
                                {t("currencies.gbp")}
                              </SelectItem>
                              <SelectItem value="jpy">
                                {t("currencies.jpy")}
                              </SelectItem>
                              <SelectItem value="cad">
                                {t("currencies.cad")}
                              </SelectItem>
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
                            {t("subscription")}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={t("planPlaceholder")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">
                                {t("plans.basic")}
                              </SelectItem>
                              <SelectItem value="pro">
                                {t("plans.pro")}
                              </SelectItem>
                              <SelectItem value="business">
                                {t("plans.business")}
                              </SelectItem>
                              <SelectItem value="enterprise">
                                {t("plans.enterprise")}
                              </SelectItem>
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
                      {t("cancel")}
                    </Button>
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      loading={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? t("creating")
                        : t("create")}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </AnimatedDashboardPage>
    </div>
  );
};

export default Page;
