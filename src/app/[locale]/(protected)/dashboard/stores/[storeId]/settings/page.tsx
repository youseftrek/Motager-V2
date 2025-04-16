"use client";

import { useTranslations } from "next-intl";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title={t("title")} description={t("description")} />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="flex flex-row rtl:flex-row-reverse mb-6 w-full overflow-x-auto">
          <TabsTrigger value="general" className="flex-1">
            {t("general")}
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex-1">
            {t("shipping")}
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex-1">
            {t("payment")}
          </TabsTrigger>
          <TabsTrigger value="taxes" className="flex-1">
            {t("taxes")}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex-1">
            {t("legal")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("general")}</h3>
            <p className="text-muted-foreground">
              General settings content will be implemented here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="shipping">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("shipping")}</h3>
            <p className="text-muted-foreground">
              Shipping settings content will be implemented here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="payment">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("payment")}</h3>
            <p className="text-muted-foreground">
              Payment settings content will be implemented here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="taxes">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("taxes")}</h3>
            <p className="text-muted-foreground">
              Taxes settings content will be implemented here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("notifications")}</h3>
            <p className="text-muted-foreground">
              Notifications settings content will be implemented here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="legal">
          <div className="bg-card p-6 border rounded-lg">
            <h3 className="mb-4 font-semibold text-xl">{t("legal")}</h3>
            <p className="text-muted-foreground">
              Legal settings content will be implemented here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </AnimatedDashboardPage>
  );
}
