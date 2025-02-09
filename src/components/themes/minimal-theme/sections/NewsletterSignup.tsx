import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function NewsletterSignup() {
  return (
    <div className="bg-secondary/50 py-12 text-center">
      <h2 className="mb-4 font-bold text-2xl">Join Our Newsletter</h2>
      <p className="mb-8 text-muted-foreground">
        Get exclusive updates and offers.
      </p>
      <div className="flex justify-center gap-2">
        <Input placeholder="Enter your email" className="w-64" />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}
