"use client";

import { useTranslations } from "next-intl";
import AnimatedDashboardPage from "../../(protected)/dashboard/_components/AnimatedDashboardPage";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
    <div className="mx-auto px-4 py-16 container">
      <AnimatedDashboardPage>
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 font-bold text-4xl">{t("title")}</h1>
          <p className="text-muted-foreground text-xl">{t("description")}</p>
        </div>

        <div className="gap-12 grid md:grid-cols-2 mx-auto max-w-5xl">
          <div className="bg-card shadow-sm p-8 rounded-lg">
            <h2 className="mb-4 font-semibold text-2xl">{t("mission")}</h2>
            <p className="text-muted-foreground">{t("missionText")}</p>
          </div>

          <div className="bg-card shadow-sm p-8 rounded-lg">
            <h2 className="mb-4 font-semibold text-2xl">{t("vision")}</h2>
            <p className="text-muted-foreground">{t("visionText")}</p>
          </div>
        </div>
      </AnimatedDashboardPage>
    </div>
  );
}
