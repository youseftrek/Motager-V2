"use client";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CornerDownLeft, CornerDownRight, LucideProps } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  link: {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    subLinks: { name: string; href: string }[];
  };
};

const SidebarLink = ({ link }: Props) => {
  const t = useTranslations("DashboardPage.sidebar");
  const path = usePathname();
  const { storeId } = useParams();
  const [pathname, setPathname] = useState(path);

  useEffect(() => {
    setPathname(path);
  }, [path, pathname]);

  const fullPath =
    link.name === "home"
      ? `/dashboard/stores/${storeId}`
      : `/dashboard/stores/${storeId}${link.href}`;

  const isActive =
    link.name === "home"
      ? pathname.endsWith(storeId as string)
      : pathname.includes(link.href);

  return (
    <div>
      <Link
        href={fullPath}
        className={cn(
          "flex relative items-center rounded-sm group px-2 hover:gap-4 py-1 gap-3 hover:bg-secondary/50 transition-all duration-200",
          isActive &&
            "rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-secondary to-transparent text-foreground font-semibold"
        )}
      >
        <link.icon
          size={23}
          className={cn(
            "transition-all duration-200 group-focus:text-primary",
            isActive && "text-primary"
          )}
        />
        {t(link.name)}
      </Link>

      {link.subLinks.length > 0 &&
        link.subLinks.map((subLink) => {
          const subLinkPath = `/dashboard/stores/${storeId}${subLink.href}`;
          const isSubActive =
            pathname === subLinkPath || pathname.startsWith(`${subLinkPath}/`);

          return (
            <Link
              key={subLink.name}
              href={subLinkPath}
              className={cn(
                "flex hover:text-primary gap-1 w-fit last:mb-1 transition-all duration-200 hover:gap-2 items-center ltr:ml-[41px] rtl:mr-[41px] text-muted-foreground text-sm capitalize",
                isSubActive && "text-primary"
              )}
            >
              <CornerDownRight size={23} className="rtl:hidden ltr:block" />
              <CornerDownLeft size={23} className="ltr:hidden rtl:block" />
              {t(subLink.name)}
            </Link>
          );
        })}
    </div>
  );
};

export default SidebarLink;
