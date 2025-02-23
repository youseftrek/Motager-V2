import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CircleFadingArrowUp } from "lucide-react";
import Image from "next/image";

const UpgradePlanCard = () => {
  return (
    <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-primary/15 dark:from-primary/10 to-transparent mt-7 p-1 rounded-md w-full">
      <Image
        src="/images/pro.png"
        alt="upgrade"
        width={90}
        height={90}
        className="top-[-50px] left-1/2 absolute -translate-x-1/2"
      />
      <p className="mt-8 font-semibold text-center text-lg">Starter Plan</p>
      <p className="mb-3 text-center text-muted-foreground text-xs">
        Upgrade your plan to get the full power!
      </p>
      <Link
        href="#"
        className={cn(
          buttonVariants({ variant: "softPrimary", size: "sm" }),
          "w-full"
        )}
      >
        <CircleFadingArrowUp />
        Upgrade Plan
      </Link>
    </div>
  );
};

export default UpgradePlanCard;
