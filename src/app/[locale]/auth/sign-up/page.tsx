import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import SignUpForm from "./_components/forms/SignUpForm";

const SignUpPage = () => {
  const t = useTranslations("SignUpPage");
  return (
    <div className="flex flex-col justify-center items-center w-full overflow-auto">
      <Card className="bg-card/65 backdrop-blur-sm w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
      <Link
        href="/auth/login"
        className={cn(buttonVariants({ variant: "link" }), "")}
      >
        {t("haveAccount")}
      </Link>
    </div>
  );
};

export default SignUpPage;
