"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Store } from "@/types/store";
import {
  ChartLine,
  CircleFadingArrowUp,
  Eye,
  PlusCircle,
  StoreIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
  stores: Store[];
};

export default function StoreCards({ stores }: Props) {
  const t = useTranslations("StoresPage");

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
    <div className="flex flex-col gap-2 mx-auto mt-4 max-w-4xl">
      {stores.map((store) => (
        <Card key={store.id}>
          <CardHeader>
            <CardTitle>{store.store_name}</CardTitle>
            <CardDescription>{store.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              {t("storeInfo.createdAt")} {new Date().toLocaleDateString()}
            </p>
            <p className="text-muted-foreground text-sm">
              {t("storeInfo.plan")} {store.plan_id === 0 ? "Free" : "Premium"}
            </p>
          </CardContent>
          <CardFooter className="w-full flex items-center justify-between gap-2">
            <Link
              href={`/dashboard/stores/${store.id}`}
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
