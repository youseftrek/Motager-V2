import { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MINIMAL_THEME_SETTINGS } from "./index";
import { useBuilder } from "@/providers/builder-context-provider";
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
import { Pipette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";

interface ColorInputProps {
  color: string;
  onChange: (value: string) => void;
  label: string;
  colorKey: string;
}

export function ThemeSettings() {
  const { state, dispatch } = useBuilder();
  const [settings, setSettings] = useState(
    state.themeSettings.colors || MINIMAL_THEME_SETTINGS.colors
  );
  const [activeColorKey, setActiveColorKey] = useState<string | null>(null);
  const [openPopoverKey, setOpenPopoverKey] = useState<string | null>(null);

  const handleColorChange = (
    category: string,
    subcategory: string | null,
    property: string,
    value: string
  ) => {
    const newSettings = { ...settings };

    if (subcategory) {
      newSettings.lightMode[category][subcategory][property] = value;
    } else {
      newSettings.lightMode[category][property] = value;
    }

    setSettings(newSettings);
  };

  const handleColorPick = async (key: string) => {
    if (!("EyeDropper" in window)) {
      alert("Your browser does not support the EyeDropper API.");
      return;
    }

    try {
      const eyeDropper = new (window as any).EyeDropper();
      const { sRGBHex } = await eyeDropper.open();

      // Extract the parts from the key format "category-subcategory-property"
      const parts = key.split("-");
      if (parts.length === 1) {
        // Main color
        const newSettings = { ...settings };
        newSettings.main = sRGBHex;
        setSettings(newSettings);
      } else if (parts.length === 3) {
        const [category, subcategory, property] = parts;
        handleColorChange(category, subcategory, property, sRGBHex);
      } else if (parts.length === 2) {
        const [category, property] = parts;
        handleColorChange(category, null, property, sRGBHex);
      }
    } catch (error) {
      console.error("Failed to pick color:", error);
    }
  };

  const saveSettings = () => {
    dispatch({
      type: "UPDATE_THEME_SETTINGS",
      payload: { colors: settings },
    });
    toast.success("Theme settings saved successfully");
  };

  const ColorInput = ({
    color,
    onChange,
    label,
    colorKey,
  }: ColorInputProps) => {
    return (
      <div className="flex items-center justify-between py-2">
        <Label className="w-1/2">{label}</Label>
        <div className="flex items-center gap-2">
          <Popover
            open={openPopoverKey === colorKey}
            onOpenChange={(open) => {
              if (open) {
                setOpenPopoverKey(colorKey);
              } else {
                setOpenPopoverKey(null);
              }
            }}
          >
            <PopoverTrigger asChild>
              <div
                className="border-2 rounded-md w-8 h-8 cursor-pointer"
                style={{ backgroundColor: color }}
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 p-2 w-auto">
              <HexColorPicker
                color={color}
                onChange={(newColor) => onChange(newColor)}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                className="px-2 py-1 border rounded-md w-full text-sm"
              />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleColorPick(colorKey)}
          >
            <Pipette className="mr-1 w-4 h-4" />
            Pick
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <style jsx global>{`
        /* Override react-colorful's pointer events to prevent popup closing */
        .react-colorful-wrapper .react-colorful {
          pointer-events: none;
        }
        .react-colorful-wrapper .react-colorful__interactive {
          pointer-events: auto !important;
        }
      `}</style>
      <div className="space-y-4">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["main-color"]}
        >
          {/* Main Color */}
          <AccordionItem value="main-color">
            <AccordionTrigger>Main Color</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <ColorInput
                  color={settings.main}
                  onChange={(value: string) => {
                    const newSettings = { ...settings };
                    newSettings.main = value;
                    setSettings(newSettings);
                    setActiveColorKey("main");
                  }}
                  label="Main Color"
                  colorKey="main"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Background Colors */}
          <AccordionItem value="background-colors">
            <AccordionTrigger>Background Colors</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <ColorInput
                  color={settings.lightMode.background.primary}
                  onChange={(value: string) => {
                    handleColorChange("background", null, "primary", value);
                    setActiveColorKey("background-primary");
                  }}
                  label="Primary Background"
                  colorKey="background-primary"
                />
                <ColorInput
                  color={settings.lightMode.background.secondary}
                  onChange={(value: string) => {
                    handleColorChange("background", null, "secondary", value);
                    setActiveColorKey("background-secondary");
                  }}
                  label="Secondary Background"
                  colorKey="background-secondary"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Text Colors */}
          <AccordionItem value="text-colors">
            <AccordionTrigger>Text Colors</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                <ColorInput
                  color={settings.lightMode.text.primary}
                  onChange={(value: string) => {
                    handleColorChange("text", null, "primary", value);
                    setActiveColorKey("text-primary");
                  }}
                  label="Primary Text"
                  colorKey="text-primary"
                />
                <ColorInput
                  color={settings.lightMode.text.secondary}
                  onChange={(value: string) => {
                    handleColorChange("text", null, "secondary", value);
                    setActiveColorKey("text-secondary");
                  }}
                  label="Secondary Text"
                  colorKey="text-secondary"
                />
                <ColorInput
                  color={settings.lightMode.text.inverted}
                  onChange={(value: string) => {
                    handleColorChange("text", null, "inverted", value);
                    setActiveColorKey("text-inverted");
                  }}
                  label="Inverted Text"
                  colorKey="text-inverted"
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Button Colors */}
          <AccordionItem value="button-colors">
            <AccordionTrigger>Button Colors</AccordionTrigger>
            <AccordionContent>
              {["primary", "secondary", "tertiary"].map((btnType) => (
                <div key={btnType} className="mb-4 last:mb-0">
                  <h4 className="font-medium text-sm capitalize mb-2 text-muted-foreground bg-secondary/50 p-2 rounded-md">
                    {btnType} Button
                  </h4>
                  <div className="space-y-1">
                    <ColorInput
                      color={settings.lightMode.buttons[btnType].background}
                      onChange={(value: string) => {
                        handleColorChange(
                          "buttons",
                          btnType,
                          "background",
                          value
                        );
                        setActiveColorKey(`buttons-${btnType}-background`);
                      }}
                      label="Background"
                      colorKey={`buttons-${btnType}-background`}
                    />
                    <ColorInput
                      color={settings.lightMode.buttons[btnType].hover}
                      onChange={(value: string) => {
                        handleColorChange("buttons", btnType, "hover", value);
                        setActiveColorKey(`buttons-${btnType}-hover`);
                      }}
                      label="Hover"
                      colorKey={`buttons-${btnType}-hover`}
                    />
                    <ColorInput
                      color={settings.lightMode.buttons[btnType].text}
                      onChange={(value: string) => {
                        handleColorChange("buttons", btnType, "text", value);
                        setActiveColorKey(`buttons-${btnType}-text`);
                      }}
                      label="Text"
                      colorKey={`buttons-${btnType}-text`}
                    />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button onClick={saveSettings} className="w-full">
        Save Theme Settings
      </Button>
    </div>
  );
}
