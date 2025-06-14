"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { extractThemeColors } from "@/components/themes/minimal-theme/theme-utils";
import CartSheet from "./CartSheet";

// Default theme colors to use if theme data isn't available
const defaultColors = {
  main: "#0070f3",
  text: { primary: "#333", secondary: "#666", inverted: "#fff" },
  background: { primary: "#fff", secondary: "#f5f5f5" },
  buttons: {
    primary: { background: "#0070f3", hover: "#0060df", text: "#fff" },
    secondary: { background: "#f5f5f5", hover: "#e5e5e5", text: "#333" },
    tertiary: {
      background: "transparent",
      hover: "rgba(0,0,0,0.05)",
      text: "#0070f3",
    },
  },
};

interface ShopHeaderProps {
  themeColors: any;
}

export default function ShopHeader({ themeColors }: ShopHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { shopSlug } = useParams();

  // Extract theme colors, fallback to defaults if not available
  const colors = themeColors ? extractThemeColors(themeColors) : defaultColors;

  const navItems = [
    { name: "Home", href: `/shop/${shopSlug}` },
    { name: "Products", href: `/shop/${shopSlug}/products` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/shop/${shopSlug}`}
            className="flex items-center font-bold text-xl"
            style={{ color: colors.text.primary }}
          >
            {shopSlug}
            <span
              className="text-primary ml-1"
              style={{ color: colors.buttons.primary.background }}
            >
              Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: colors.text.secondary }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Sheet */}
            <CartSheet themeColors={themeColors} />

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center rounded-full w-8 h-8 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                color: colors.text.secondary,
                backgroundColor: colors.background.secondary,
              }}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:opacity-80 px-2 py-1"
                  style={{ color: colors.text.secondary }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
