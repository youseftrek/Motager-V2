"use client";

import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Pipette, Sparkles, Palette, Sliders } from "lucide-react";
import { SECTIONS_CONFIG } from "../sections-config";
import { extractThemeColors, ThemeColors } from "../theme-utils";
import { useBuilder } from "@/providers/builder-context-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type InputConfig = {
  type: string;
  label: string;
  placeholder?: string;
  default?: any;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  // Add any other properties from the original InputConfig
};

export function ThemeEditor() {
  const { state, dispatch } = useBuilder();
  const [isOpen, setIsOpen] = useState(false);
  const [sectionData, setSectionData] = useState<Record<string, any>>({});
  const [sectionConfig, setSectionConfig] = useState<Record<
    string,
    InputConfig
  > | null>(null);
  const [activeTab, setActiveTab] = useState("content");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // Extract theme colors for styling the editor
  const themeColors = state.themeSettings?.colors;
  const colors = extractThemeColors(themeColors);

  useEffect(() => {
    const loadConfig = async () => {
      if (state.selectedSection) {
        try {
          // Load the component's config
          const item = await import(
            `@/components/themes/minimal-theme/sections/${state.selectedSection.type}`
          );

          // Set section config from the component's config
          setSectionConfig(item.config?.inputs || null);
          setIsOpen(true);

          // Initialize data from the selected section
          const initialData = { ...(state.selectedSection.data || {}) };

          // Apply default values from component config if not set in section data
          if (item.config?.inputs) {
            Object.entries(item.config.inputs).forEach(([key, inputConfig]) => {
              // Properly type the inputConfig object
              const typedConfig = inputConfig as InputConfig;
              if (
                initialData[key] === undefined &&
                typedConfig.default !== undefined
              ) {
                initialData[key] = typedConfig.default;
              }
            });
          }

          setSectionData(initialData);

          // Set default expanded groups from sections-config.ts
          const sectionName = state.selectedSection.type;
          const sectionConfigData =
            SECTIONS_CONFIG[sectionName as keyof typeof SECTIONS_CONFIG];
          if (sectionConfigData?.groups) {
            const defaultExpanded = Object.entries(sectionConfigData.groups)
              .filter(([_, groupConfig]) => groupConfig.expanded)
              .map(([groupName]) => groupName);
            setExpandedGroups(defaultExpanded);
          }

          // Set default active tab
          setActiveTab("content");
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

  const renderInput = (
    key: string,
    config: InputConfig,
    value: any,
    onChange: (value: any) => void,
    additionalConfig?: any
  ) => {
    const helpText = additionalConfig?.helpText;
    const description = additionalConfig?.description;

    const inputElement = () => {
      switch (config.type) {
        case "text":
          return (
            <Input
              id={key}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={config.placeholder}
              className="border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
              style={{
                borderColor: colors.buttons.primary.background + "40",
                borderRadius: "0.375rem",
              }}
            />
          );
        case "textarea":
          return (
            <Textarea
              id={key}
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={config.placeholder}
              className="border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
              style={{
                borderColor: colors.buttons.primary.background + "40",
                borderRadius: "0.375rem",
              }}
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
              className="border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
              style={{
                borderColor: colors.buttons.primary.background + "40",
                borderRadius: "0.375rem",
              }}
            />
          );
        case "color":
          return (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className="border-2 rounded-md w-8 h-8 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      backgroundColor: value || config.default || "#000000",
                      borderColor: colors.buttons.primary.background + "40",
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
                    style={{
                      borderColor: colors.buttons.primary.background + "40",
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleColorPick(key)}
                style={{
                  borderColor: colors.buttons.primary.background + "40",
                  color: colors.buttons.primary.text,
                }}
                className="hover:bg-muted/80"
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
                className="cursor-pointer"
                style={
                  {
                    "--slider-track": colors.buttons.primary.background,
                    "--slider-thumb": colors.buttons.primary.background,
                  } as React.CSSProperties
                }
              />
            </div>
          );
        case "toggle":
        case "boolean":
          return (
            <Switch
              checked={value ?? false}
              onCheckedChange={(checked) => onChange(checked)}
              style={
                {
                  "--switch-thumb": "white",
                  "--switch-track": colors.buttons.primary.background,
                } as React.CSSProperties
              }
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
              <SelectTrigger
                className="border-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-background focus-visible:ring-ring"
                style={{
                  borderColor: colors.buttons.primary.background + "40",
                  borderRadius: "0.375rem",
                }}
              >
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

    return (
      <div className="space-y-1">
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {inputElement()}
        {helpText && (
          <p className="text-xs text-muted-foreground mt-1">{helpText}</p>
        )}
      </div>
    );
  };

  const renderGroupedInputs = () => {
    if (!sectionConfig || !state.selectedSection) return null;

    const sectionName = state.selectedSection.type;
    const sectionConfigData =
      SECTIONS_CONFIG[sectionName as keyof typeof SECTIONS_CONFIG];

    if (!sectionConfigData) {
      // Fallback to simple list if no config exists
      return (
        <div className="space-y-4">
          {Object.entries(sectionConfig).map(([key, config]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{config.label}</Label>
              {renderInput(
                key,
                config,
                sectionData[key] !== undefined
                  ? sectionData[key]
                  : config.default,
                (value) => setSectionData((prev) => ({ ...prev, [key]: value }))
              )}
            </div>
          ))}
        </div>
      );
    }

    // If we have groups defined, organize by tabs and groups
    const groups = sectionConfigData.groups || {
      default: { title: "Settings", order: 1 },
    };

    // Organize inputs by group
    const inputsByGroup: Record<
      string,
      { key: string; config: InputConfig }[]
    > = {};

    Object.entries(sectionConfig).forEach(([key, config]) => {
      const inputConfig = sectionConfigData.inputs[key] || {};
      const group = inputConfig.group || "default";

      if (!inputsByGroup[group]) {
        inputsByGroup[group] = [];
      }

      inputsByGroup[group].push({
        key,
        config,
      });
    });

    // Sort groups by order
    const sortedGroups = Object.entries(groups).sort(
      (a, b) => (a[1].order || 999) - (b[1].order || 999)
    );

    // Determine which tabs to show
    const tabs = ["content"];
    if (Object.keys(inputsByGroup).some((group) => group === "appearance")) {
      tabs.push("appearance");
    }
    if (
      Object.keys(inputsByGroup).some((group) =>
        ["advanced", "layout"].includes(group)
      )
    ) {
      tabs.push("advanced");
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          className="w-full mb-4 bg-muted/50 p-1"
          style={
            {
              borderRadius: "0.5rem",
              "--tab-accent-color": colors.buttons.primary.background,
            } as React.CSSProperties
          }
        >
          {tabs.includes("content") && (
            <TabsTrigger
              value="content"
              className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:shadow-sm"
              style={{
                color: colors.text.primary,
                borderRadius: "0.375rem",
              }}
            >
              <Sparkles
                size={16}
                className="mr-2"
                style={{ color: colors.buttons.primary.background }}
              />
              Content
            </TabsTrigger>
          )}
          {tabs.includes("appearance") && (
            <TabsTrigger
              value="appearance"
              className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:shadow-sm"
              style={{
                color: colors.text.primary,
                borderRadius: "0.375rem",
              }}
            >
              <Palette
                size={16}
                className="mr-2"
                style={{ color: colors.buttons.primary.background }}
              />
              Appearance
            </TabsTrigger>
          )}
          {tabs.includes("advanced") && (
            <TabsTrigger
              value="advanced"
              className="flex-1 data-[state=active]:bg-white/90 data-[state=active]:shadow-sm"
              style={{
                color: colors.text.primary,
                borderRadius: "0.375rem",
              }}
            >
              <Sliders
                size={16}
                className="mr-2"
                style={{ color: colors.buttons.primary.background }}
              />
              Advanced
            </TabsTrigger>
          )}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {sortedGroups
              .filter(([groupName]) => {
                // Filter groups by tab
                if (tab === "content") {
                  return ["content", "main", "buttons"].includes(groupName);
                } else if (tab === "appearance") {
                  return ["appearance", "image"].includes(groupName);
                } else if (tab === "advanced") {
                  return [
                    "advanced",
                    "layout",
                    "slider",
                    "links",
                    "newsletter",
                  ].includes(groupName);
                }
                return false;
              })
              .map(([groupName, groupConfig]) => {
                if (
                  !inputsByGroup[groupName] ||
                  inputsByGroup[groupName].length === 0
                ) {
                  return null;
                }

                // Sort inputs by order
                const sortedInputs = [...inputsByGroup[groupName]].sort(
                  (a, b) => {
                    const aOrder =
                      sectionConfigData.inputs[a.key]?.order || 999;
                    const bOrder =
                      sectionConfigData.inputs[b.key]?.order || 999;
                    return aOrder - bOrder;
                  }
                );

                return (
                  <Card
                    key={groupName}
                    className="border border-muted-foreground/20 shadow-sm"
                    style={{
                      borderColor: colors.buttons.primary.background + "20",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle
                        className="text-lg"
                        style={{
                          color: colors.text.primary,
                        }}
                      >
                        {groupConfig.title}
                      </CardTitle>
                      {groupConfig.description && (
                        <CardDescription>
                          {groupConfig.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {sortedInputs.map(({ key, config }) => {
                        const additionalConfig = sectionConfigData.inputs[key];
                        return (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label
                                htmlFor={key}
                                style={{
                                  color: colors.text.primary,
                                }}
                              >
                                {config.label}
                              </Label>
                              {(config.type === "boolean" ||
                                config.type === "toggle") &&
                                renderInput(
                                  key,
                                  config,
                                  sectionData[key] !== undefined
                                    ? sectionData[key]
                                    : config.default,
                                  (value) =>
                                    setSectionData((prev) => ({
                                      ...prev,
                                      [key]: value,
                                    })),
                                  additionalConfig
                                )}
                            </div>
                            {config.type !== "boolean" &&
                              config.type !== "toggle" &&
                              renderInput(
                                key,
                                config,
                                sectionData[key] !== undefined
                                  ? sectionData[key]
                                  : config.default,
                                (value) =>
                                  setSectionData((prev) => ({
                                    ...prev,
                                    [key]: value,
                                  })),
                                additionalConfig
                              )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  // Preview section with current settings
  const renderPreview = () => {
    if (!state.selectedSection) return null;

    const colors = extractThemeColors(state.themeSettings.colors);

    return (
      <div
        className="border rounded-md p-4 mb-4 shadow-sm"
        style={{
          borderColor: colors.buttons.primary.background + "20",
          borderRadius: "0.5rem",
        }}
      >
        <h3
          className="text-sm font-medium mb-2"
          style={{
            color: colors.text.primary,
          }}
        >
          Preview
        </h3>
        <div
          className="rounded-md p-4 text-center"
          style={{
            backgroundColor: colors.background.secondary + "40",
            borderRadius: "0.375rem",
          }}
        >
          <div
            className="text-sm"
            style={{
              color: colors.text.primary,
            }}
          >
            {state.selectedSection.type} - {state.selectedSection.name}
          </div>
          {/* Could render a simplified preview here */}
        </div>
      </div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent
        className="sm:max-w-md"
        style={{
          backgroundColor: colors.background.primary,
          borderLeft: `1px solid ${colors.buttons.primary.background}20`,
        }}
      >
        <SheetHeader>
          <SheetTitle
            style={{
              color: colors.text.primary,
            }}
          >
            {(state.selectedSection?.type &&
              SECTIONS_CONFIG[
                state.selectedSection.type as keyof typeof SECTIONS_CONFIG
              ]?.title) ||
              `Edit ${state.selectedSection?.name}`}
          </SheetTitle>
          {state.selectedSection?.type &&
            SECTIONS_CONFIG[
              state.selectedSection.type as keyof typeof SECTIONS_CONFIG
            ]?.description && (
              <p
                className="text-sm text-muted-foreground"
                style={{
                  color: colors.text.secondary,
                }}
              >
                {
                  SECTIONS_CONFIG[
                    state.selectedSection.type as keyof typeof SECTIONS_CONFIG
                  ].description
                }
              </p>
            )}
        </SheetHeader>

        <div className="py-4 max-h-[calc(100vh-120px)] overflow-y-auto">
          {renderPreview()}
          {renderGroupedInputs()}
        </div>

        <SheetFooter>
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: colors.buttons.primary.background,
              color: colors.buttons.primary.text,
            }}
            className="hover:opacity-90 transition-opacity"
          >
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
