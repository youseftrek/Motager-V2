"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Loader } from "lucide-react";
import { StoreDeviceViewProvider } from "./StoreDeviceViewProvider";

// Define types for theme data
interface ThemeSection {
  id: string;
  type: string;
  name: string;
  data?: Record<string, any>;
}

interface ClientSectionsProps {
  sections: ThemeSection[];
  themePath: string;
  themeColors: any;
}

// Simple overlay loader with Loader icon
const OverlayLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <Loader className="animate-spin w-8 h-8 text-gray-600" size={32} />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

// Individual section wrapper to track loading state
const SectionWrapper = React.memo(
  ({
    section,
    themePath,
    themeColors,
    onLoadComplete,
  }: {
    section: ThemeSection;
    themePath: string;
    themeColors: any;
    onLoadComplete: (sectionId: string) => void;
  }) => {
    const [isComponentLoaded, setIsComponentLoaded] = useState(false);

    const sectionProps = {
      ...(section.data || {}),
      themeColors,
    };

    const DynamicSection = dynamic(
      () =>
        import(`@/components/themes/${themePath}/${section.type}`)
          .then((module) => {
            setTimeout(() => {
              setIsComponentLoaded(true);
            }, 100);
            return module;
          })
          .catch((err) => {
            console.error(`Error loading section ${section.type}:`, err);
            setIsComponentLoaded(true);
            return () => (
              <div className="w-full p-8 bg-red-50 text-red-500 border border-red-200 rounded-lg">
                <h3 className="font-bold">
                  Error loading section: {section.type}
                </h3>
                <p>Please check the console for more details.</p>
              </div>
            );
          }),
      {
        loading: () => null, // No individual loading states
        ssr: false,
      }
    );

    // Notify parent when this section is loaded
    useEffect(() => {
      if (isComponentLoaded) {
        onLoadComplete(section.id);
      }
    }, [isComponentLoaded, section.id, onLoadComplete]);

    return (
      <Suspense fallback={null}>
        {/* @ts-ignore */}
        <DynamicSection {...sectionProps} />
      </Suspense>
    );
  }
);

SectionWrapper.displayName = "SectionWrapper";

export default function ClientSections({
  sections,
  themePath,
  themeColors,
}: ClientSectionsProps) {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set());
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  // Handle when a section completes loading
  const handleSectionLoadComplete = useCallback((sectionId: string) => {
    setLoadedSections((prev) => {
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
  }, []);

  // Check if all sections are loaded
  useEffect(() => {
    if (sections.length > 0 && loadedSections.size === sections.length) {
      const timer = setTimeout(() => {
        setIsAllLoaded(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [loadedSections.size, sections.length]);

  // Hide loader initially if no sections
  useEffect(() => {
    if (sections.length === 0) {
      setIsAllLoaded(true);
    }
  }, [sections.length]);

  return (
    <StoreDeviceViewProvider>
      {/* Simple overlay loader */}
      <OverlayLoader isLoading={!isAllLoaded} />

      {/* Main content */}
      <main
        className={`transition-opacity duration-300 ${
          isAllLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {sections.map((section) => (
          <SectionWrapper
            key={section.id}
            section={section}
            themePath={themePath}
            themeColors={themeColors}
            onLoadComplete={handleSectionLoadComplete}
          />
        ))}
      </main>
    </StoreDeviceViewProvider>
  );
}
