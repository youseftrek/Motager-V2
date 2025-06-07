"use client";

import { buttonVariants } from "@/components/ui/button";
import AnimatedDashboardPage from "../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import { CirclePlus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import StoreCards from "./_components/StoreCards";

export default function StoresPage() {
  const t = useTranslations("StoresPage");

  return (
    <div className="p-2 md:p-4 h-[calc(100vh-64px)] lg:h-[calc(100vh-70px)]">
      <AnimatedDashboardPage>
        <DashboardPageHeader title={t("title")} description={t("description")}>
          <Link
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "flex gap-2"
            )}
            href="stores/new"
          >
            <CirclePlus />
            {t("createStore")}
          </Link>
        </DashboardPageHeader>
        <div className="flex flex-col gap-2 mx-auto mt-4 max-w-4xl">
          <StoreCards />
        </div>
      </AnimatedDashboardPage>
    </div>
  );
}
