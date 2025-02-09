"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useBuilder } from "@/providers/builder-context-provider";
import { useEffect, useState } from "react";

type InputConfig = {
  type: "text" | "number" | "color";
  label: string;
  placeholder?: string;
};

export function EditSectionSheet() {
  const { state, dispatch } = useBuilder();
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sectionData, setSectionData] = useState<Record<string, any>>({});
  const [sectionConfig, setSectionConfig] = useState<Record<
    string,
    InputConfig
  > | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      if (state.selectedSection) {
        try {
          const item = await import(
            `@/components/themes/minimal-theme/sections/${state.selectedSection.type}`
          );
          setSectionConfig(item.config?.inputs || null);
          setIsOpen(true);
          setSectionData(state.selectedSection.data || {});
        } catch (error) {
          console.error("Failed to load section config:", error);
          setSectionConfig(null);
        }
      }
    };

    loadConfig();
  }, [state.selectedSection]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      dispatch({
        type: "SET_SELECTED_SECTION",
        payload: null,
      });
      setSectionConfig(null);
    }
  };

  const handleSave = () => {
    if (!state.selectedSection) return;
    dispatch({
      type: "UPDATE_SECTION",
      payload: {
        id: state.selectedSection.id,
        data: sectionData,
      },
    });
    handleOpenChange(false);
  };

  const renderInputs = () => {
    if (!sectionConfig) return null;

    return (
      <div className="flex flex-col gap-4 py-4">
        {Object.entries(sectionConfig).map(([key, config]) => (
          <div key={key} className="gap-2 grid">
            <Label htmlFor={key}>{config.label}</Label>
            <Input
              id={key}
              type={config.type}
              value={sectionData[key] || ""}
              onChange={(e) =>
                setSectionData((prev) => ({
                  ...prev,
                  [key]: e.target.value,
                }))
              }
              placeholder={config.placeholder}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {state.selectedSection?.name}</SheetTitle>
        </SheetHeader>
        {renderInputs()}
        <SheetFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
