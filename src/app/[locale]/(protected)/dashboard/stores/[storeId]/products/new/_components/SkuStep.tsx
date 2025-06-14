"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useProductForm, VariantCombination } from "@/providers/product-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function SkusStep() {
  const { formData, updateVariantCombination } = useProductForm();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const t = useTranslations("ProductsPage.skuManagement");

  const handleToggleAccordion = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (
    id: string,
    field: keyof VariantCombination,
    value: string
  ) => {
    const numValue = Number.parseFloat(value) || 0;

    if (field === "price" || field === "cost_per_item") {
      // These fields will trigger profit and margin recalculation in the context
      updateVariantCombination(id, { [field]: numValue });
    } else {
      updateVariantCombination(id, { [field]: numValue });
    }
  };

  // Helper function to determine if a value is a hex color
  const isHexColor = (value: string) => {
    return /^#[0-9A-F]{6}$/i.test(value);
  };

  // Helper function to check if a color is light or dark
  const isLightColor = (color: string): boolean => {
    // Convert hex to RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Calculate perceived brightness using YIQ formula
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128; // Returns true if color is light
  };

  // If product doesn't have variants, show a simple form for a single SKU
  if (!formData.has_variants) {
    const singleSku = formData.variant_combinations.find(
      (vc) => vc.id === "single"
    ) || {
      id: "single",
      combination: {},
      stock: 0,
      price: formData.startPrice,
      compare_at_price: 0,
      cost_per_item: 0,
      profit: 0,
      margin: 0,
    };

    // If the single SKU doesn't exist in the variant_combinations array, add it
    if (!formData.variant_combinations.some((vc) => vc.id === "single")) {
      updateVariantCombination("single", singleSku);
    }

    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl">{t("title")}</h2>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={singleSku.stock || ""}
              onChange={(e) =>
                updateVariantCombination(singleSku.id, {
                  stock: Number.parseInt(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={singleSku.price || ""}
              onChange={(e) =>
                handleInputChange(singleSku.id, "price", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compare_price">Compare At Price ($)</Label>
            <Input
              id="compare_price"
              type="number"
              step="0.01"
              value={singleSku.compare_at_price || ""}
              onChange={(e) =>
                handleInputChange(
                  singleSku.id,
                  "compare_at_price",
                  e.target.value
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">{t("costPerItem")}</Label>
            <Input
              id="cost"
              type="number"
              step="0.01"
              value={singleSku.cost_per_item || ""}
              onChange={(e) =>
                handleInputChange(singleSku.id, "cost_per_item", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profit">{t("profit")}</Label>
            <Input
              id="profit"
              type="number"
              step="0.01"
              value={singleSku.profit.toFixed(2)}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="margin">{t("margin")}</Label>
            <Input
              id="margin"
              type="number"
              step="0.01"
              value={singleSku.margin.toFixed(2)}
              disabled
            />
          </div>
        </div>
      </div>
    );
  }

  // If no variant combinations have been generated yet
  if (formData.variant_combinations.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="font-bold text-2xl">{t("title")}</h2>
        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-muted-foreground">{t("noVariants")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-2xl">{t("title")}</h2>
      <p className="text-muted-foreground">
        Click on a variant combination to add pricing and inventory details.
      </p>

      <Accordion type="multiple" value={expandedItems} className="space-y-2">
        {formData.variant_combinations.map((combination) => (
          <AccordionItem
            key={combination.id}
            value={combination.id}
            className="border rounded-lg"
          >
            <AccordionTrigger
              onClick={() => handleToggleAccordion(combination.id)}
              className="px-4 hover:no-underline"
            >
              <div className="flex flex-wrap items-center gap-2 text-left">
                {Object.entries(combination.combination).map(
                  ([name, value]) => {
                    // Check if this is a color variant and the value is a hex color
                    const isColorValue =
                      name.toLowerCase() === "color" && isHexColor(value);

                    return (
                      <Badge
                        key={name}
                        variant="outline"
                        className={`px-2 py-1 flex items-center gap-1.5`}
                        style={
                          isColorValue
                            ? {
                                backgroundColor: value,
                                color: isLightColor(value) ? "#000" : "#fff",
                                border: isLightColor(value)
                                  ? "1px solid #00000022"
                                  : "none",
                              }
                            : {}
                        }
                      >
                        {/* Show color swatch for color variants */}
                        {isColorValue && (
                          <span
                            className="inline-block border border-white/40 rounded-full w-3 h-3"
                            style={{ backgroundColor: value }}
                          />
                        )}
                        {name}: {value}
                      </Badge>
                    );
                  }
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-2">
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-stock`}>Stock</Label>
                  <Input
                    id={`${combination.id}-stock`}
                    type="number"
                    value={combination.stock || ""}
                    onChange={(e) =>
                      handleInputChange(combination.id, "stock", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-price`}>Price ($)</Label>
                  <Input
                    id={`${combination.id}-price`}
                    type="number"
                    step="0.01"
                    value={combination.price || ""}
                    onChange={(e) =>
                      handleInputChange(combination.id, "price", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-compare-price`}>
                    Compare At Price ($)
                  </Label>
                  <Input
                    id={`${combination.id}-compare-price`}
                    type="number"
                    step="0.01"
                    value={combination.compare_at_price || ""}
                    onChange={(e) =>
                      handleInputChange(
                        combination.id,
                        "compare_at_price",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-cost`}>
                    {t("costPerItem")}
                  </Label>
                  <Input
                    id={`${combination.id}-cost`}
                    type="number"
                    step="0.01"
                    value={combination.cost_per_item || ""}
                    onChange={(e) =>
                      handleInputChange(
                        combination.id,
                        "cost_per_item",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-profit`}>
                    {t("profit")}
                  </Label>
                  <Input
                    id={`${combination.id}-profit`}
                    type="number"
                    step="0.01"
                    value={combination.profit.toFixed(2)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${combination.id}-margin`}>
                    {t("margin")}
                  </Label>
                  <Input
                    id={`${combination.id}-margin`}
                    type="number"
                    step="0.01"
                    value={combination.margin.toFixed(2)}
                    disabled
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
