"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";

interface EmptyProductsViewProps {
  colors: any;
  resetFilters: () => void;
}

export default function EmptyProductsView({
  colors,
  resetFilters,
}: EmptyProductsViewProps) {
  return (
    <Card
      style={{
        backgroundColor: colors.background.primary,
        borderColor: colors.background.secondary,
      }}
    >
      <CardContent className="flex flex-col items-center justify-center py-16">
        <Filter
          size={64}
          className="mb-4"
          style={{ color: colors.text.secondary, opacity: 0.3 }}
        />
        <h3
          className="text-xl font-semibold mb-2"
          style={{ color: colors.text.primary }}
        >
          No products found
        </h3>
        <p
          className="mb-6 text-center"
          style={{ color: colors.text.secondary }}
        >
          Try adjusting your filters or search terms
        </p>
        <Button
          onClick={resetFilters}
          style={{
            backgroundColor: colors.buttons.primary.background,
            color: colors.buttons.primary.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              colors.buttons.primary.hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor =
              colors.buttons.primary.background;
          }}
        >
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
