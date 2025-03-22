import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
};

export default function NewsletterSection({
  title = "Subscribe to Our Newsletter",
  description = "Stay updated with our latest offers and news.",
  buttonText = "Subscribe",
  backgroundColor = "#dfffeb",
}: NewsletterProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div className="p-6 rounded-lg text-center" style={{ backgroundColor }}>
      <h2 className="mb-2 font-bold text-2xl">{title}</h2>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="flex justify-center items-center gap-2 mx-auto max-w-md">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSubscribe} size="sm">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
