"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CurrentThemeTab from "./_components/CurrentThemeTab";
import ThemesLibraryTab from "./_components/ThemesLibraryTab";
import { useState } from "react";
import AnimatedDashboardPage from "../../../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../../../_components/DashboardPageHeader";

const OnlineStorePage = () => {
  const t = useTranslations("OnlineStorePage");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AnimatedDashboardPage>
      <DashboardPageHeader title={t("title")} description={t("description")} />
      <Tabs defaultValue="currentTheme" className="w-full">
        <TabsList className="flex flex-row rtl:flex-row-reverse mb-2 rtl:ml-auto w-[400px]">
          <TabsTrigger value="currentTheme" className="w-full">
            {t("tabs.currentTheme")}
          </TabsTrigger>
          <TabsTrigger value="themeLibrary" className="w-full">
            {t("tabs.themeLibrary")}
          </TabsTrigger>
        </TabsList>
        <CurrentThemeTab />
        <ThemesLibraryTab isLoading={isLoading} setIsLoading={setIsLoading} />
      </Tabs>
    </AnimatedDashboardPage>
  );
};

export default OnlineStorePage;
