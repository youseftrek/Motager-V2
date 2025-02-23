import Spinner from "@/components/ui/Spinner";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("DashboardPage.loading");
  return (
    <div className="flex flex-col justify-center items-center gap-2 bg-gradient-to-b from-secondary/15 to-transparent rounded-md h-screen">
      <Spinner size={70} color="bg-primary" />
      <p className="font-semibold text-lg">{t("title")}</p>
    </div>
  );
};

export default Loading;
