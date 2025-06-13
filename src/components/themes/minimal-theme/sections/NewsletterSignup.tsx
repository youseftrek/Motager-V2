"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { extractThemeColors } from "../theme-utils";
import { ThemedButton, ThemedHeading, ThemedText } from "../theme-components";

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Title",
      default: "Subscribe to Our Newsletter",
    },
    description: {
      type: "text" as const,
      label: "Description",
      default: "Stay updated with our latest offers and news.",
    },
    buttonText: {
      type: "text" as const,
      label: "Button Text",
      default: "Subscribe",
    },
    backgroundColor: {
      type: "color" as const,
      label: "Background Color",
      default: "#dfffeb",
    },
  },
};

type NewsletterProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundColor?: string;
  themeColors?: any;
};

export default function NewsletterSection({
  title = "Subscribe to Our Newsletter",
  description = "Stay updated with our latest offers and news.",
  buttonText = "Subscribe",
  backgroundColor = "#dfffeb",
  themeColors,
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  // Extract theme colors
  const colors = extractThemeColors(themeColors);

  return (
    <div className="p-6 rounded-lg text-center" style={{ backgroundColor }}>
      <ThemedHeading
        level={2}
        className="mb-2 font-bold text-2xl"
        colors={colors}
      >
        {title}
      </ThemedHeading>

      <ThemedText variant="secondary" className="mb-4" colors={colors}>
        {description}
      </ThemedText>

      <div className="flex justify-center items-center gap-2 mx-auto max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <ThemedButton
          variant="primary"
          size="sm"
          onClick={handleSubscribe}
          colors={colors}
        >
          {buttonText}
        </ThemedButton>
      </div>
    </div>
  );
}
