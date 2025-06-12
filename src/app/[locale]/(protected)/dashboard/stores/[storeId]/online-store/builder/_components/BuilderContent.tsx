"use client";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Button } from "@/components/ui/button";
import { GripVertical, LayoutTemplate, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useBuilder } from "@/providers/builder-context-provider";
import { Reorder, motion, useDragControls } from "framer-motion";
import { ThemeProvider } from "@/components/themes/minimal-theme/settings/ThemeContext";
import { MINIMAL_THEME_SETTINGS } from "@/components/themes/minimal-theme/settings";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DraggableSection = ({ section, Component }: any) => {
  const controls = useDragControls();
  const { dispatch, state } = useBuilder();

  // Get theme colors from state or use defaults
  const themeColors =
    state.themeSettings?.colors || MINIMAL_THEME_SETTINGS.colors;

  return (
    <Reorder.Item
      value={section}
      id={section.id}
      dragListener={false}
      dragControls={controls}
      className="list-none"
    >
      <motion.div className="group relative border hover:border-primary border-dashed rounded-md w-full h-max overflow-hidden transition-all duration-200 border-spacing-1">
        {Component && <Component {...section.data} themeColors={themeColors} />}
        <div className="top-1 right-1.5 left-1.5 absolute flex justify-between items-center gap-1 opacity-0 group-hover:opacity-100 p-1 rounded-sm h-max text-xs transition-all duration-200">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="cursor-grab active:cursor-grabbing"
              onPointerDown={(e) => {
                e.preventDefault();
                controls.start(e);
              }}
            >
              <GripVertical className="w-4 h-4" />
            </Button>
            <p className="bg-primary px-2 py-1 border rounded-full text-background">
              {section.name}
            </p>
          </div>
          <div className="flex items-center gap-1 bg-secondary p-0.5 rounded-full">
            <TooltipChildren message="Edit">
              <Button
                variant="outline"
                size="fullRounded"
                onClick={() =>
                  dispatch({
                    type: "SET_SELECTED_SECTION",
                    payload: section,
                  })
                }
              >
                <Pencil />
              </Button>
            </TooltipChildren>
            <TooltipChildren message="Delete">
              <Button
                variant="softDestructive"
                size="fullRounded"
                onClick={() => {
                  dispatch({
                    type: "DELETE_SECTION",
                    payload: section.id,
                  });
                  toast.success("Section deleted successfully");
                }}
              >
                <Trash2 />
              </Button>
            </TooltipChildren>
          </div>
        </div>
      </motion.div>
    </Reorder.Item>
  );
};

export const BuilderContent = () => {
  const { state, dispatch } = useBuilder();
  const sections = state.selectedPage?.body || [];

  const handleReorder = (reorderedSections: typeof sections) => {
    dispatch({
      type: "REORDER_SECTIONS",
      payload: reorderedSections,
    });
  };

  return (
    <ThemeProvider>
      <Reorder.Group
        axis="y"
        values={sections}
        onReorder={handleReorder}
        className="flex flex-col gap-4"
      >
        {sections.length ? (
          sections.map((section) => (
            <DraggableSection
              key={section.id}
              section={section}
              Component={state.loadedComponents[section.type]}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center w-f h-[calc(100vh-100px)] lg:h-[calc(100vh-130px)]">
            <LayoutTemplate size={100} />
            <h3 className="font-semibold text-2xl">Empty Tamplate</h3>
            <p className="text-muted-foreground">Start building your theme</p>
          </div>
        )}
      </Reorder.Group>
    </ThemeProvider>
  );
};
