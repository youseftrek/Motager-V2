"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProductForm } from "@/providers/product-form";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Edit, Check } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function VariantsStep() {
  const {
    formData,
    addVariant,
    removeVariant,
    addVariantValue,
    removeVariantValue,
    updateVariantValue,
  } = useProductForm();
  const [newVariantName, setNewVariantName] = useState("");
  const [newVariantValues, setNewVariantValues] = useState<
    Record<number, string>
  >({});
  const [customColor, setCustomColor] = useState<string>("#ff0000");
  const [editingColor, setEditingColor] = useState<{
    variantIndex: number;
    valueIndex: number;
    value: string;
  } | null>(null);

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

  // Helper function to determine if a variant is a color variant
  const isColorVariant = (variantName: string) => {
    return variantName.toLowerCase() === "color";
  };

  // Helper function to add custom color to a color variant
  const addCustomColor = (variantIndex: number) => {
    if (!customColor) return;

    // Check if color is valid hex
    if (!/^#[0-9A-F]{6}$/i.test(customColor)) {
      alert("Please enter a valid hex color");
      return;
    }

    // Add the color as a variant value
    addVariantValue(variantIndex, customColor);
  };

  // Start editing a color
  const startEditingColor = (
    variantIndex: number,
    valueIndex: number,
    currentValue: string
  ) => {
    if (isHexColor(currentValue)) {
      setEditingColor({
        variantIndex,
        valueIndex,
        value: currentValue,
      });
      setCustomColor(currentValue);
    }
  };

  // Save the edited color
  const saveEditedColor = () => {
    if (!editingColor) return;

    // Check if color is valid hex
    if (!/^#[0-9A-F]{6}$/i.test(customColor)) {
      alert("Please enter a valid hex color");
      return;
    }

    // Update the value
    updateVariantValue(
      editingColor.variantIndex,
      editingColor.valueIndex,
      customColor
    );

    // Reset editing state
    setEditingColor(null);
  };

  // Cancel editing
  const cancelEditingColor = () => {
    setEditingColor(null);
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

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-end gap-2">
        <div className="">
          <label className="block mb-2 font-medium text-sm">
            Add Variant Type
          </label>
          <Input
            className="max-w-[400px]"
            placeholder="e.g., Color, Size, Material"
            value={newVariantName}
            onChange={(e) => setNewVariantName(e.target.value)}
          />
        </div>
        <Button onClick={handleAddVariant} size="sm" disabled={!newVariantName}>
          Add Variant
        </Button>
      </div>

      {formData.variants.length > 0 ? (
        <div className="space-y-4">
          {formData.variants.map((variant, variantIndex) => (
            <Card key={variantIndex}>
              <CardHeader className="flex flex-row justify-between items-center p-2">
                <h3 className="rtl:mr-2 ltr:ml-2 font-medium">
                  {variant.name}
                </h3>
                <Button
                  variant="softDestructive"
                  size="icon"
                  onClick={() => removeVariant(variantIndex)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="">
                <div className="flex flex-wrap gap-2 mb-3">
                  {variant.values.map((value, valueIndex) => {
                    const isEditing =
                      editingColor &&
                      editingColor.variantIndex === variantIndex &&
                      editingColor.valueIndex === valueIndex;

                    // Determine if this is a color value
                    const isColorValue =
                      isColorVariant(variant.name) && isHexColor(value);

                    return (
                      <div key={valueIndex} className="flex items-center">
                        {isEditing ? (
                          <div className="flex items-center gap-2 bg-muted/20 p-1 border rounded-md">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div
                                  className="border-2 rounded-md w-8 h-8 cursor-pointer"
                                  style={{
                                    backgroundColor: customColor,
                                  }}
                                />
                              </PopoverTrigger>
                              <PopoverContent className="flex flex-col gap-2 p-2 w-auto">
                                <HexColorPicker
                                  color={customColor}
                                  onChange={setCustomColor}
                                />
                                <div className="flex gap-2 mt-2">
                                  <Input
                                    type="text"
                                    value={customColor}
                                    onChange={(e) =>
                                      setCustomColor(e.target.value)
                                    }
                                    className="h-8 text-xs"
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>

                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={saveEditedColor}
                                className="w-7 h-7"
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={cancelEditingColor}
                                className="w-7 h-7"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Badge
                            className={`flex items-center gap-1 ${
                              isColorValue ? "pr-1" : ""
                            }`}
                            style={
                              isColorValue
                                ? {
                                    backgroundColor: value,
                                    color: isLightColor(value)
                                      ? "#000"
                                      : "#fff",
                                    border: isLightColor(value)
                                      ? "1px solid #00000022"
                                      : "none",
                                  }
                                : {}
                            }
                          >
                            {value}

                            {isColorValue && (
                              <button
                                onClick={() =>
                                  startEditingColor(
                                    variantIndex,
                                    valueIndex,
                                    value
                                  )
                                }
                                className="hover:bg-black/10 ml-1 p-1 rounded-full"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                            )}

                            <button
                              onClick={() =>
                                removeVariantValue(variantIndex, valueIndex)
                              }
                              className="ml-1 rounded-full hover:text-destructive transition-all duration-200"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        )}
                      </div>
                    );
                  })}
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

                {/* Color picker for color variants */}
                {isColorVariant(variant.name) && (
                  <div className="mt-4 pt-3 border-t">
                    <div className="mb-2 font-medium text-sm">
                      Add Color with Color Picker
                    </div>
                    <div className="flex items-end gap-3">
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <div
                              className="border-2 rounded-md w-12 h-12 cursor-pointer"
                              style={{
                                backgroundColor: customColor,
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="flex flex-col gap-2 p-2 w-auto">
                            <HexColorPicker
                              color={customColor}
                              onChange={setCustomColor}
                            />
                            <div className="flex gap-2 mt-2">
                              <Input
                                type="text"
                                value={customColor}
                                onChange={(e) => setCustomColor(e.target.value)}
                                className="h-8 text-xs"
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addCustomColor(variantIndex)}
                      >
                        Add Color
                      </Button>
                    </div>
                  </div>
                )}
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
