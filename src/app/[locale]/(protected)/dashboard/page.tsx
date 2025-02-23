import { redirect } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

export default function DashboardPage() {
  return redirect({
    href: "/dashboard/stores",
    locale: routing.defaultLocale,
  });
}
