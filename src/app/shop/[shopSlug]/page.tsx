import { getStore } from "@/actions/getTheme";
import { notFound } from "next/navigation";

// Import theme CSS
import "./theme.css";
import ClientSections from "./components/ClientSections";
import { ReduxStoreProvider } from "@/providers/redux-store-provider";

// Define types for theme data
interface ThemeSection {
  id: string;
  type: string;
  name: string;
  data?: Record<string, any>;
}

interface ThemePage {
  name: string;
  sections: string[];
  initialValues: any[];
  body: ThemeSection[];
}

interface SelectedTheme {
  id: string;
  name: string;
  img: string;
  locPath: string;
  themeSettings: any;
  pages: ThemePage[];
}

interface ThemeSettings {
  fonts: {
    headings: string;
    body: string;
  };
  colors: {
    main: string;
    lightMode: {
      background: {
        primary: string;
        secondary: string;
      };
      buttons: {
        primary: {
          background: string;
          hover: string;
          text: string;
        };
        secondary: {
          background: string;
          hover: string;
          text: string;
        };
        tertiary: {
          background: string;
          hover: string;
          text: string;
        };
      };
      text: {
        primary: string;
        secondary: string;
        inverted: string;
      };
    };
  };
  borderRadius: {
    none: string;
    small: string;
    medium: string;
    large: string;
  };
}

interface StoreTheme {
  availableSections: string[];
  selectedTheme: SelectedTheme;
  themeSettings: ThemeSettings;
  storeId: string;
}

export default async function StorePage({
  params,
}: {
  params: Promise<{ shopSlug: string }>;
}) {
  const { shopSlug } = await params;

  // Fetch store theme data
  let storeTheme: StoreTheme;
  try {
    const response = await getStore(shopSlug);
    storeTheme = response.data.theme;

    if (!storeTheme || !storeTheme.selectedTheme) {
      return notFound();
    }
  } catch (error) {
    console.error("Error fetching store theme:", error);
    return notFound();
  }

  // Extract theme information
  const { selectedTheme, themeSettings } = storeTheme;

  // Get the homepage sections from the theme
  const homePage = selectedTheme.pages.find(
    (page: ThemePage) => page.name === "Home Page"
  );
  if (!homePage || !homePage.body || homePage.body.length === 0) {
    return <div>No sections found for this store</div>;
  }

  // Generate CSS variable overrides based on theme settings
  const generateThemeStyles = (): React.CSSProperties => {
    const styles: Record<string, string> = {};

    // Font settings - Always use Outfit font
    styles["--font-headings"] = "var(--font-outfit)";
    styles["--font-body"] = "var(--font-outfit)";

    // Color settings - Apply theme colors but use main app colors as fallbacks
    if (themeSettings?.colors?.main) {
      styles["--color-main"] = themeSettings.colors.main;
    }

    // Background colors
    if (themeSettings?.colors?.lightMode?.background?.primary) {
      styles["--color-bg-primary"] =
        themeSettings.colors.lightMode.background.primary;
    }

    if (themeSettings?.colors?.lightMode?.background?.secondary) {
      styles["--color-bg-secondary"] =
        themeSettings.colors.lightMode.background.secondary;
    }

    // Button colors - Primary
    if (themeSettings?.colors?.lightMode?.buttons?.primary?.background) {
      styles["--color-btn-primary-bg"] =
        themeSettings.colors.lightMode.buttons.primary.background;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.primary?.hover) {
      styles["--color-btn-primary-hover"] =
        themeSettings.colors.lightMode.buttons.primary.hover;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.primary?.text) {
      styles["--color-btn-primary-text"] =
        themeSettings.colors.lightMode.buttons.primary.text;
    }

    // Button colors - Secondary
    if (themeSettings?.colors?.lightMode?.buttons?.secondary?.background) {
      styles["--color-btn-secondary-bg"] =
        themeSettings.colors.lightMode.buttons.secondary.background;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.secondary?.hover) {
      styles["--color-btn-secondary-hover"] =
        themeSettings.colors.lightMode.buttons.secondary.hover;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.secondary?.text) {
      styles["--color-btn-secondary-text"] =
        themeSettings.colors.lightMode.buttons.secondary.text;
    }

    // Button colors - Tertiary
    if (themeSettings?.colors?.lightMode?.buttons?.tertiary?.background) {
      styles["--color-btn-tertiary-bg"] =
        themeSettings.colors.lightMode.buttons.tertiary.background;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.tertiary?.hover) {
      styles["--color-btn-tertiary-hover"] =
        themeSettings.colors.lightMode.buttons.tertiary.hover;
    }

    if (themeSettings?.colors?.lightMode?.buttons?.tertiary?.text) {
      styles["--color-btn-tertiary-text"] =
        themeSettings.colors.lightMode.buttons.tertiary.text;
    }

    // Text colors
    if (themeSettings?.colors?.lightMode?.text?.primary) {
      styles["--color-text-primary"] =
        themeSettings.colors.lightMode.text.primary;
    }

    if (themeSettings?.colors?.lightMode?.text?.secondary) {
      styles["--color-text-secondary"] =
        themeSettings.colors.lightMode.text.secondary;
    }

    if (themeSettings?.colors?.lightMode?.text?.inverted) {
      styles["--color-text-inverted"] =
        themeSettings.colors.lightMode.text.inverted;
    }

    // Border radius
    if (themeSettings?.borderRadius?.none) {
      styles["--radius-none"] = themeSettings.borderRadius.none;
    }

    if (themeSettings?.borderRadius?.small) {
      styles["--radius-small"] = themeSettings.borderRadius.small;
    }

    if (themeSettings?.borderRadius?.medium) {
      styles["--radius-medium"] = themeSettings.borderRadius.medium;
    }

    if (themeSettings?.borderRadius?.large) {
      styles["--radius-large"] = themeSettings.borderRadius.large;
    }

    return styles as React.CSSProperties;
  };

  // Pass the theme data to the client component
  return (
    <div className="store-theme" style={generateThemeStyles()}>
      <ReduxStoreProvider>
        <ClientSections
          sections={homePage.body}
          themePath={selectedTheme.locPath}
          themeColors={themeSettings?.colors}
        />
      </ReduxStoreProvider>
    </div>
  );
}
