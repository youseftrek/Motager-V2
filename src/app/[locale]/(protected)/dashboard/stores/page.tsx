import { Button, buttonVariants } from "@/components/ui/button";
import AnimatedDashboardPage from "../_components/AnimatedDashboardPage";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import { ChartLine, CircleFadingArrowUp, CirclePlus, Eye } from "lucide-react";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export default function StoresPage() {
  return (
    <div className="p-2 md:p-4 h-[calc(100vh-64px)] lg:h-[calc(100vh-70px)]">
      <AnimatedDashboardPage>
        <DashboardPageHeader
          title="Your Stores"
          description="Choose the store you want to manage/view or create a new one"
        >
          <Button variant="outline" size="sm">
            <CirclePlus />
            Create Store
          </Button>
        </DashboardPageHeader>
        <div className="flex flex-col gap-2 mx-auto mt-4 max-w-4xl">
          <div className="bg-secondary p-4 border border-1 border-card rounded-lg">
            <h2 className="font-medium text-lg">Your Store Name</h2>
            <p className="text-muted-foreground text-sm">
              created_at: 2024-01-01
            </p>
            <p className="text-muted-foreground text-sm">plan: Free</p>
            <div className="flex justify-between items-center gap-2 mt-4">
              <Link
                href={`/dashboard/stores/123123123`}
                className={cn(buttonVariants())}
              >
                <ChartLine />
                Manage
              </Link>
              <div className="flex items-center gap-2">
                <TooltipChildren message="Upgrade Plan">
                  <Button variant="softPrimary" size="icon">
                    <CircleFadingArrowUp />
                  </Button>
                </TooltipChildren>
                <TooltipChildren message="Visit">
                  <Button variant="outline" size="icon">
                    <Eye />
                  </Button>
                </TooltipChildren>
              </div>
            </div>
          </div>
        </div>
      </AnimatedDashboardPage>
    </div>
  );
}
