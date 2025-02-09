import { buttonVariants } from "@/components/ui/button";
import Ripple from "@/components/ui/ripple";
import { WordRotate } from "@/components/ui/word-rotate";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="relative flex flex-col justify-center items-center mt-[75px] w-full h-[calc(100vh-75px)] overflow-hidden">
      <h3 className="rtl:mb-5 text-lg">{t("slogan")}</h3>
      <h2 className="z-10 mb-4 rtl:mb-6 font-medium text-5xl text-center md:text-6xl lg:text-7xl xl:text-8xl rtl:leading-tight tracking-tighter whitespace-pre-wrap">
        <WordRotate
          className="font-bold text-5xl text-center md:text-6xl lg:text-7xl xl:text-8xl rtl:leading-tight tracking-wide"
          words={[t("build"), t("launch"), t("grow")]}
        />
        {t("heading")}
        <span> {t("motager")}</span>
      </h2>
      <p className="mb-4 px-3 max-w-3xl text-center text-muted-foreground">
        {t("description")}
      </p>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ size: "lg" }), "")}
        >
          {t("cta1")}
        </Link>
        <Link
          href="#"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            ""
          )}
        >
          {t("cta2")}
        </Link>
      </div>
      <Ripple />
    </div>
  );
};

export default Hero;
