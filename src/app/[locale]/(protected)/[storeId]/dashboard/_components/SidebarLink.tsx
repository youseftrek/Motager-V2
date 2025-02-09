import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { CornerDownLeft, CornerDownRight, LucideProps } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  link: {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    subLinks: { name: string; href: string }[];
  };
  activeLink: string;
};
const SidebarLink = ({ link, activeLink }: Props) => {
  const t = useTranslations("DashboardPage.sidebar");

  const isMainLinkActive = (href: string) => {
    // Extract the path part after /dashboard from activeLink
    const activePath = activeLink.split("/dashboard")[1] || "/";
    const linkPath = href.split("/dashboard")[1] || "/";

    // Check if current link is active
    if (activePath === linkPath) return true;
    // Check if any sublink is active
    if (
      link.subLinks.some((subLink) => {
        const sublinkPath = subLink.href.split("/dashboard")[1] || "/";
        return activePath === sublinkPath;
      })
    )
      return true;
    // Check if it's dashboard home
    if (href.endsWith("/dashboard")) {
      return activePath === "/" || activePath === "";
    }
    return false;
  };

  return (
    <div>
      <Link
        href={`${link.href}`}
        className={cn(
          "flex relative items-center rounded-sm group px-2 hover:gap-4 py-1 gap-3 hover:bg-secondary/50 transition-all duration-200",
          isMainLinkActive(link.href) &&
            "rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-secondary to-transparent text-foreground font-semibold"
        )}
      >
        <link.icon
          size={23}
          className={cn(
            "transition-all duration-200 group-focus:text-primary",
            isMainLinkActive(link.href) && "text-primary"
          )}
        />
        {t(link.name)}
      </Link>
      {link.subLinks.length > 0 &&
        link.subLinks.map((subLink) => (
          <Link
            key={subLink.name}
            href={`${subLink.href}`}
            className={cn(
              "flex hover:text-primary gap-1 w-fit last:mb-1 transition-all duration-200 hover:gap-2 items-center ltr:ml-[41px] rtl:mr-[41px] text-muted-foreground text-sm capitalize",
              activeLink === subLink.href && "text-primary"
            )}
          >
            <CornerDownRight size={23} className="ltr:block rtl:hidden" />
            <CornerDownLeft size={23} className="rtl:block ltr:hidden" />
            {t(subLink.name)}
          </Link>
        ))}
    </div>
  );
};

export default SidebarLink;
