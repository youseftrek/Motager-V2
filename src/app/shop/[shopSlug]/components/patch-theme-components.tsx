"use client";

import React from "react";
import { useStoreDeviceView } from "./StoreDeviceViewProvider";

/**
 * This file contains patches for theme components to make them work in the store view
 * It provides mock implementations of hooks and components used in the theme components
 */

// Mock implementation of useDeviceView that uses our store device view
export function useDeviceView() {
  return useStoreDeviceView();
}

// Mock implementation of useResponsiveClasses that works in the store view
export function useResponsiveClasses(
  deviceClasses: { mobile?: string; tablet?: string; desktop?: string },
  defaultClasses: string = ""
) {
  const deviceView = useStoreDeviceView();

  if (!deviceView) {
    return defaultClasses;
  }

  const { activeDevice } = deviceView;
  return deviceClasses[activeDevice] || defaultClasses;
}

// Export mock components as needed
export const DeviceViewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};
