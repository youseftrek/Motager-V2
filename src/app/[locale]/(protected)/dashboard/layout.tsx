"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect, routing, usePathname } from "@/i18n/routing";
import { AppSidebar } from "./_components/AppSidebar";
import DashboardNavbar from "./_components/DashboardNavbar";
import { useAuth } from "@/hooks";
import { UserStoresProvider } from "@/providers/user-stores-context";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const { user } = useAuth();

  if (pathName.endsWith("dashboard"))
    return redirect({
      href: "/dashboard/stores",
      locale: routing.defaultLocale,
    });

  if (pathName.includes("builder")) return <>{children}</>;

  if (pathName.endsWith("stores") || pathName.endsWith("stores/new"))
    return (
      <UserStoresProvider>
        <div className="pt-16 lg:pt-[70px]">
          <DashboardNavbar
            showSidebarTrigger={false}
            user={user || undefined}
          />
          {children}
        </div>
      </UserStoresProvider>
    );

  return (
    <UserStoresProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex justify-center mt-[63px] md:mt-[65px] lg:mt-[72px] w-full">
          <DashboardNavbar />
          <div className="m-2 md:m-4 w-full overflow-auto">{children}</div>
        </main>
      </SidebarProvider>
    </UserStoresProvider>
  );
};

export default DashboardLayout;
