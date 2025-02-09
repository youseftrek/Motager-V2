"use client";
import { createContext, useContext, useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

type DeviceContextType = {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
  viewportStyles: string;
};

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

const getViewportStyles = (device: DeviceType) => {
  switch (device) {
    case "mobile":
      return "[--viewport-width:390px]";
    case "tablet":
      return "[--viewport-width:820px]";
    default:
      return "[--viewport-width:100%]";
  }
};

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const viewportStyles = getViewportStyles(device);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DeviceContext.Provider value={{ device, setDevice, viewportStyles }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const context = useContext(DeviceContext);
  if (!context) throw new Error("useDevice must be used within DeviceProvider");
  return context;
}
