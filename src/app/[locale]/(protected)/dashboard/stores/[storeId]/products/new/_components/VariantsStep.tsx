"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProductForm } from "@/providers/product-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

export default function VariantsStep() {
  const {
    formData,
    addVariant,
    removeVariant,
    addVariantValue,
    removeVariantValue,
  } = useProductForm();
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantValues, setNewVariantValues] = useState<
    Record<number, string>
  >({});

  const handleAddVariant = () => {
    if (!newVariantName) return;

    addVariant({
      name: newVariantName,
      values: [],
    });

    setNewVariantName("");
  };

  const handleAddVariantValue = (variantIndex: number) => {
    const value = newVariantValues[variantIndex];
    if (!value) return;

    addVariantValue(variantIndex, value);

    // Clear input field
    setNewVariantValues((prev) => ({
      ...prev,
      [variantIndex]: "",
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block mb-2 font-medium text-sm">
            Add Variant Type
          </label>
          <Input
            placeholder="e.g., Color, Size, Material"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
          />
        </div>
        <Button onClick={handleAddVariant} disabled={!newVariantName}>
          Add Variant
        </Button>
      </div>

      {formData.variants.length > 0 ? (
        <div className="space-y-4">
          {formData.variants.map((variant, variantIndex) => (
            <Card key={variantIndex}>
              <CardHeader className="flex flex-row justify-between items-center p-4 pb-2">
                <h3 className="font-medium">{variant.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeVariant(variantIndex)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {variant.values.map((value, valueIndex) => (
                    <Badge key={valueIndex} className="flex items-center gap-1">
                      {value}
                      <button
                        onClick={() =>
                          removeVariantValue(variantIndex, valueIndex)
                        }
                        className="hover:bg-primary-foreground ml-1 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder={`Add ${variant.name} value`}
                    value={newVariantValues[variantIndex] || ""}
                    onChange={(e) =>
                      setNewVariantValues({
                        ...newVariantValues,
                        [variantIndex]: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddVariantValue(variantIndex);
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleAddVariantValue(variantIndex)}
                    disabled={!newVariantValues[variantIndex]}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center border border-dashed rounded-md h-32">
          <p className="text-muted-foreground">No variants added yet</p>
        </div>
      )}
    </div>
  );
}
