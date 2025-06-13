"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define types
type DeviceType = "mobile" | "tablet" | "desktop";

interface DeviceViewContextType {
  activeDevice: DeviceType;
  isPreviewMode: boolean;
}

// Create context
const StoreDeviceViewContext = createContext<DeviceViewContextType>({
  activeDevice: "desktop",
  isPreviewMode: false,
});

// Hook for using the context
export const useStoreDeviceView = () => useContext(StoreDeviceViewContext);

// Provider component
export function StoreDeviceViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("desktop");

  // Update device type based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setActiveDevice("mobile");
      } else if (width < 1024) {
        setActiveDevice("tablet");
      } else {
        setActiveDevice("desktop");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <StoreDeviceViewContext.Provider
      value={{
        activeDevice,
        isPreviewMode: false, // Always false in store view
      }}
    >
      {children}
    </StoreDeviceViewContext.Provider>
  );
}
