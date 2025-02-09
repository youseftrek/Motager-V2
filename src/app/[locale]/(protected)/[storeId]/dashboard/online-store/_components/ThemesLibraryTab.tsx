import { TabsContent } from "@/components/ui/tabs";
import ThemeCard from "./ThemeCard";
import { THEMES } from "@/components/themes";

type Props = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemesLibraryTab = ({ isLoading, setIsLoading }: Props) => {
  return (
    <TabsContent
      value="themeLibrary"
      className="rtl:text-right m-0 w-full h-full"
    >
      <div className="gap-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full">
        {THEMES.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default ThemesLibraryTab;
