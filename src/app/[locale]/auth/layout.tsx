import { LanguageSelect } from "@/components/shared/LanguageSelect";
import LogoLink from "@/components/shared/LogoLink";
import { ModeToggle } from "@/components/shared/ModeToggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-col justify-center items-center gap-5 bg-[url('/SVGs/auth.svg')] bg-cover bg-center px-2 min-h-screen overflow-auto">
      <LogoLink size={200} />
      {children}
      <div className="top-3 rtl:right-3 left-3 absolute flex items-center gap-2">
        <ModeToggle buttonVariant="secondary" />
        <LanguageSelect buttonVariant="secondary" />
      </div>
    </section>
  );
}
