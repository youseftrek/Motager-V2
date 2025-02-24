"use client";

import { HelpCircle, LogOut, Store, UserRoundPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type Props = {
  session: Session | null;
};

const AvatarMenu = ({ session }: Props) => {
  const t = useTranslations("HomeNavbar");
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  if (!session)
    return (
      <Link
        href="/auth/login"
        className={cn(buttonVariants({ size: "sm" }), "")}
      >
        {t("cta")}
      </Link>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full w-[38px] h-[38px]"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={
                session?.user?.image
                  ? session?.user?.image
                  : "https://github.com/shadcn.png"
              }
              alt={session?.user?.name || "User Name"}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {session?.user?.name || "User Name"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {session?.user?.email || "user@email.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={`${PROTECTED_ROUTES.STORES}`}
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <Store size={18} />
            <span>Stores</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={PROTECTED_ROUTES.DASHBOARD}
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <UserRoundPen size={18} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={PUBLIC_ROUTES.ABOUT}
            className="flex items-center gap-2 w-full cursor-pointer"
          >
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="bg-red-500/10 focus:bg-red-500/20 text-red-500 focus:text-red-600 cursor-pointer"
          asChild
        >
          <button
            type="submit"
            onClick={handleLogout}
            className="flex items-center gap-2 w-full"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
