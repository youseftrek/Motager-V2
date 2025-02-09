"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";

type LogoLinkProps = {
  size?: number;
  href?: string;
};

const LogoLink = ({ size = 150, href }: LogoLinkProps) => {
  const currLanguage = useLocale();

  if (currLanguage === "ar") {
    return (
      <Link
        href={href || "/"}
        className="hover:opacity-70 mr-1 w-fit transition-all duration-200"
      >
        <Image
          src="/images/darkLogoAr.png"
          alt="motager logo"
          width={size}
          height={size / 4}
          className="flex dark:hidden"
        />
        <Image
          src="/images/lightLogoAr.png"
          alt="motager logo"
          width={size}
          height={size / 4}
          className="dark:flex hidden"
        />
      </Link>
    );
  } else {
    return (
      <Link
        href="/"
        className="hover:opacity-70 ml-1 w-fit transition-all duration-200"
      >
        <Image
          src="/images/darkLogo.png"
          alt="motager logo"
          width={size}
          height={size / 4}
          className="flex dark:hidden"
        />
        <Image
          src="/images/lightLogo.png"
          alt="motager logo"
          width={size}
          height={size / 4}
          className="dark:flex hidden"
        />
      </Link>
    );
  }
};

export default LogoLink;
