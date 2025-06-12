"use client";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useLocale } from "next-intl";
import CurrentThemePageSelect from "./CurrentThemePageSelect";
import CurrentThemeComponents from "./CurrentThemeComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeSettings } from "@/components/themes/minimal-theme/settings/ThemeSettings";

export function BilderSidebar() {
  const locale = useLocale();
  const RTL = locale === "ar";
  return (
    <Sidebar
      className="bg-background p-2 sm:pt-[72px] lg:pt-[80px]"
      side={RTL ? "right" : "left"}
    >
      <SidebarContent className="lg:px-2">
        <CurrentThemePageSelect />
        <div className="flex flex-col items-center gap-2">
          <Tabs defaultValue="components" className="w-full">
            <TabsList className="flex flex-row rtl:flex-row-reverse mb-2 rtl:ml-auto w-full">
              <TabsTrigger value="components" className="w-full">
                Components
              </TabsTrigger>
              <TabsTrigger value="themeSettings" className="w-full">
                Theme Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="components">
              <CurrentThemeComponents />
            </TabsContent>
            <TabsContent value="themeSettings">
              <ThemeSettings />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
