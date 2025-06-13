"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";
import { useDeviceView } from "@/providers/device-view-context";
import { useResponsiveClasses } from "@/hooks/use-responsive-classes";

export type FooterLink = {
  text: string;
  url: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  platform: string;
  url: string;
  icon?: string;
};

export type FooterProps = {
  // Branding
  companyName?: string;
  logoUrl?: string;
  description?: string;

  // Newsletter
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;

  // Links
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  legalLinks?: FooterLink[];

  // Style
  style?: "light" | "dark" | "primary" | "gradient";
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  showWave?: boolean;

  // Legal
  copyrightText?: string;

  // Theme colors
  themeColors?: any;
};

// Default footer columns
const defaultColumns = [
  {
    title: "Product",
    links: [
      { text: "Features", url: "/features" },
      { text: "Pricing", url: "/pricing" },
      { text: "Documentation", url: "/docs" },
      { text: "Resources", url: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", url: "/about" },
      { text: "Blog", url: "/blog" },
      { text: "Careers", url: "/careers" },
      { text: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { text: "Help Center", url: "/help" },
      { text: "Community", url: "/community" },
      { text: "Status", url: "/status" },
    ],
  },
];

// Default social links
const defaultSocialLinks = [
  { platform: "Twitter", url: "https://twitter.com" },
  { platform: "LinkedIn", url: "https://linkedin.com" },
  { platform: "GitHub", url: "https://github.com" },
  { platform: "Instagram", url: "https://instagram.com" },
];

// Default legal links
const defaultLegalLinks = [
  { text: "Privacy Policy", url: "/privacy" },
  { text: "Terms of Service", url: "/terms" },
  { text: "Cookie Policy", url: "/cookies" },
];

export const config = {
  inputs: {
    companyName: {
      type: "text" as const,
      label: "Company Name",
      default: "Your Company",
    },
    logoUrl: {
      type: "image" as const,
      label: "Logo",
      default: "",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      default:
        "We're building the future of digital experiences with innovative solutions that empower businesses worldwide.",
    },
    showNewsletter: {
      type: "boolean" as const,
      label: "Show Newsletter",
      default: true,
    },
    newsletterTitle: {
      type: "text" as const,
      label: "Newsletter Title",
      default: "Stay Updated",
    },
    newsletterDescription: {
      type: "text" as const,
      label: "Newsletter Description",
      default:
        "Subscribe to our newsletter for the latest updates, news, and offers.",
    },
    newsletterPlaceholder: {
      type: "text" as const,
      label: "Email Placeholder",
      default: "Enter your email",
    },
    newsletterButtonText: {
      type: "text" as const,
      label: "Button Text",
      default: "Subscribe",
    },
    columns: {
      type: "array" as const,
      label: "Footer Columns",
      itemLabel: "Column",
      default: defaultColumns,
      itemType: {
        type: "object" as const,
        fields: {
          title: {
            type: "text" as const,
            label: "Column Title",
          },
          links: {
            type: "array" as const,
            label: "Links",
            itemLabel: "Link",
            itemType: {
              type: "object" as const,
              fields: {
                text: {
                  type: "text" as const,
                  label: "Link Text",
                },
                url: {
                  type: "text" as const,
                  label: "URL",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: {
      type: "array" as const,
      label: "Social Links",
      itemLabel: "Social Link",
      default: defaultSocialLinks,
      itemType: {
        type: "object" as const,
        fields: {
          platform: {
            type: "select" as const,
            label: "Platform",
            options: [
              { value: "Twitter", label: "Twitter" },
              { value: "Facebook", label: "Facebook" },
              { value: "Instagram", label: "Instagram" },
              { value: "LinkedIn", label: "LinkedIn" },
              { value: "GitHub", label: "GitHub" },
              { value: "YouTube", label: "YouTube" },
              { value: "Discord", label: "Discord" },
              { value: "TikTok", label: "TikTok" },
              { value: "Other", label: "Other" },
            ],
          },
          url: {
            type: "text" as const,
            label: "URL",
          },
          icon: {
            type: "text" as const,
            label: "Custom Icon (optional)",
          },
        },
      },
    },
    legalLinks: {
      type: "array" as const,
      label: "Legal Links",
      itemLabel: "Link",
      default: defaultLegalLinks,
      itemType: {
        type: "object" as const,
        fields: {
          text: {
            type: "text" as const,
            label: "Link Text",
          },
          url: {
            type: "text" as const,
            label: "URL",
          },
        },
      },
    },
    style: {
      type: "select" as const,
      label: "Style",
      default: "dark",
      options: [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
        { value: "primary", label: "Primary" },
        { value: "gradient", label: "Gradient" },
      ],
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#0f172a",
    },
    textColor: {
      type: "color" as const,
      label: "Text Color",
      default: "#f8fafc",
    },
    accentColor: {
      type: "color" as const,
      label: "Accent Color",
      default: "#3b82f6",
    },
    showWave: {
      type: "boolean" as const,
      label: "Show Wave Divider",
      default: true,
    },
    copyrightText: {
      type: "text" as const,
      label: "Copyright Text",
      default: "© 2024 Your Company. All rights reserved.",
    },
  },
};

export default function Footer({
  // Branding
  companyName = "Your Company",
  logoUrl,
  description = "We're building the future of digital experiences with innovative solutions that empower businesses worldwide.",

  // Newsletter
  showNewsletter = true,
  newsletterTitle = "Stay Updated",
  newsletterDescription = "Subscribe to our newsletter for the latest updates, news, and offers.",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Subscribe",

  // Links
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,

  // Style
  style = "dark",
  backgroundColor,
  textColor,
  accentColor,
  showWave = true,

  // Legal
  copyrightText = "© 2024 Your Company. All rights reserved.",

  // Theme colors
  themeColors,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const deviceView = useDeviceView();

  // State for responsive content
  const [visibleColumns, setVisibleColumns] = useState<FooterColumn[]>(columns);
  const [visibleSocialLinks, setVisibleSocialLinks] =
    useState<SocialLink[]>(socialLinks);
  const [currentLayout, setCurrentLayout] = useState<"stacked" | "grid">(
    "grid"
  );

  // Enhanced responsive classes with device-specific sizing
  const containerPaddingClass = useResponsiveClasses(
    {
      mobile: "px-4 py-12",
      tablet: "px-6 py-14",
      desktop: "px-4 py-16",
    },
    "px-4 py-12 md:px-6 md:py-14 lg:px-4 lg:py-16"
  );

  // Wave spacing - add more space below the wave
  const waveSpacingClass = useResponsiveClasses(
    {
      mobile: "pt-20",
      tablet: "pt-24",
      desktop: "pt-28",
    },
    "pt-20 md:pt-24 lg:pt-28"
  );

  const textSizeClass = useResponsiveClasses(
    {
      mobile: "text-sm",
      tablet: "text-base",
      desktop: "text-base",
    },
    "text-sm md:text-base"
  );

  const headingSizeClass = useResponsiveClasses(
    {
      mobile: "text-xs",
      tablet: "text-sm",
      desktop: "text-sm",
    },
    "text-xs md:text-sm"
  );

  const companyNameSizeClass = useResponsiveClasses(
    {
      mobile: "text-lg",
      tablet: "text-xl",
      desktop: "text-xl",
    },
    "text-lg md:text-xl"
  );

  const logoSizeClass = useResponsiveClasses(
    {
      mobile: "h-8 w-8",
      tablet: "h-10 w-10",
      desktop: "h-10 w-10",
    },
    "h-8 w-8 md:h-10 md:w-10"
  );

  const socialIconSizeClass = useResponsiveClasses(
    {
      mobile: "w-8 h-8",
      tablet: "w-9 h-9",
      desktop: "w-9 h-9",
    },
    "w-8 h-8 md:w-9 md:h-9"
  );

  const gapClass = useResponsiveClasses(
    {
      mobile: "gap-6",
      tablet: "gap-8",
      desktop: "gap-8",
    },
    "gap-6 md:gap-8"
  );

  // Responsive layout management
  useEffect(() => {
    if (deviceView?.isPreviewMode) {
      const activeDevice = deviceView.activeDevice;

      switch (activeDevice) {
        case "mobile":
          setCurrentLayout("stacked");
          setVisibleColumns(columns.slice(0, 2));
          setVisibleSocialLinks(socialLinks.slice(0, 4));
          break;

        case "tablet":
          setCurrentLayout("grid");
          setVisibleColumns(columns.slice(0, 3));
          setVisibleSocialLinks(socialLinks);
          break;

        case "desktop":
        default:
          setCurrentLayout("grid");
          setVisibleColumns(columns);
          setVisibleSocialLinks(socialLinks);
          break;
      }
    } else {
      setCurrentLayout("grid");
      setVisibleColumns(columns);
      setVisibleSocialLinks(socialLinks);
    }
  }, [
    deviceView?.activeDevice,
    deviceView?.isPreviewMode,
    columns,
    socialLinks,
  ]);

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  // Get style based on selected theme
  const getFooterStyles = () => {
    const styleMap = {
      light: {
        background: backgroundColor || colors.background.primary,
        text: textColor || colors.text.primary,
        secondaryText: colors.text.secondary,
        border: colors.text.secondary + "20",
        accent: accentColor || colors.buttons.primary.background,
        wave: accentColor || colors.buttons.primary.background,
      },
      dark: {
        background: backgroundColor || "#0f172a",
        text: textColor || "#f8fafc",
        secondaryText: "#cbd5e1",
        border: "#334155",
        accent: accentColor || colors.buttons.primary.background,
        wave: accentColor || colors.buttons.primary.background,
      },
      primary: {
        background: backgroundColor || colors.buttons.primary.background,
        text: textColor || colors.buttons.primary.text,
        secondaryText: colors.buttons.primary.text + "99",
        border: colors.buttons.primary.text + "20",
        accent: accentColor || colors.main,
        wave: "#ffffff",
      },
      gradient: {
        background:
          backgroundColor ||
          `linear-gradient(135deg, ${colors.buttons.primary.background} 0%, ${colors.main} 100%)`,
        text: textColor || "#ffffff",
        secondaryText: "#ffffffcc",
        border: "#ffffff20",
        accent: accentColor || "#ffffff",
        wave: "#ffffff",
      },
    };

    return styleMap[style] || styleMap.dark;
  };

  const styles = getFooterStyles();

  // Device-aware column grid class
  const getColumnGridClass = () => {
    if (deviceView?.isPreviewMode) {
      switch (deviceView.activeDevice) {
        case "mobile":
          return "grid-cols-1";
        case "tablet":
          return "grid-cols-2";
        case "desktop":
          return "grid-cols-3";
        default:
          return "grid-cols-3";
      }
    }
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  };

  // Device-aware main grid class
  const getMainGridClass = () => {
    if (currentLayout === "stacked") {
      return "grid grid-cols-1 gap-8";
    }

    if (deviceView?.isPreviewMode) {
      switch (deviceView.activeDevice) {
        case "mobile":
          return "grid grid-cols-1 gap-6";
        case "tablet":
          return "grid grid-cols-1 md:grid-cols-2 gap-8";
        case "desktop":
          return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8";
        default:
          return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8";
      }
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8";
  };

  // Device-aware company section span
  const getCompanySectionSpan = () => {
    if (currentLayout === "stacked") return "";
    if (deviceView?.isPreviewMode && deviceView.activeDevice === "desktop") {
      return "lg:col-span-4";
    }
    return "lg:col-span-4";
  };

  // Device-aware links section span
  const getLinksSectionSpan = () => {
    if (currentLayout === "stacked") return "";
    if (deviceView?.isPreviewMode && deviceView.activeDevice === "desktop") {
      return showNewsletter ? "lg:col-span-5" : "lg:col-span-8";
    }
    return showNewsletter ? "lg:col-span-5" : "lg:col-span-8";
  };

  // Device-aware newsletter section span
  const getNewsletterSectionSpan = () => {
    if (currentLayout === "stacked") return "";
    if (deviceView?.isPreviewMode && deviceView.activeDevice === "desktop") {
      return "lg:col-span-3";
    }
    return "lg:col-span-3";
  };

  // Device-aware bottom bar layout
  const getBottomBarClass = () => {
    if (deviceView?.isPreviewMode && deviceView.activeDevice === "mobile") {
      return "flex flex-col justify-center items-center text-center gap-4";
    }
    return "flex flex-col md:flex-row justify-between items-center gap-4";
  };

  // Handle newsletter submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  // Social media icon component with responsive sizing
  const SocialIcon = ({ platform }: { platform: string }) => {
    const iconSize =
      deviceView?.isPreviewMode && deviceView.activeDevice === "mobile"
        ? 18
        : 20;
    const iconColor = styles.text;

    const renderIcon = () => {
      switch (platform.toLowerCase()) {
        case "twitter":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          );
        case "facebook":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          );
        case "instagram":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          );
        case "linkedin":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          );
        case "github":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          );
        case "youtube":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          );
        case "discord":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 9a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v7a5 5 0 0 0 5 5h4" />
              <circle cx="15" cy="12" r="1" />
              <circle cx="9" cy="12" r="1" />
              <path d="M9 15c.83 1.2 2.24 2 4 2 1.76 0 3.17-.8 4-2" />
              <path d="M19 15v6" />
              <path d="M22 18h-6" />
            </svg>
          );
        case "tiktok":
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
              <path d="M20 9V4a1 1 0 0 0-1-1h-1" />
              <path d="M15 5.34V4a1 1 0 0 0-1-1h-3" />
              <path d="M9 5.34V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3" />
              <path d="M12 16v-3a1 1 0 0 1 1-1h1" />
              <path d="M20 16v-7a1 1 0 0 0-1-1h-1" />
              <path d="M15 12v-2a1 1 0 0 1 1-1h1" />
            </svg>
          );
        default:
          return (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke={iconColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          );
      }
    };

    return renderIcon();
  };

  // Fixed Wave SVG divider - no background, proper spacing
  const WaveDivider = () => {
    const waveHeight =
      deviceView?.isPreviewMode && deviceView.activeDevice === "mobile"
        ? "50px"
        : "80px";

    return (
      <div
        className="absolute top-0 left-0 w-full overflow-hidden transform rotate-180"
        style={{ height: waveHeight }}
      >
        <svg
          className="relative block w-full h-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill={styles.wave}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill={styles.wave}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill={styles.wave}
          ></path>
        </svg>
      </div>
    );
  };

  return (
    <footer
      className="relative"
      style={{
        background:
          typeof styles.background === "string" ? styles.background : undefined,
        backgroundImage:
          typeof styles.background !== "string" ? styles.background : undefined,
      }}
    >
      {/* Wave Divider */}
      {showWave && <WaveDivider />}

      {/* Main content with proper spacing below wave */}
      <div
        className={cn(
          "container mx-auto relative",
          containerPaddingClass,
          showWave ? waveSpacingClass : ""
        )}
      >
        <div className={getMainGridClass()}>
          {/* Company Info */}
          <div className={cn("space-y-6", getCompanySectionSpan())}>
            <div className="flex items-center gap-3">
              {logoUrl && (
                <div className={cn("relative", logoSizeClass)}>
                  <Image
                    src={logoUrl}
                    alt={companyName}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              )}
              <ThemedHeading
                level={3}
                className={cn("font-bold", companyNameSizeClass)}
                colors={colors}
                style={{ color: styles.text }}
              >
                {companyName}
              </ThemedHeading>
            </div>

            <ThemedText
              variant="secondary"
              className={textSizeClass}
              colors={colors}
              style={{ color: styles.secondaryText }}
            >
              {description}
            </ThemedText>

            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {visibleSocialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center rounded-full border transition-all hover:scale-110",
                    socialIconSizeClass
                  )}
                  style={{ borderColor: styles.border }}
                  aria-label={social.platform}
                >
                  {social.icon ? (
                    <span className="text-lg">{social.icon}</span>
                  ) : (
                    <SocialIcon platform={social.platform} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Columns */}
          <div
            className={cn(
              "grid",
              getColumnGridClass(),
              gapClass,
              getLinksSectionSpan()
            )}
          >
            {visibleColumns.map((column, index) => (
              <div key={index} className="space-y-4">
                <ThemedHeading
                  level={4}
                  className={cn(
                    "font-semibold uppercase tracking-wider",
                    headingSizeClass
                  )}
                  colors={colors}
                  style={{ color: styles.text }}
                >
                  {column.title}
                </ThemedHeading>
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.url}
                        className="hover:translate-x-1 transition-transform inline-block"
                      >
                        <ThemedText
                          variant="secondary"
                          className={textSizeClass}
                          colors={colors}
                          style={{ color: styles.secondaryText }}
                        >
                          {link.text}
                        </ThemedText>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div className={cn("space-y-4", getNewsletterSectionSpan())}>
              <ThemedHeading
                level={4}
                className={cn(
                  "font-semibold uppercase tracking-wider",
                  headingSizeClass
                )}
                colors={colors}
                style={{ color: styles.text }}
              >
                {newsletterTitle}
              </ThemedHeading>
              <ThemedText
                variant="secondary"
                className={textSizeClass}
                colors={colors}
                style={{ color: styles.secondaryText }}
              >
                {newsletterDescription}
              </ThemedText>
              <form onSubmit={handleSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 transition-colors",
                    deviceView?.isPreviewMode &&
                      deviceView.activeDevice === "mobile"
                      ? "text-sm"
                      : "text-sm"
                  )}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: styles.border,
                    color: styles.text,
                  }}
                />
                <ThemedButton
                  type="submit"
                  variant={style === "light" ? "primary" : "tertiary"}
                  size={
                    deviceView?.isPreviewMode &&
                    deviceView.activeDevice === "mobile"
                      ? "sm"
                      : "sm"
                  }
                  className="w-full"
                  colors={colors}
                >
                  {newsletterButtonText}
                </ThemedButton>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div
          className={cn(
            "mt-16 pt-8",
            deviceView?.isPreviewMode && deviceView.activeDevice === "mobile"
              ? "mt-12 pt-6"
              : "",
            getBottomBarClass()
          )}
          style={{ borderTop: `1px solid ${styles.border}` }}
        >
          <ThemedText
            variant="secondary"
            className={textSizeClass}
            colors={colors}
            style={{ color: styles.secondaryText }}
          >
            {copyrightText.replace("Your Company", companyName)}
          </ThemedText>

          <div
            className={cn(
              "flex gap-6",
              deviceView?.isPreviewMode && deviceView.activeDevice === "mobile"
                ? "flex-col items-center gap-3"
                : "flex-wrap justify-center"
            )}
          >
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.url} className="hover:underline">
                <ThemedText
                  variant="secondary"
                  className={textSizeClass}
                  colors={colors}
                  style={{ color: styles.secondaryText }}
                >
                  {link.text}
                </ThemedText>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
