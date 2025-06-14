"use client";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Laptop,
  Loader,
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
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import { ExitDialog } from "./ExitDialog";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { useBuilder } from "@/providers/builder-context-provider";
import { saveTheme } from "@/actions/saveTheme";
import { useParams } from "next/navigation";
import { useDeviceView } from "@/providers/device-view-context";
import { getStoreById } from "@/actions/getTheme";

const BuilderNavbar = () => {
  const { canRedo, canUndo, undo, redo, state, dispatch } = useBuilder();
  const { storeId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { activeDevice, setActiveDevice } = useDeviceView();

  useEffect(() => {
    const fetchTheme = async () => {
      setIsLoading(true);
      try {
        const res = await getStoreById(Number(storeId));

        if (res.status) {
          const theme = res.data[0].theme;
          dispatch({
            type: "LOAD_INITIAL_THEME",
            payload: {
              ...theme.selectedTheme,
              themeSettings: theme.themeSettings,
            },
          });
        }
      } catch (error) {
        console.error("Failed to fetch theme:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTheme();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await saveTheme({
        availableSections: state.availableSections,
        selectedTheme: state.selectedTheme,
        themeSettings: state.themeSettings,
        storeId: storeId,
      });

      if (res.status) {
        toast.success("Theme saved successfully");
        setIsSaving(false);
      }
    } catch (error) {
      console.error("Failed to save theme:", error);
      toast.error("Failed to save theme");
      setIsSaving(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <Loader
              className="animate-spin w-8 h-8 text-gray-600 dark:text-gray-300"
              size={32}
            />
            <p className="text-gray-600 dark:text-gray-300 font-medium text-center">
              Loading Your Theme...
            </p>
          </div>
        </div>
      )}

      <div className="top-0 left-0 z-40 fixed bg-background/70 backdrop-blur-md w-full">
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
                <Button size="sm" onClick={handleSave} loading={isSaving}>
                  {!isSaving && <Save />} Save
                </Button>
              </div>
            </nav>
          </header>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default BuilderNavbar;
