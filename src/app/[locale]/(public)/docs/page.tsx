"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-8 px-4 lg:mt-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Theme Development Guide</h1>
        <p className="text-lg text-muted-foreground mb-8">
          A comprehensive guide to understanding and creating themes for the
          Motager platform.
        </p>

        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="structure">Structure</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme System Overview</CardTitle>
                <CardDescription>
                  Understanding the core concepts of the theme architecture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Motager theme system is built around a modular,
                  component-based architecture that allows for flexible,
                  customizable website creation. Each theme consists of a
                  collection of sections that can be arranged and configured
                  through a visual builder interface.
                </p>
                <p>
                  Each theme in the system is a self-contained package with its
                  own utilities, components, and configuration. This modular
                  approach allows developers to create completely custom themes
                  with unique styling and functionality while maintaining
                  compatibility with the core platform. Themes can be built from
                  scratch or by adapting existing components to match specific
                  design requirements.
                </p>
                <div className="bg-muted p-4 rounded-md mt-4">
                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Component-based architecture with React</li>
                    <li>Theming system with customizable colors and styles</li>
                    <li>Visual section editor with real-time preview</li>
                    <li>
                      Modular sections that can be added, removed, and reordered
                    </li>
                    <li>Responsive design built-in to all components</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Structure</CardTitle>
                <CardDescription>
                  Understanding the file structure and organization of a theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Each theme follows a specific structure to ensure consistency
                  and maintainability. Here's the structure of a typical theme:
                </p>
                <div className="bg-muted p-4 rounded-md font-mono text-sm mb-6">
                  <pre className="whitespace-pre-wrap">
                    {`themes/
└── your-theme-name/
    ├── index.ts           # Main entry point exporting all theme components
    ├── config.ts          # Theme configuration and metadata
    ├── theme-utils.ts     # Utility functions for theming
    ├── theme-components.tsx # Shared themed UI components
    ├── sections-config.ts # Configuration for section editor UI
    ├── sections/          # Individual section components
    │   ├── Hero.tsx
    │   ├── Footer.tsx
    │   └── ...
    ├── settings/          # Theme settings and defaults
    │   └── index.ts
    └── editor/            # Theme editor components
        └── ThemeEditor.tsx`}
                  </pre>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="files-1">
                    <AccordionTrigger>Core Files</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        <li>
                          <strong>index.ts</strong> - Exports all theme
                          components and utilities for easy importing
                        </li>
                        <li>
                          <strong>config.ts</strong> - Contains theme metadata,
                          default sections, and configuration
                        </li>
                        <li>
                          <strong>theme-utils.ts</strong> - Utility functions
                          for working with theme colors and styles
                        </li>
                        <li>
                          <strong>theme-components.tsx</strong> - Reusable UI
                          components that apply theme styling
                        </li>
                        <li>
                          <strong>sections-config.ts</strong> - Configuration
                          for the section editor UI, including input grouping
                          and ordering
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="files-2">
                    <AccordionTrigger>Directories</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-3">
                        <li>
                          <strong>sections/</strong> - Contains individual
                          section components that make up the theme
                        </li>
                        <li>
                          <strong>settings/</strong> - Default theme settings
                          including colors, fonts, and other style variables
                        </li>
                        <li>
                          <strong>editor/</strong> - Components for the theme
                          editor interface
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Components</CardTitle>
                <CardDescription>
                  Understanding the core themed components and utilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Theme Colors</h3>
                    <p className="mb-2">
                      The theme system uses a consistent color system defined in{" "}
                      <code>settings/index.ts</code> and accessed through the{" "}
                      <code>extractThemeColors</code> utility.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="text-xs overflow-auto">{`// Example of the theme colors structure
const colors = {
  main: "#6F4E37",
  text: {
    primary: "#6F4E37",
    secondary: "#5C4033",
    inverted: "#fafafa",
  },
  background: {
    primary: "#fafafa",
    secondary: "#e0e0e0",
  },
  buttons: {
    primary: { background: "#6F4E37", text: "#fafafa", hover: "#5C4033" },
    secondary: { background: "#D2B48C", text: "#6F4E37", hover: "#C4A484" },
    tertiary: { background: "#fafafa", text: "#6F4E37", hover: "#d4d4d4" },
  },
};`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Themed Components
                    </h3>
                    <p className="mb-2">
                      The theme system provides several core components that
                      automatically apply theme styling:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>ThemedButton</strong> - A button component that
                        applies theme colors based on variant
                      </li>
                      <li>
                        <strong>ThemedHeading</strong> - A heading component
                        that applies theme text styles
                      </li>
                      <li>
                        <strong>ThemedText</strong> - A text component with
                        variants for different text styles
                      </li>
                    </ul>
                    <div className="bg-muted p-4 rounded-md mt-3">
                      <pre className="text-xs overflow-auto">{`// Example usage of themed components
<ThemedHeading 
  level={2}
  className="text-2xl font-bold" 
  colors={colors}
>
  Section Title
</ThemedHeading>

<ThemedText 
  variant="secondary"
  className="text-lg" 
  colors={colors}
>
  Description text
</ThemedText>

<ThemedButton
  variant="primary"
  size="lg"
  colors={colors}
>
  Click Me
</ThemedButton>`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Creating Sections</CardTitle>
                <CardDescription>
                  How to create and configure theme sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Sections are the building blocks of a theme. Each section is a
                  React component with a specific configuration for the editor.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Section Anatomy
                    </h3>
                    <p>Every section consists of:</p>
                    <ul className="list-disc pl-5 space-y-1 my-2">
                      <li>Props interface defining all configurable options</li>
                      <li>Config object defining editor inputs and defaults</li>
                      <li>React component implementing the section UI</li>
                    </ul>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <pre className="text-xs overflow-auto">{`// Example section component structure
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";

// Props interface
export type ExampleSectionProps = {
  title: string;
  description: string;
  buttonText?: string;
  backgroundColor?: string;
  themeColors?: any;
};

// Editor configuration
export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      default: "Section Title",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      default: "Section description text",
    },
    buttonText: {
      type: "text" as const,
      label: "Button Text",
      default: "Learn More",
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#ffffff",
    },
  },
};

// Component implementation
export default function ExampleSection({
  title = "Section Title",
  description = "Section description text",
  buttonText = "Learn More",
  backgroundColor = "#ffffff",
  themeColors,
}: ExampleSectionProps) {
  // Extract theme colors
  const colors = extractThemeColors(themeColors);
  
  return (
    <section style={{ backgroundColor }}>
      <div className="container mx-auto py-12 px-4">
        <ThemedHeading level={2} colors={colors}>
          {title}
        </ThemedHeading>
        <ThemedText variant="secondary" colors={colors}>
          {description}
        </ThemedText>
        <ThemedButton variant="primary" colors={colors}>
          {buttonText}
        </ThemedButton>
      </div>
    </section>
  );
}`}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <h2 className="text-2xl font-bold mb-4">
          Step-by-Step Guide to Creating a New Theme
        </h2>

        <div className="space-y-8">
          <div className="border-l-4 border-primary pl-4 py-1">
            <h3 className="text-xl font-medium mb-2">
              Step 1: Create the Theme Directory Structure
            </h3>
            <p className="mb-4">
              Start by creating a new directory for your theme in the{" "}
              <code>src/components/themes/</code> directory.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-xs">{`mkdir -p src/components/themes/your-theme-name/sections
mkdir -p src/components/themes/your-theme-name/settings
mkdir -p src/components/themes/your-theme-name/editor`}</pre>
            </div>
          </div>

          <div className="border-l-4 border-primary pl-4 py-1">
            <h3 className="text-xl font-medium mb-2">
              Step 2: Create Core Theme Files
            </h3>
            <p className="mb-4">
              Create the essential files for your theme by copying and modifying
              from the minimal-theme.
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Create config.ts</strong> - Define theme metadata and
                default sections
                <div className="bg-muted p-3 rounded-md mt-1 text-xs">
                  <pre>{`import { getRandId } from "@/lib/utils";
import { Theme } from "@/types/theme";

export const YOUR_THEME: Theme = {
  id: getRandId(),
  name: "Your Theme Name",
  img: "/themes/your-theme.png",
  locPath: "your-theme-name/sections",
  pages: [
    {
      name: "Home",
      sections: ["Hero", "Features", "Footer"],
      initialValues: [],
      body: [],
    },
  ],
};`}</pre>
                </div>
              </li>
              <li>
                <strong>Create settings/index.ts</strong> - Define theme
                defaults including colors and fonts
              </li>
              <li>
                <strong>Create theme-utils.ts</strong> - Copy and modify from
                minimal-theme
              </li>
              <li>
                <strong>Create theme-components.tsx</strong> - Create themed UI
                components
              </li>
              <li>
                <strong>Create index.ts</strong> - Export all theme components
                and utilities
              </li>
            </ol>
          </div>

          <div className="border-l-4 border-primary pl-4 py-1">
            <h3 className="text-xl font-medium mb-2">
              Step 3: Create Section Components
            </h3>
            <p className="mb-4">
              Create individual section components in the <code>sections/</code>{" "}
              directory.
            </p>
            <p>Each section should follow this pattern:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Define props interface with all configurable options</li>
              <li>Define config object with editor inputs and defaults</li>
              <li>Implement the React component using themed components</li>
              <li>Use extractThemeColors to apply theme styling</li>
            </ol>
          </div>

          <div className="border-l-4 border-primary pl-4 py-1">
            <h3 className="text-xl font-medium mb-2">
              Step 4: Configure the Theme Editor
            </h3>
            <p className="mb-4">
              Create a sections-config.ts file to enhance the editor experience
              for your sections.
            </p>
            <p>This configuration allows you to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Group related inputs together</li>
              <li>Set the display order of inputs</li>
              <li>Add descriptions and help text</li>
              <li>Mark advanced options</li>
            </ul>
          </div>

          <div className="border-l-4 border-primary pl-4 py-1">
            <h3 className="text-xl font-medium mb-2">
              Step 5: Register Your Theme
            </h3>
            <p className="mb-4">
              Finally, register your theme in the application by adding it to
              the themes registry.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <pre className="text-xs">{`// In src/lib/themes.ts or similar
import { YOUR_THEME } from "@/components/themes/your-theme-name/config";

export const THEMES = [
  // ... other themes
  YOUR_THEME,
];`}</pre>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Component Design</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Use themed components consistently across all sections
                  </li>
                  <li>Make all styles configurable through the editor</li>
                  <li>Ensure all components are fully responsive</li>
                  <li>Provide sensible defaults for all options</li>
                  <li>
                    Use TypeScript for type safety and better developer
                    experience
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Editor Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Group related inputs for better organization</li>
                  <li>Provide clear labels and descriptions</li>
                  <li>Use appropriate input types for different data</li>
                  <li>Hide advanced options by default</li>
                  <li>
                    Ensure preview updates immediately when settings change
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 bg-muted p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Need Help?</h2>
          <p className="mb-4">
            If you have questions or need assistance with theme development,
            check out these resources:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/api/docs" className="text-primary hover:underline">
                API Documentation
              </Link>
            </li>
            <li>
              <Link href="/examples" className="text-primary hover:underline">
                Example Themes
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/your-repo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub Issues
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
