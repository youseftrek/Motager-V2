import AvatarMenu from "@/components/shared/AvatarMenu";
import LogoLink from "@/components/shared/LogoLink";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellRing } from "lucide-react";
import { useSession } from "next-auth/react";

type Props = {
  showSidebarTrigger?: boolean;
};

const DashboardNavbar = ({ showSidebarTrigger = true }: Props) => {
  const { data: session } = useSession();
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
              <Button variant="outline" size="icon">
                <BellRing />
              </Button>
              <AvatarMenu session={session || null} />
            </div>
          </nav>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default DashboardNavbar;
