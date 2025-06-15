"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useProductForm } from "@/providers/product-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function SkusStep() {
  const { formData, updateSku } = useProductForm();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const t = useTranslations("ProductsPage.skuManagement");

  const handleToggleAccordion = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const numValue = Number.parseFloat(value) || 0;
    updateSku(index, { [field]: numValue });
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
    const singleSku = formData.skus[0] || {
      stock: 0,
      price: formData.startPrice,
      compare_at_price: 0,
      cost_per_item: 0,
      profit: 0,
      margin: 0,
      variants: [],
    };

    // If the single SKU doesn't exist in the skus array, add it
    if (formData.skus.length === 0) {
      updateSku(0, singleSku);
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
                handleInputChange(0, "stock", e.target.value)
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
                handleInputChange(0, "price", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="compare_at_price">Compare at Price ($)</Label>
            <Input
              id="compare_at_price"
              type="number"
              step="0.01"
              value={singleSku.compare_at_price || ""}
              onChange={(e) =>
                handleInputChange(0, "compare_at_price", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost_per_item">Cost per Item ($)</Label>
            <Input
              id="cost_per_item"
              type="number"
              step="0.01"
              value={singleSku.cost_per_item || ""}
              onChange={(e) =>
                handleInputChange(0, "cost_per_item", e.target.value)
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

  // If no SKUs have been generated yet
  if (formData.skus.length === 0) {
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
        {formData.skus.map((sku, index) => (
          <AccordionItem
            key={index}
            value={index.toString()}
            className="border rounded-lg"
          >
            <AccordionTrigger
              onClick={() => handleToggleAccordion(index.toString())}
              className="px-4 hover:no-underline"
            >
              <div className="flex flex-wrap items-center gap-2 text-left">
                {sku.variants.map((variant) => {
                  const isColorValue = variant.name.toLowerCase() === "color" && isHexColor(variant.value);
                  return (
                    <Badge
                      key={variant.name}
                      variant="outline"
                      className={`px-2 py-1 flex items-center gap-1.5`}
                      style={
                        isColorValue
                          ? {
                              backgroundColor: variant.value,
                              color: isLightColor(variant.value) ? "#000" : "#fff",
                              border: isLightColor(variant.value)
                                ? "1px solid #00000022"
                                : "none",
                            }
                          : {}
                      }
                    >
                      {isColorValue && (
                        <span
                          className="inline-block border border-white/40 rounded-full w-3 h-3"
                          style={{ backgroundColor: variant.value }}
                        />
                      )}
                      {variant.name}: {variant.value}
                    </Badge>
                  );
                })}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2 pt-2">
                <div className="space-y-2">
                  <Label htmlFor={`${index}-stock`}>Stock</Label>
                  <Input
                    id={`${index}-stock`}
                    type="number"
                    value={sku.stock || ""}
                    onChange={(e) =>
                      handleInputChange(index, "stock", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-price`}>Price ($)</Label>
                  <Input
                    id={`${index}-price`}
                    type="number"
                    step="0.01"
                    value={sku.price || ""}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-compare-price`}>
                    Compare At Price ($)
                  </Label>
                  <Input
                    id={`${index}-compare-price`}
                    type="number"
                    step="0.01"
                    value={sku.compare_at_price || ""}
                    onChange={(e) =>
                      handleInputChange(index, "compare_at_price", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-cost`}>
                    {t("costPerItem")}
                  </Label>
                  <Input
                    id={`${index}-cost`}
                    type="number"
                    step="0.01"
                    value={sku.cost_per_item || ""}
                    onChange={(e) =>
                      handleInputChange(index, "cost_per_item", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-profit`}>
                    {t("profit")}
                  </Label>
                  <Input
                    id={`${index}-profit`}
                    type="number"
                    step="0.01"
                    value={sku.profit.toFixed(2)}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${index}-margin`}>
                    {t("margin")}
                  </Label>
                  <Input
                    id={`${index}-margin`}
                    type="number"
                    step="0.01"
                    value={sku.margin.toFixed(2)}
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
