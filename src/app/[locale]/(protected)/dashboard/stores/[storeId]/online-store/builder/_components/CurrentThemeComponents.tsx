"use client";
import { getRandId } from "@/lib/utils";
import { useBuilder } from "@/providers/builder-context-provider";
import { toast } from "sonner";

const CurrentThemeComponents = () => {
  const { state, dispatch } = useBuilder();

  const handleAddSection = (sectionType: string) => {
    // Get initial values from theme config if they exist
    const initialValues =
      state.selectedPage?.initialValues.find((val) => val.type === sectionType)
        ?.data || {};

    dispatch({
      type: "ADD_SECTION",
      payload: {
        id: getRandId(),
        type: sectionType,
        name: sectionType,
        data: initialValues,
      },
    });
  };

  return (
    <div className="gap-2 grid grid-cols-2 w-full">
      {state.availableSections.map((sectionType) => (
        <button
          onClick={() => {
            handleAddSection(sectionType);
            toast.success("Section Added Successfully");
          }}
          className="flex flex-col justify-center items-center bg-secondary hover:bg-secondary/80 rounded-md w-full transition-colors aspect-square"
          key={sectionType}
        >
          <span className="font-medium text-sm">{sectionType}</span>
          <span className="text-muted-foreground text-xs">Click to add</span>
        </button>
      ))}
    </div>
  );
};

export default CurrentThemeComponents;
