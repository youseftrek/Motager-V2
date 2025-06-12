import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeColors } from "./theme-utils";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export type ThemedButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  className?: string;
  colors: ThemeColors;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

/**
 * Themed button component that applies theme colors
 */
export function ThemedButton({
  variant = "primary",
  href,
  className,
  colors,
  children,
  size = "default",
  type = "button",
  disabled = false,
  onClick,
  target,
  rel,
  ariaLabel,
  ...props
}: ThemedButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: isHovered
            ? colors.buttons.primary.hover
            : colors.buttons.primary.background,
          color: colors.buttons.primary.text,
          transition: "background-color 0.2s ease",
        };
      case "secondary":
        return {
          backgroundColor: isHovered
            ? colors.buttons.secondary.hover
            : colors.buttons.secondary.background,
          color: colors.buttons.secondary.text,
          transition: "background-color 0.2s ease",
        };
      case "tertiary":
        return {
          backgroundColor: isHovered
            ? colors.buttons.tertiary.hover
            : colors.buttons.tertiary.background,
          color: colors.buttons.tertiary.text,
          borderColor: colors.buttons.tertiary.text,
          borderWidth: "1px",
          transition: "background-color 0.2s ease",
        };
      default:
        return {
          backgroundColor: isHovered
            ? colors.buttons.primary.hover
            : colors.buttons.primary.background,
          color: colors.buttons.primary.text,
          transition: "background-color 0.2s ease",
        };
    }
  };

  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-9 px-3 py-1 text-sm";
      case "lg":
        return "h-11 px-8 py-2 text-base";
      case "icon":
        return "h-10 w-10 p-2";
      default:
        return "h-10 px-4 py-2";
    }
  };

  const buttonClasses = cn(
    "inline-flex justify-center items-center gap-2 rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    getSizeClasses(),
    className
  );

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const buttonElement = (
    <button
      type={type}
      className={buttonClasses}
      style={getButtonStyle()}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );

  if (href) {
    // For links, create a wrapper that handles hover state
    return (
      <Link
        href={href}
        className="inline-block"
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Themed heading component
 */
export function ThemedHeading({
  level = 2,
  className,
  style,
  colors,
  children,
}: {
  level?: HeadingLevel;
  className?: string;
  style?: React.CSSProperties;
  colors: ThemeColors;
  children: React.ReactNode;
}) {
  const Component = React.createElement(`h${level}`, {
    className,
    style: { color: colors.text.primary, ...style },
    children,
  });

  return Component;
}

export type TextVariant = "primary" | "secondary" | "inverted";

/**
 * Themed text component
 */
export function ThemedText({
  variant = "primary",
  className,
  style,
  colors,
  children,
}: {
  variant?: TextVariant;
  className?: string;
  style?: React.CSSProperties;
  colors: ThemeColors;
  children: React.ReactNode;
}) {
  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return { color: colors.text.primary };
      case "secondary":
        return { color: colors.text.secondary };
      case "inverted":
        return { color: colors.text.inverted };
      default:
        return { color: colors.text.primary };
    }
  };

  return (
    <p className={className} style={{ ...getTextStyle(), ...style }}>
      {children}
    </p>
  );
}
