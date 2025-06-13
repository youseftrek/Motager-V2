import {
  useDeviceView,
  getResponsiveClass,
} from "@/providers/device-view-context";

type ResponsiveClasses = {
  mobile: string;
  tablet: string;
  desktop: string;
};

export function useResponsiveClasses(
  classes: ResponsiveClasses,
  defaultClass: string
) {
  const { activeDevice, isPreviewMode } = useDeviceView();
  return getResponsiveClass(isPreviewMode, activeDevice, classes, defaultClass);
}

// Common responsive patterns with both preview and default classes
export const gridCols = {
  preview: {
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-4",
  },
  default: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const textSize = {
  preview: {
    mobile: "text-sm",
    tablet: "text-base",
    desktop: "text-lg",
  },
  default: "text-sm sm:text-base lg:text-lg",
};

export const padding = {
  preview: {
    mobile: "p-4",
    tablet: "p-6",
    desktop: "p-8",
  },
  default: "p-4 sm:p-6 lg:p-8",
};

export const gap = {
  preview: {
    mobile: "gap-4",
    tablet: "gap-6",
    desktop: "gap-8",
  },
  default: "gap-4 sm:gap-6 lg:gap-8",
};
