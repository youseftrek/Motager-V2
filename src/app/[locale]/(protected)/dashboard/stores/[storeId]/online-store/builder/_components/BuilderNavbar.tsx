"use client";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Laptop,
  Monitor,
  Redo,
  Save,
  Smartphone,
  Undo,
} from "lucide-react";
import TooltipChildren from "@/components/ui/TooltipChildren";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { ExitDialog } from "./ExitDialog";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { useBuilder } from "@/providers/builder-context-provider";
import { getTheme, saveThemeSettings } from "@/actions";

const BuilderNavbar = () => {
  const { canRedo, canUndo, undo, redo, state } = useBuilder();
  const handleSave = async () => {
    try {
      // First save theme settings
      if (state.themeSettings) {
        await saveThemeSettings(state.themeSettings);
      }

      // Then save the theme
      const res = await getTheme(state.selectedTheme?.id, {
        ...state.selectedTheme!,
        themeSettings: state.themeSettings,
      });

      if (res) toast.success("Theme saved successfully");
    } catch (error) {
      console.error("Failed to save theme:", error);
      toast.error("Failed to save theme");
    }
  };
  const [activeDevice, setActiveDevice] = useState("desktop");
  return (
    <div className="top-0 left-0 z-50 fixed bg-background/70 backdrop-blur-md w-full">
      <MaxWidthWrapper className="px-2 lg:px-4 max-w-[100%]">
        <header className="flex items-center pt-2 lg:pt-4 rounded-b-md">
          <nav className="flex flex-shrink flex-1 justify-between items-center bg-secondary md:mx-0 p-2 border rounded-md max-h-[56px]">
            <div className="flex items-center gap-2">
              <ExitDialog />
              <TooltipChildren message={"Components"}>
                <SidebarTrigger />
              </TooltipChildren>
              <ModeToggle buttonVariant="ghost" />
            </div>
            <div className="flex items-center gap-2">
              <TooltipChildren message={"Desktop View"}>
                <Button
                  onClick={() => {
                    setActiveDevice("desktop");
                    toast.success("Switched to desktop view.");
                  }}
                  variant="outline"
                  size="icon"
                  className={cn(
                    activeDevice === "desktop" &&
                      "text-primary hover:text-primary scale-110 transition-all",
                    "hidden lg:flex"
                  )}
                >
                  <Monitor />
                </Button>
              </TooltipChildren>
              <TooltipChildren message={"Laptop / Tablet View"}>
                <Button
                  onClick={() => {
                    setActiveDevice("tablet");
                    toast.success("Switched to laptop / tablet view.");
                  }}
                  variant="outline"
                  size="icon"
                  className={cn(
                    activeDevice === "tablet" &&
                      "text-primary hover:text-primary scale-110 transition-all",
                    "hidden md:flex"
                  )}
                >
                  <Laptop />
                </Button>
              </TooltipChildren>
              <TooltipChildren message={"Mobile View"}>
                <Button
                  onClick={() => {
                    setActiveDevice("mobile");
                    toast.success("Switched to mobile view.");
                  }}
                  variant="outline"
                  size="icon"
                  className={cn(
                    activeDevice === "mobile" &&
                      "text-primary hover:text-primary scale-110 transition-all",
                    ""
                  )}
                >
                  <Smartphone />
                </Button>
              </TooltipChildren>
            </div>
            <div className="flex items-center gap-2">
              <TooltipChildren message={"Undo"}>
                <Button
                  disabled={!canUndo}
                  variant="outline"
                  size="icon"
                  onClick={() => undo()}
                >
                  <Undo />
                </Button>
              </TooltipChildren>
              <TooltipChildren message={"Redo"}>
                <Button
                  disabled={!canRedo}
                  variant="outline"
                  size="icon"
                  onClick={() => redo()}
                >
                  <Redo />
                </Button>
              </TooltipChildren>
              <TooltipChildren message={"Preview"}>
                <Button variant="outline" size="icon">
                  <Eye />
                </Button>
              </TooltipChildren>
              <Button size="sm" onClick={handleSave} disabled={!canUndo}>
                <Save /> Save
              </Button>
            </div>
          </nav>
        </header>
      </MaxWidthWrapper>
    </div>
  );
};

export default BuilderNavbar;
