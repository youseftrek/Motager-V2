import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export type FooterProps = {
  companyName: string;
  description?: string;
  logoUrl?: string;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  copyrightText?: string;
};

export type FooterColumn = {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
};

export type SocialLink = {
  platform: string;
  url: string;
  icon?: string;
};

export const config = {
  inputs: {
    companyName: {
      type: "text" as const,
      label: "Company Name",
      placeholder: "Your Company",
    },
    description: {
      type: "textarea" as const,
      label: "Description",
      placeholder: "Short description about your company",
    },
    logoUrl: {
      type: "text" as const,
      label: "Logo URL",
      placeholder: "/logo.svg",
    },
    showNewsletter: {
      type: "boolean" as const,
      label: "Show Newsletter",
      default: true,
    },
    newsletterTitle: {
      type: "text" as const,
      label: "Newsletter Title",
      placeholder: "Subscribe to our newsletter",
    },
    newsletterPlaceholder: {
      type: "text" as const,
      label: "Newsletter Input Placeholder",
      placeholder: "Enter your email",
    },
    newsletterButtonText: {
      type: "text" as const,
      label: "Newsletter Button Text",
      placeholder: "Subscribe",
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#001a0a",
    },
    textColor: {
      type: "color" as const,
      label: "Text Color",
      default: "#f9fafb",
    },
    copyrightText: {
      type: "text" as const,
      label: "Copyright Text",
      placeholder: "© 2025 Your Company. All rights reserved.",
    },
    // For advanced usage, these would be configurable through a more complex UI
    columns: {
      type: "array" as const,
      label: "Footer Columns",
    },
    socialLinks: {
      type: "array" as const,
      label: "Social Links",
    },
  },
};

// Default column and social data
const defaultColumns = [
  {
    title: "Company",
    links: [
      { text: "About", url: "/about" },
      { text: "Careers", url: "/careers" },
      { text: "Press", url: "/press" },
      { text: "Blog", url: "/blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Guide", url: "/guide" },
      { text: "Documentation", url: "/docs" },
      { text: "Help Center", url: "/help" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms", url: "/terms" },
      { text: "Privacy", url: "/privacy" },
      { text: "Cookies", url: "/cookies" },
    ],
  },
];

const defaultSocialLinks = [
  { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
  { platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { platform: "Facebook", url: "https://facebook.com", icon: "facebook" },
];

export default function Footer({
  companyName = "Your Company",
  description = "We're on a mission to build the best products and help businesses grow exponentially.",
  logoUrl = "/logo.svg",
  showNewsletter = true,
  newsletterTitle = "Subscribe to our newsletter",
  newsletterPlaceholder = "Enter your email",
  newsletterButtonText = "Subscribe",
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  backgroundColor = "#001a0a",
  textColor = "#f9fafb",
  copyrightText = "© 2025 Your Company. All rights reserved.",
}: FooterProps) {
  // SVG icons for social media
  const getSocialIcon = (platform: string) => {
    const color = textColor;
    switch (platform.toLowerCase()) {
      case "twitter":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
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

  return (
    <footer
      style={{ backgroundColor, color: textColor }}
      className="pt-12 pb-8"
    >
      <div className="mx-auto px-4 md:px-6 container">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 mb-12">
          {/* Company Info Section */}
          <div className="flex flex-col space-y-4 lg:col-span-4">
            {logoUrl && (
              <div className="mb-2">
                <Image
                  src={logoUrl}
                  width={10}
                  height={10}
                  alt={companyName}
                  className="h-10"
                />
              </div>
            )}
            <h3 className="font-bold text-xl">{companyName}</h3>
            <p className="opacity-80 max-w-md">{description}</p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-white hover:bg-opacity-10 p-2 rounded-full transition-colors"
                  aria-label={`${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          <div className="gap-8 grid grid-cols-2 sm:grid-cols-3 lg:col-span-4">
            {columns.map((column, idx) => (
              <div key={idx}>
                <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="opacity-70 hover:opacity-100 text-sm transition-opacity"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          {showNewsletter && (
            <div className="lg:col-span-4">
              <h4 className="mb-4 font-semibold text-lg">{newsletterTitle}</h4>
              <p className="opacity-80 mb-4">
                Get the latest news and updates directly to your inbox.
              </p>
              <div className="flex sm:flex-row flex-col gap-2">
                <Input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button size="sm" className="text-white">
                  {newsletterButtonText}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex md:flex-row flex-col justify-between items-center mt-8 pt-8 border-white/10 border-t">
          <p className="opacity-70 text-sm">{copyrightText}</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/terms"
                  className="opacity-70 hover:opacity-100 text-sm transition-opacity"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="opacity-70 hover:opacity-100 text-sm transition-opacity"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="opacity-70 hover:opacity-100 text-sm transition-opacity"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
