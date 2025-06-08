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
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { toast } from "sonner";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { IUser } from "@/types/auth/auth";
import { useAuth } from "@/hooks";

type Props = {
  user?: IUser;
};

const AvatarMenu = ({ user }: Props) => {
  const t = useTranslations("HomeNavbar");
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push(PUBLIC_ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
      toast.error("Failed to logout");
    }
  };

  if (!user)
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
                user.image ||
                `https://avatar.iran.liara.run/public/boy?username=${user.name}`
              }
              alt={"User Name"}
            />
            <AvatarFallback>
              {user.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">
              {user.name || "User Name"}
            </p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email || "user@email.com"}
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
