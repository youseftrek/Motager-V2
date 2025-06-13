"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { StoreDeviceViewProvider } from "./StoreDeviceViewProvider";

interface ClientThemeWrapperProps {
  sectionType: string;
  sectionPath: string;
  sectionProps: any;
}

// Mock the device view hooks for the theme components
// This needs to be done before importing the components
if (typeof window !== "undefined") {
  // Only run this on the client
  (window as any).mockDeviceViewHooks = true;

  // Mock the modules
  (window as any).__NEXT_MODULE_PATCHERS = [
    {
      matcher: /device-view-context/,
      patcher: () => ThemePatch,
    },
    {
      matcher: /use-responsive-classes/,
      patcher: () => ({
        useResponsiveClasses: ThemePatch.useResponsiveClasses,
      }),
    },
  ];
}

export default function ClientThemeWrapper({
  sectionType,
  sectionPath,
  sectionProps,
}: ClientThemeWrapperProps) {
  // Dynamically import the section component
  const DynamicSection = dynamic(
    () =>
      import(`@/components/themes/${sectionPath}/${sectionType}`).catch(
        (err) => {
          console.error(`Error loading section ${sectionType}:`, err);
          return () => (
            <div className="w-full p-8 bg-red-50 text-red-500 border border-red-200 rounded-lg">
              <h3 className="font-bold">
                Error loading section: {sectionType}
              </h3>
              <p>Please check the console for more details.</p>
            </div>
          );
        }
      ),
    {
      loading: () => (
        <div className="w-full h-48 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse">Loading {sectionType}...</div>
        </div>
      ),
      ssr: false, // Disable SSR to avoid server-side hook errors
    }
  );

  // Wrap the component in StoreDeviceViewProvider to handle client-side hooks
  return (
    <StoreDeviceViewProvider>
      <Suspense
        fallback={
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse">Loading {sectionType}...</div>
          </div>
        }
      >
        <DynamicSection {...sectionProps} />
      </Suspense>
    </StoreDeviceViewProvider>
  );
}
