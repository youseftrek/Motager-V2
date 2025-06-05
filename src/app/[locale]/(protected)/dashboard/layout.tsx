"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect, routing, usePathname } from "@/i18n/routing";
import { AppSidebar } from "./_components/AppSidebar";
import DashboardNavbar from "./_components/DashboardNavbar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const pathName = usePathname();

  if (pathName.endsWith("dashboard"))
    return redirect({
      href: "/dashboard/stores",
      locale: routing.defaultLocale,
    });

  if (pathName.includes("builder")) return <>{children}</>;

  if (pathName.endsWith("stores") || pathName.endsWith("add-store"))
    return (
      <div className="pt-16 lg:pt-[70px]">
        <DashboardNavbar showSidebarTrigger={false} />
        {children}
      </div>
    );

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex justify-center mt-[63px] md:mt-[65px] lg:mt-[72px] w-full">
        <DashboardNavbar />
        <div className="m-2 md:m-4 w-full overflow-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
