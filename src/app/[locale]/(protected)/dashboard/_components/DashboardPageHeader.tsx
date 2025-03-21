"use client";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  navigateTo?: string;
  navigateToTranslation?: string;
  navigateToIcon?: string; // Now accepts string for icon name
};

const DashboardPageHeader = ({
  title,
  description,
  navigateTo = "",
  navigateToTranslation,
  children,
  navigateToIcon = "PackagePlus", // Default icon name
}: Props) => {
  const currentPath = usePathname();

  // Get icon component dynamically by name
  const IconComponent = LucideIcons[
    navigateToIcon as keyof typeof LucideIcons
  ] as ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;

  return (
    <div className="mb-2 pb-2 border-b">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl lg:text-3xl">{title}</h1>
        {navigateTo ? (
          <Link
            href={`${currentPath}/${navigateTo}`}
            className={cn(buttonVariants({ size: "sm" }))}
          >
            {IconComponent && <IconComponent className="mr-2 w-4 h-4" />}
            {navigateToTranslation}
          </Link>
        ) : (
          children
        )}
      </div>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default DashboardPageHeader;
