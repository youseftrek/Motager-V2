"use client";

import { useStoreDeviceView } from "../components/StoreDeviceViewProvider";

type DeviceClasses = {
  mobile?: string;
  tablet?: string;
  desktop?: string;
};

/**
 * A hook that returns responsive classes based on the current device view
 * This is a simplified version of useResponsiveClasses for the store view
 */
export function useStoreResponsiveClasses(
  deviceClasses: DeviceClasses,
  defaultClasses: string = ""
): string {
  const deviceView = useStoreDeviceView();

  // If we're not in a client component or deviceView is not available
  if (!deviceView) {
    return defaultClasses;
  }

  // In store view, we always use the real device width
  const { activeDevice } = deviceView;

  // Return the appropriate classes based on the active device
  return deviceClasses[activeDevice] || defaultClasses;
}
