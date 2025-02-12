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
import { HexColorPicker } from "react-colorful";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pipette } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type InputConfig = {
  type:
    | "text"
    | "number"
    | "color"
    | "slider"
    | "textarea"
    | "select"
    | "toggle";
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  default?: number | string;
  options?: { value: string; label: string }[];
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeColorKey, setActiveColorKey] = useState<string | null>(null);

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

  const handleColorPick = async (key: string) => {
    if (!("EyeDropper" in window)) {
      alert("Your browser does not support the EyeDropper API.");
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eyeDropper = new (window as any).EyeDropper();
      const { sRGBHex } = await eyeDropper.open();
      setSectionData((prev) => ({
        ...prev,
        [key]: sRGBHex,
      }));
    } catch (error) {
      console.error("Failed to pick color:", error);
    }
  };

  const renderInputs = () => {
    if (!sectionConfig) return null;

    return (
      <div className="flex flex-col gap-4 py-4">
        {Object.entries(sectionConfig).map(([key, config]) => (
          <div key={key} className="gap-2 grid">
            <Label htmlFor={key}>{config.label}</Label>
            {config.type === "text" && (
              <Input
                id={key}
                type="text"
                value={sectionData[key] || ""}
                onChange={(e) =>
                  setSectionData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={config.placeholder}
              />
            )}
            {config.type === "textarea" && (
              <Textarea
                id={key}
                value={sectionData[key] || ""}
                onChange={(e) =>
                  setSectionData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={config.placeholder}
              />
            )}
            {config.type === "number" && (
              <Input
                id={key}
                type="number"
                value={sectionData[key] || ""}
                onChange={(e) =>
                  setSectionData((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                placeholder={config.placeholder}
              />
            )}
            {config.type === "color" && (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="border-2 rounded-md w-8 h-8 cursor-pointer"
                      style={{
                        backgroundColor:
                          sectionData[key] || config.default || "#000000",
                      }}
                      onClick={() => setActiveColorKey(key)}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 p-2 w-auto">
                    <HexColorPicker
                      color={sectionData[key] || config.default || "#000000"}
                      onChange={(color) =>
                        setSectionData((prev) => ({
                          ...prev,
                          [key]: color,
                        }))
                      }
                    />
                    <input
                      type="text"
                      value={sectionData[key] || config.default || "#000000"}
                      onChange={(e) =>
                        setSectionData((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="px-2 py-1 border rounded-md w-full text-sm"
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleColorPick(key)}
                >
                  <Pipette className="fill-primary" />
                  Pick Color
                </Button>
              </div>
            )}
            {config.type === "slider" && (
              <div className="flex items-center gap-2">
                <p className="w-8 truncate">
                  {sectionData[key] !== undefined
                    ? sectionData[key]
                    : config.default || 0}
                </p>
                <Slider
                  value={[
                    sectionData[key] !== undefined
                      ? sectionData[key]
                      : config.default || 0,
                  ]}
                  onValueChange={(value) =>
                    setSectionData((prev) => ({
                      ...prev,
                      [key]: value[0],
                    }))
                  }
                  min={0}
                  max={config.max}
                  step={1}
                />
              </div>
            )}
            {config.type === "toggle" && (
              <div className="flex items-center gap-2">
                <input
                  id={key}
                  type="checkbox"
                  checked={sectionData[key] ?? config.default ?? false}
                  onChange={(e) =>
                    setSectionData((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                  className="toggle-checkbox"
                />
                <Label htmlFor={key}>{config.label}</Label>
              </div>
            )}
            {config.type === "select" && config.options && (
              <Select
                defaultValue={String(config.default) || ""}
                onValueChange={(value) =>
                  setSectionData((prev) => ({ ...prev, [key]: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={config.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {config.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
