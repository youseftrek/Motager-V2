"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import {
  ChartLine,
  CircleFadingArrowUp,
  Eye,
  PlusCircle,
  StoreIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function StoreCards() {
  const t = useTranslations("StoresPage");
  const stores = [];

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center bg-secondary p-8 border border-1 border-card rounded-lg text-center space-y-6 h-[300px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-4 bg-primary/10 rounded-full">
            <StoreIcon size={40} className="text-primary" />
          </div>
          <h2 className="font-semibold text-xl">{t("noStores.title")}</h2>
          <p className="text-muted-foreground text-sm max-w-md">
            {t("noStores.description")}
          </p>
        </div>

        <Link
          href="stores/new"
          className={cn(
            buttonVariants({ size: "lg", variant: "default" }),
            "gap-2"
          )}
        >
          <PlusCircle size={18} />
          {t("createStore")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary p-4 border border-1 border-card rounded-lg">
      <h2 className="font-medium text-lg">Your Store Name</h2>
      <p className="text-muted-foreground text-sm">
        {t("storeInfo.createdAt")} 2024-01-01
      </p>
      <p className="text-muted-foreground text-sm">
        {t("storeInfo.plan")} Free
      </p>
      <div className="flex justify-between items-center gap-2 mt-4">
        <Link
          href={`/dashboard/stores/123123123`}
          className={cn(buttonVariants({ size: "sm" }))}
        >
          <ChartLine />
          {t("storeInfo.manage")}
        </Link>
        <div className="flex items-center gap-2">
          <TooltipChildren message={t("storeInfo.upgrade")}>
            <Button variant="softPrimary" size="icon">
              <CircleFadingArrowUp />
            </Button>
          </TooltipChildren>
          <TooltipChildren message={t("storeInfo.visit")}>
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
          </TooltipChildren>
        </div>
      </div>
    </div>
  );
}
