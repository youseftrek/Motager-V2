"use client";

import AvatarMenu from "@/components/shared/AvatarMenu";
import { LanguageSelect } from "@/components/shared/LanguageSelect";
import LogoLink from "@/components/shared/LogoLink";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-context-provider";
import { IUser } from "@/types/auth/auth";

type Props = {
  showSidebarTrigger?: boolean;
  user?: IUser;
};

const DashboardNavbar = ({ showSidebarTrigger = true }: Props) => {
  const { user } = useAuth();
  return (
    <div className="top-0 left-0 z-50 fixed bg-background/70 backdrop-blur-md w-full">
      <MaxWidthWrapper className="px-2 lg:px-4 max-w-[100%]">
        <header className="flex items-center pt-2 lg:pt-4 rounded-b-md">
          <nav className="flex flex-shrink flex-1 justify-between items-center bg-secondary md:mx-0 p-2 border rounded-md max-h-[56px]">
            <div className="flex items-center gap-2">
              {showSidebarTrigger && <SidebarTrigger />}
              <LogoLink href="/dashboard" />
            </div>
            <div className="flex justify-center items-center gap-1.5">
              <ModeToggle buttonVariant="outline" />
              <LanguageSelect buttonVariant="outline" />
              {user ? (
                <AvatarMenu user={user || undefined} />
              ) : (
                <Skeleton className="h-9 w-9 rounded-full" />
              )}
            </div>
          </nav>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default DashboardNavbar;
