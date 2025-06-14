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
  Calendar,
  CircleDollarSign,
  Eye,
  MousePointerClick,
  Phone,
  PlusCircle,
  StoreIcon,
  Tag,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { formatDistanceToNow } from "date-fns";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto mt-4 max-w-6xl">
      {stores.map((store) => (
        <Card
          key={store.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary"
        >
          <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/10 pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold truncate">
                {store.store_name}
              </CardTitle>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                {store.category.name}
              </span>
            </div>
            <CardDescription className="line-clamp-2 mt-1">
              {store.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>
                  {formatDistanceToNow(new Date(store.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CircleDollarSign size={14} />
                <span className="uppercase">{store.store_currency}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} />
                <span className="truncate">{store.business_phone}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center justify-between gap-2 bg-muted/30 mt-2 pt-3">
            <Link
              href={`/dashboard/stores/${store.id}`}
              className={cn(
                buttonVariants({ size: "sm", variant: "default" }),
                "gap-2"
              )}
            >
              <MousePointerClick size={16} />
              {t("storeInfo.manage")}
            </Link>

            <Link href={store.href || "#"} target="_blank">
              <TooltipChildren message={t("storeInfo.visit")}>
                <a
                  href={`/shop/${store.slug}`}
                  target="_blank"
                  className={cn(
                    buttonVariants({ size: "icon", variant: "outline" })
                  )}
                >
                  <Eye size={16} />
                </a>
              </TooltipChildren>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
