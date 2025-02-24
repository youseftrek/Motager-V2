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
import LoginForm from "./_components/forms/LoginForm";

const LoginPage = () => {
  const t = useTranslations("LoginPage");
  return (
    <div className="flex flex-col justify-center items-center w-full overflow-auto">
      <Card className="bg-card/65 backdrop-blur-sm w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <Link
        href="/auth/sign-up"
        className={cn(buttonVariants({ variant: "link" }), "")}
      >
        {t("haveNoAccount")}
      </Link>
    </div>
  );
};

export default LoginPage;
