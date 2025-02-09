"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  DASHBOARD_SIDEBAR_LINKS_DASGBOARDLINKS,
  DASHBOARD_SIDEBAR_LINKS_STORELINKS,
} from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Headset } from "lucide-react";
import SidebarLink from "./SidebarLink";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { LanguageSelect } from "@/components/shared/LanguageSelect";
import UpgradePlanCard from "./UpgradePlanCard";

export function AppSidebar() {
  const locale = useLocale();
  const activeLink = usePathname();
  const RTL = locale === "ar";
  const t = useTranslations("DashboardPage.sidebar");
  return (
    <Sidebar
      className="p-2 sm:pt-[72px] lg:pt-[80px]"
      side={RTL ? "right" : "left"}
    >
      <SidebarContent className="relative flex flex-col justify-between bg-background overflow-auto">
        <div className="flex flex-col gap-0.5 p-2 ltr:pr-0 rtl:pl-0">
          <h4 className="mb-1.5 font-semibold text-muted-foreground text-xs">
            {t("dashboardLinks")}
          </h4>
          {DASHBOARD_SIDEBAR_LINKS_DASGBOARDLINKS.map((link) => (
            <SidebarLink key={link.name} link={link} activeLink={activeLink} />
          ))}

          <h4 className="mt-6 mb-1.5 font-semibold text-muted-foreground text-xs">
            {t("salesChannels")}
          </h4>
          {DASHBOARD_SIDEBAR_LINKS_STORELINKS.map((link) => (
            <SidebarLink key={link.name} link={link} activeLink={activeLink} />
          ))}
        </div>
        <div className="p-2 md:p-0">
          <UpgradePlanCard />
          <div className="flex justify-center items-center gap-2 mt-2 p-1 pt-0">
            <ModeToggle buttonVariant="outline" className="shrink-0" />
            <LanguageSelect buttonVariant="outline" className="shrink-0" />
            <Link
              href="#"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              <Headset />
              {t("support")}
            </Link>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
