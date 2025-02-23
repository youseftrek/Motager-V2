import Spinner from "@/components/ui/Spinner";
import { Section } from "@/types/theme";
import dynamic from "next/dynamic";

interface DynamicSectionProps {
  section: Section;
  themePath: string;
}

const DynamicSection = ({ section, themePath }: DynamicSectionProps) => {
  const path = `${themePath}/${section.type}`;
  const SectionComponent = dynamic(
    () => import(`@/components/themes/${path}`),
    {
      loading: () => (
        <div className="flex flex-col justify-center items-center py-5 w-full">
          <Spinner color="bg-primary" size={30} />
          <p>Loading</p>
        </div>
      ),
      ssr: false,
    }
  );

  return <SectionComponent {...section.data} />;
};

export default DynamicSection;
