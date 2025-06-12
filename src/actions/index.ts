"use server";

import { Theme } from "@/types/theme";

let dbTheme: Theme | null = null;
let dbThemeSettings: any = null;

export async function getTheme(themeId?: string, theme?: Theme) {
  // TODO: API call to get theme by ID
  if (theme) {
    // Save the entire theme including settings
    dbTheme = {
      ...theme,
      themeSettings: dbThemeSettings || theme.themeSettings,
    };
  }

  const savedTheme: Theme | null = dbTheme || {
    id: "43bc1e99-89c8-4393-9ad9-01f789c3e786",
    name: "Minimal Theme",
    img: "/themes/minimal-theme.png",
    locPath: "minimal-theme/sections",
    themeSettings: dbThemeSettings,
    pages: [
      {
        name: "Home Page",
        sections: [
          "Hero",
          "About",
          "FeaturedCollections",
          "ImageWithText",
          "BestSellers",
          "NewsletterSignup",
          "Footer",
        ],
        initialValues: [],
        body: [],
      },
      {
        name: "Product Page",
        sections: ["SingleProduct"],
        initialValues: [],
        body: [],
      },
    ],
  };

  return savedTheme;
}

export async function saveThemeSettings(settings: any) {
  // In a real app, this would be saved to a database
  dbThemeSettings = settings;
  return { success: true };
}
