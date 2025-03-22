/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Pipette, Plus, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type InputConfig = {
  type:
    | "text"
    | "number"
    | "color"
    | "slider"
    | "textarea"
    | "select"
    | "toggle"
    | "boolean"
    | "array";
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  default?: number | string | boolean;
  options?: { value: string; label: string }[];
  arrayItemType?: InputConfig;
};

export type SectionData = Record<string, any>;

export function EditSectionSheet() {
  const { state, dispatch } = useBuilder();
  const [isOpen, setIsOpen] = useState(false);
  const [sectionData, setSectionData] = useState<SectionData>({});
  const [sectionConfig, setSectionConfig] = useState<Record<
    string,
    InputConfig
  > | null>(null);
  const [activeColorKey, setActiveColorKey] = useState<string | null>(null);
  const [activeArrayKey, setActiveArrayKey] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      if (state.selectedSection) {
        try {
          const item = await import(
            `@/components/themes/minimal-theme/sections/${state.selectedSection.type}`
          );
          setSectionConfig(item.config?.inputs || null);
          setIsOpen(true);

          // Ensure arrays are properly initialized from data
          const initialData = { ...(state.selectedSection.data || {}) };

          // Check if this is a footer and ensure socialLinks and columns are arrays
          if (state.selectedSection.type === "Footer") {
            if (
              !initialData.socialLinks ||
              !Array.isArray(initialData.socialLinks)
            ) {
              initialData.socialLinks = [];
            }
            if (!initialData.columns || !Array.isArray(initialData.columns)) {
              initialData.columns = [];
            }
          }

          setSectionData(initialData);
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
      setActiveColorKey(null);
      setActiveArrayKey(null);
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

  const handleAddArrayItem = (key: string, defaultValue: any = {}) => {
    setSectionData((prev) => {
      const currentArray = Array.isArray(prev[key]) ? [...prev[key]] : [];
      return {
        ...prev,
        [key]: [...currentArray, defaultValue],
      };
    });
  };

  const handleRemoveArrayItem = (key: string, index: number) => {
    setSectionData((prev) => {
      const newArray = [...(prev[key] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [key]: newArray,
      };
    });
  };

  const handleUpdateArrayItem = (key: string, index: number, value: any) => {
    setSectionData((prev) => {
      const newArray = [...(prev[key] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [key]: newArray,
      };
    });
  };

  const renderArrayItemInputs = (
    key: string,
    index: number,
    itemConfig: InputConfig,
    itemData: any
  ) => {
    const handleItemChange = (value: any) => {
      handleUpdateArrayItem(key, index, value);
    };

    // Special handling for footer social links and columns
    if (key === "socialLinks") {
      return (
        <div className="bg-muted/30 mb-2 p-3 border rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Social Link {index + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveArrayItem(key, index)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-2">
            <Label className="text-xs">Platform</Label>
            <Select
              value={itemData.platform || ""}
              onValueChange={(value) => {
                const updatedItem = { ...itemData, platform: value };
                handleItemChange(updatedItem);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="GitHub">GitHub</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-2">
            <Label className="text-xs">URL</Label>
            <Input
              value={itemData.url || ""}
              onChange={(e) => {
                const updatedItem = { ...itemData, url: e.target.value };
                handleItemChange(updatedItem);
              }}
              placeholder="https://"
            />
          </div>

          <div className="mb-2">
            <Label className="text-xs">Icon (Optional)</Label>
            <Input
              value={itemData.icon || ""}
              onChange={(e) => {
                const updatedItem = { ...itemData, icon: e.target.value };
                handleItemChange(updatedItem);
              }}
              placeholder="Icon name (optional)"
            />
          </div>
        </div>
      );
    } else if (key === "columns") {
      return (
        <div className="bg-muted/30 mb-2 p-3 border rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-sm">Footer Column {index + 1}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveArrayItem(key, index)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>

          <div className="mb-2">
            <Label className="text-xs">Title</Label>
            <Input
              value={itemData.title || ""}
              onChange={(e) => {
                const updatedItem = { ...itemData, title: e.target.value };
                handleItemChange(updatedItem);
              }}
              placeholder="Column Title"
            />
          </div>

          <div className="mb-2">
            <Label className="text-xs">Links</Label>
            <div className="mt-2 pl-2 border-muted-foreground/20 border-l-2">
              {(itemData.links || []).map((link: any, linkIndex: number) => (
                <div key={linkIndex} className="flex items-center gap-2 mb-2">
                  <div className="flex-grow gap-2 grid grid-cols-2">
                    <Input
                      value={link.text || ""}
                      onChange={(e) => {
                        const newLinks = [...(itemData.links || [])];
                        newLinks[linkIndex] = { ...link, text: e.target.value };
                        const updatedItem = { ...itemData, links: newLinks };
                        handleItemChange(updatedItem);
                      }}
                      placeholder="Link Text"
                      className="text-xs"
                    />
                    <Input
                      value={link.url || ""}
                      onChange={(e) => {
                        const newLinks = [...(itemData.links || [])];
                        newLinks[linkIndex] = { ...link, url: e.target.value };
                        const updatedItem = { ...itemData, links: newLinks };
                        handleItemChange(updatedItem);
                      }}
                      placeholder="URL (e.g., /about)"
                      className="text-xs"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      const newLinks = [...(itemData.links || [])];
                      newLinks.splice(linkIndex, 1);
                      const updatedItem = { ...itemData, links: newLinks };
                      handleItemChange(updatedItem);
                    }}
                  >
                    <Trash className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                className="mt-1 text-xs"
                onClick={() => {
                  const newLinks = [
                    ...(itemData.links || []),
                    { text: "", url: "" },
                  ];
                  const updatedItem = { ...itemData, links: newLinks };
                  handleItemChange(updatedItem);
                }}
              >
                <Plus className="mr-1 w-3 h-3" />
                Add Link
              </Button>
            </div>
          </div>
        </div>
      );
    }

    // Default rendering for other array types
    return (
      <div className="bg-muted/30 mb-2 p-3 border rounded-md">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-sm">Item {index + 1}</h4>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveArrayItem(key, index)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>

        {Object.entries(itemConfig).map(([fieldKey, fieldConfig]) => {
          if (fieldKey === "type" || fieldKey === "label") return null;

          return (
            <div key={`${key}-${index}-${fieldKey}`} className="mb-2">
              <Label className="text-xs">{fieldKey}</Label>
              {renderInput(
                `${key}-${index}-${fieldKey}`,
                {
                  ...(typeof fieldConfig === "object" ? fieldConfig : {}),
                  type:
                    typeof fieldConfig === "string"
                      ? (fieldConfig as InputConfig["type"])
                      : typeof fieldConfig === "object" && "type" in fieldConfig
                      ? fieldConfig.type
                      : "text",
                  label: fieldKey,
                },
                itemData[fieldKey] || "",
                (value) => {
                  const updatedItem = { ...itemData, [fieldKey]: value };
                  handleItemChange(updatedItem);
                }
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const getDefaultValue = (config: InputConfig) => {
    if (config.default !== undefined) return config.default;

    switch (config.type) {
      case "text":
      case "textarea":
        return "";
      case "number":
      case "slider":
        return 0;
      case "color":
        return "#000000";
      case "boolean":
      case "toggle":
        return false;
      case "select":
        return config.options && config.options.length > 0
          ? config.options[0].value
          : "";
      case "array":
        return [];
      default:
        return "";
    }
  };

  const renderInput = (
    key: string,
    config: InputConfig,
    value: any,
    onChange: (value: any) => void
  ) => {
    switch (config.type) {
      case "text":
        return (
          <Input
            id={key}
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={config.placeholder}
          />
        );
      case "textarea":
        return (
          <Textarea
            id={key}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={config.placeholder}
          />
        );
      case "number":
        return (
          <Input
            id={key}
            type="number"
            value={value ?? ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={config.placeholder}
            min={config.min}
            max={config.max}
          />
        );
      case "color":
        return (
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="border-2 rounded-md w-8 h-8 cursor-pointer"
                  style={{
                    backgroundColor: value || config.default || "#000000",
                  }}
                />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-2 p-2 w-auto">
                <HexColorPicker
                  color={value || config.default || "#000000"}
                  onChange={(color) => onChange(color)}
                />
                <input
                  type="text"
                  value={value || config.default || "#000000"}
                  onChange={(e) => onChange(e.target.value)}
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
              <Pipette className="mr-1 w-4 h-4" />
              Pick
            </Button>
          </div>
        );
      case "slider":
        return (
          <div className="flex items-center gap-2">
            <p className="w-8 truncate">
              {value !== undefined ? value : config.default || 0}
            </p>
            <Slider
              value={[value !== undefined ? value : config.default || 0]}
              onValueChange={(values) => onChange(values[0])}
              min={config.min || 0}
              max={config.max || 100}
              step={1}
            />
          </div>
        );
      case "toggle":
      case "boolean":
        return (
          <Switch
            checked={value ?? false}
            onCheckedChange={(checked) => onChange(checked)}
          />
        );
      case "select":
        if (!config.options || config.options.length === 0) {
          return <div>No options available</div>;
        }
        return (
          <Select
            value={String(value || "")}
            onValueChange={(val) => onChange(val)}
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
        );
      default:
        return <div>Unsupported input type: {config.type}</div>;
    }
  };

  const renderArrayInput = (key: string, config: InputConfig) => {
    const arrayValue = sectionData[key] || [];

    // Get appropriate default items for special array types
    const getDefaultItem = () => {
      if (key === "socialLinks") {
        return {
          platform: "Twitter",
          url: "https://twitter.com",
          icon: "twitter",
        };
      } else if (key === "columns") {
        return { title: "New Column", links: [{ text: "New Link", url: "/" }] };
      }
      return {};
    };

    return (
      <div className="space-y-2">
        <Accordion type="single" collapsible>
          <AccordionItem value={key}>
            <AccordionTrigger className="text-sm">
              {config.label} ({arrayValue.length} items)
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {arrayValue.length > 0 ? (
                  arrayValue.map((item: any, index: number) => (
                    <div key={`${key}-${index}`}>
                      {renderArrayItemInputs(
                        key,
                        index,
                        config.arrayItemType || { type: "text", label: "Item" },
                        item
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-muted-foreground text-sm text-center italic">
                    No items added yet
                  </div>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAddArrayItem(key, getDefaultItem())}
                >
                  <Plus className="mr-1 w-4 h-4" />
                  Add{" "}
                  {key === "socialLinks"
                    ? "Social Link"
                    : key === "columns"
                    ? "Column"
                    : "Item"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  };

  const renderInputs = () => {
    if (!sectionConfig) return null;

    return (
      <div className="flex flex-col gap-4 py-4 max-h-[calc(100vh-120px)] overflow-y-auto">
        {sectionConfig &&
          Object.entries(sectionConfig)
            .sort((a, b) => {
              // Sort so that array-type fields appear at the bottom
              const aType = a[1].type;
              const bType = b[1].type;
              if (aType === "array" && bType !== "array") return 1;
              if (aType !== "array" && bType === "array") return -1;
              return 0;
            })
            .map(([key, config]) => (
              <div
                key={key}
                className={`gap-2 grid ${
                  config.type === "array" ? "border-t pt-3 mt-2" : ""
                }`}
              >
                {config.type === "array" ? (
                  renderArrayInput(key, config)
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <Label htmlFor={key}>{config.label}</Label>
                      {(config.type === "boolean" ||
                        config.type === "toggle") &&
                        renderInput(
                          key,
                          config,
                          sectionData[key] !== undefined
                            ? sectionData[key]
                            : getDefaultValue(config),
                          (value) =>
                            setSectionData((prev) => ({
                              ...prev,
                              [key]: value,
                            }))
                        )}
                    </div>
                    {config.type !== "boolean" &&
                      config.type !== "toggle" &&
                      renderInput(
                        key,
                        config,
                        sectionData[key] !== undefined
                          ? sectionData[key]
                          : getDefaultValue(config),
                        (value) =>
                          setSectionData((prev) => ({
                            ...prev,
                            [key]: value,
                          }))
                      )}
                  </>
                )}
              </div>
            ))}
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit {state.selectedSection?.name}</SheetTitle>
        </SheetHeader>
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto">
          {renderInputs()}
        </div>
        <SheetFooter className="mt-4 pt-4 border-t">
          <Button onClick={handleSave}>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
