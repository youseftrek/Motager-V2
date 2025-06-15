"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProductForm } from "@/providers/product-form";
import Image from "next/image";

export default function ReviewStep() {
  const { formData } = useProductForm();

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

  // Get the single SKU for non-variant products
  const singleSku =
    !formData.has_variants && formData.skus.length > 0
      ? formData.skus[0]
      : null;

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-2xl">Review Product</h2>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Product Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Category ID</p>
              <p className="font-medium">{formData.category.id}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground text-sm">Description</p>
              <p className="font-medium">{formData.description}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Starting Price</p>
              <p className="font-medium">${formData.startPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Status</p>
              <Badge variant={formData.published ? "default" : "secondary"}>
                {formData.published ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>

          {formData.images_url.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-muted-foreground text-sm">Media</p>
              <div className="gap-2 grid grid-cols-4">
                {formData.images_url.map((media, index) => (
                  <Image
                    key={index}
                    src={media || "/placeholder.svg"}
                    width={200}
                    height={200}
                    alt={`Product image ${index + 1}`}
                    className="border rounded-md w-full object-cover aspect-square"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {formData.has_variants && formData.variants.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.variants.map((variant, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">{variant.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {variant.values.map((value, vIndex) => {
                      // Check if this is a color variant and value is a hex color
                      const isColorValue =
                        variant.name.toLowerCase() === "color" &&
                        isHexColor(value);

                      return (
                        <Badge
                          key={vIndex}
                          variant="outline"
                          className={`flex items-center gap-1.5 ${
                            isColorValue ? "px-3 py-1.5" : ""
                          }`}
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
                          {isColorValue && (
                            <span
                              className="inline-block border border-white/40 rounded-full w-3 h-3"
                              style={{ backgroundColor: value }}
                            />
                          )}
                          {value}
                        </Badge>
                      );
                    })}
                  </div>
                  {index < formData.variants.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {formData.skus.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {formData.has_variants ? "SKUs" : "Product Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formData.skus.map((sku, index) => (
                <div key={index}>
                  {formData.has_variants && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {Object.entries(sku.variants).map(
                        ([name, value]) => {
                          // Check if this is a color variant and value is a hex color
                          const isColorValue =
                            name.toLowerCase() === "color" && isHexColor(value.value);

                          return (
                            <Badge
                              key={name}
                              variant="outline"
                              className={`flex items-center gap-1.5 ${
                                isColorValue ? "px-3 py-1.5" : ""
                              }`}
                              style={
                                isColorValue
                                  ? {
                                      backgroundColor: value.value,
                                      color: isLightColor(value.value)
                                        ? "#000"
                                        : "#fff",
                                      border: isLightColor(value.value)
                                        ? "1px solid #00000022"
                                        : "none",
                                    }
                                  : {}
                              }
                            >
                              {isColorValue && (
                                <span
                                  className="inline-block border border-white/40 rounded-full w-3 h-3"
                                  style={{ backgroundColor: value.value }}
                                />
                              )}
                              {name}: {value.value || value.name}
                            </Badge>
                          );
                        }
                      )}
                    </div>
                  )}

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Stock</p>
                      <p className="font-medium">{sku.stock}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Price</p>
                      <p className="font-medium">
                        ${sku.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Compare At Price
                      </p>
                      <p className="font-medium">
                        {sku.compare_at_price > 0
                          ? `$${sku.compare_at_price.toFixed(2)}`
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Cost Per Item
                      </p>
                      <p className="font-medium">
                        ${sku.cost_per_item.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Profit</p>
                      <p className="font-medium">
                        ${sku.profit.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Margin</p>
                      <p className="font-medium">
                        {sku.margin.toFixed(2)}%
                      </p>
                    </div>
                  </div>

                  {index < formData.skus.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-muted-foreground text-sm">
          Please review all the information above before submitting your
          product. Once submitted, you can still edit the product from your
          dashboard.
        </p>
      </div>
    </div>
  );
}
