"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type DeviceView = "desktop" | "tablet" | "mobile";

interface DeviceViewContextType {
  activeDevice: DeviceView;
  setActiveDevice: (device: DeviceView) => void;
  isPreviewMode: boolean;
  isBuilderMode: boolean;
}

const DeviceViewContext = createContext<DeviceViewContextType | undefined>(
  undefined
);

interface DeviceViewProviderProps {
  children: ReactNode;
  isPreviewMode?: boolean;
  isBuilderMode?: boolean;
}

export function DeviceViewProvider({
  children,
  isPreviewMode = false,
  isBuilderMode = false,
}: DeviceViewProviderProps) {
  const [activeDevice, setActiveDevice] = useState<DeviceView>("desktop");

  return (
    <DeviceViewContext.Provider
      value={{
        activeDevice,
        setActiveDevice,
        isPreviewMode,
        isBuilderMode,
      }}
    >
      {children}
    </DeviceViewContext.Provider>
  );
}

export function useDeviceView() {
  const context = useContext(DeviceViewContext);
  if (context === undefined) {
    throw new Error("useDeviceView must be used within a DeviceViewProvider");
  }
  return context;
}

// Utility function to get responsive classes based on device view or Tailwind defaults
export function getResponsiveClass(
  isPreviewMode: boolean,
  activeDevice: DeviceView,
  previewClasses: Record<DeviceView, string>,
  defaultClass: string
): string {
  return isPreviewMode ? previewClasses[activeDevice] : defaultClass;
}
