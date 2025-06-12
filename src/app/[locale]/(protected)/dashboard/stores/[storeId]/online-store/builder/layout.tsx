/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BilderSidebar } from "./_components/BuilderSidebar";
import BuilderNavbar from "./_components/BuilderNavbar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { getTheme } from "@/actions";
import { useBuilder } from "@/providers/builder-context-provider";
import Spinner from "@/components/ui/Spinner";

type Props = {
  children: React.ReactNode;
};

const BuilderLayout = ({ children }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const themeId = params.get("theme");
  const { dispatch } = useBuilder();

  const [themeData, setThemeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!themeId) {
      router.push(`/124326/dashboard/online-store`);
      return;
    }

    const loadThemeData = async () => {
      try {
        setLoading(true);
        const theme = await getTheme(themeId);

        // Initialize theme with settings from server or default settings
        dispatch({
          type: "SELECT_THEME",
          payload: theme,
        });

        // If theme has settings, update them separately
        if (theme.themeSettings) {
          dispatch({
            type: "UPDATE_THEME_SETTINGS",
            payload: theme.themeSettings,
          });
        }

        setThemeData(theme);
      } catch (error) {
        console.error("Error fetching theme data:", error);
        router.push(`/124326/dashboard/online-store`);
      } finally {
        setLoading(false);
      }
    };

    loadThemeData();
  }, [themeId, router, dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 w-full h-screen">
        <Spinner size={70} color="text-primary" />
        <p className="font-semibold text-lg">Setting Up Your Builder🚀</p>
      </div>
    );
  }

  if (!themeData) {
    router.push(`/124326/dashboard/online-store`);
  }

  return (
    <SidebarProvider sidebarWidth="20rem">
      <BilderSidebar />
      <main className="flex justify-center mt-[63px] md:mt-[65px] lg:mt-[72px] w-full">
        <BuilderNavbar />
        <div className="p-2 lg:p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default BuilderLayout;
