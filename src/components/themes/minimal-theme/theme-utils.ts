import { MINIMAL_THEME_SETTINGS } from "./settings";

/**
 * Extracts theme colors from the provided theme settings or uses defaults
 */
export function extractThemeColors(themeColors?: any) {
  const colors = themeColors || MINIMAL_THEME_SETTINGS.colors;

  return {
    main: colors.main || "#6F4E37",
    text: {
      primary: colors.lightMode?.text?.primary || "#6F4E37",
      secondary: colors.lightMode?.text?.secondary || "#5C4033",
      inverted: colors.lightMode?.text?.inverted || "#fafafa",
    },
    background: {
      primary: colors.lightMode?.background?.primary || "#fafafa",
      secondary: colors.lightMode?.background?.secondary || "#e0e0e0",
    },
    buttons: {
      primary: {
        background: colors.lightMode?.buttons?.primary?.background || "#6F4E37",
        text: colors.lightMode?.buttons?.primary?.text || "#fafafa",
        hover: colors.lightMode?.buttons?.primary?.hover || "#5C4033",
      },
      secondary: {
        background:
          colors.lightMode?.buttons?.secondary?.background || "#D2B48C",
        text: colors.lightMode?.buttons?.secondary?.text || "#6F4E37",
        hover: colors.lightMode?.buttons?.secondary?.hover || "#C4A484",
      },
      tertiary: {
        background:
          colors.lightMode?.buttons?.tertiary?.background || "#fafafa",
        text: colors.lightMode?.buttons?.tertiary?.text || "#6F4E37",
        hover: colors.lightMode?.buttons?.tertiary?.hover || "#d4d4d4",
      },
    },
  };
}

/**
 * Type definition for theme colors
 */
export type ThemeColors = ReturnType<typeof extractThemeColors>;
