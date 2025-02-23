import { HelpCircle, LogOut, Store, UserRoundPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "@/constants";
import { Link } from "@/i18n/routing";

type Props = {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  };
};

const AvatarMenu = ({ session }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full w-[38px] h-[38px]"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={session?.user?.image || "/images/avatar.png"}
              alt={session?.user?.name || "User Name"}
            />
            <AvatarFallback>
              {session?.user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
        <DropdownMenuItem asChild>
          <Link href={`${PROTECTED_ROUTES.STORES}`} className="cursor-pointer">
            <Store size={18} />
            <span>Stores</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={PROTECTED_ROUTES.DASHBOARD} className="cursor-pointer">
            <UserRoundPen size={18} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={PUBLIC_ROUTES.ABOUT} className="cursor-pointer">
            <HelpCircle size={18} />
            <span>Help</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="bg-red-500/10 focus:bg-red-500/20 text-red-500 focus:text-red-600"
        >
          <form className="cursor-pointer">
            <button type="submit" className="flex items-center gap-2 w-full">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarMenu;
