"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";
import { useBuilder } from "@/providers/builder-context-provider";
import { Theme } from "@/types/theme";
import { Eye, ShieldCheck } from "lucide-react";
import Image from "next/image";

type Props = {
  theme: Theme;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ThemeCard({ theme, isLoading, setIsLoading }: Props) {
  const router = useRouter();
  const { dispatch, state } = useBuilder();

  const handleChooseTheme = () => {
    setIsLoading(true);
    dispatch({ type: "SELECT_THEME", payload: theme });
    console.log("state after selecting theme: ", state);
    router.push(`/124326/dashboard/online-store/builder?theme=${theme.id}`);
  };

  return (
    <div
      key={theme.id}
      className="bg-background border rounded-md h-fit overflow-hidden"
    >
      <Image
        src={theme.img || ""}
        alt={theme.name}
        width={700}
        height={700}
        className="w-full"
      />
      <div className="p-2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-lg truncate">{theme.name}</h1>
          <p className="flex items-center gap-1 text-muted-foreground text-xs lg:text-sm">
            <ShieldCheck size={16} className="text-foreground fill-blue-500" />
            <span className="truncate">By Motager</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            className="w-full"
            disabled={isLoading}
            size="sm"
            onClick={handleChooseTheme}
          >
            Choose
          </Button>
          <Button size="icon" variant={"outline"} className="shrink-0">
            <Eye />
          </Button>
        </div>
      </div>
    </div>
  );
}
