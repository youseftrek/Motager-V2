"use client";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useBuilder } from "@/providers/builder-context-provider";

export const BuilderContent = () => {
  const { state, dispatch } = useBuilder();
  const sections = state.selectedPage?.body || [];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => {
        const Component = state.loadedComponents[section.type];

        return (
          <div
            key={section.id}
            className="group relative border-spacing-1 hover:border-primary border border-dashed rounded-md w-full h-max transition-all duration-200 overflow-hidden"
          >
            {Component && <Component {...section.data} />}
            <div className="top-1 right-1.5 left-1.5 absolute flex justify-between items-center gap-1 opacity-0 group-hover:opacity-100 p-1 rounded-sm h-max text-xs transition-all duration-200">
              <p className="bg-primary px-2 py-1 border rounded-full text-background">
                {section.name}
              </p>
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
                      dispatch({ type: "DELETE_SECTION", payload: section.id });
                      toast.success("Section deleted successfully");
                    }}
                  >
                    <Trash2 />
                  </Button>
                </TooltipChildren>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
