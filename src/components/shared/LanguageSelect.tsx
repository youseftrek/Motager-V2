"use client";

type Props = {
  className?: string;
  buttonVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { usePathname } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function LanguageSelect({ className, buttonVariant }: Props) {
  const t = useTranslations("languagesToggle");

  const currPath = usePathname();

  return (
    <DropdownMenu>
      <TooltipChildren message={t("tooltip")}>
        <DropdownMenuTrigger asChild className={className}>
          <Button variant={buttonVariant} size="icon" name="Toggle Language">
            <Languages />
          </Button>
        </DropdownMenuTrigger>
      </TooltipChildren>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild>
          <Link
            href={`/ar${currPath}`}
            className="flex items-center gap-3 font-bold"
          >
            <Image
              src="/SVGs/ar.svg"
              alt="arabic language flag"
              height={25}
              width={25}
            />
            {t("arabic")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={`/en${currPath}`}
            className="flex items-center gap-3 font-bold"
          >
            <Image
              src="/SVGs/en.svg"
              alt="english language flag"
              height={25}
              width={25}
            />
            {t("english")}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
