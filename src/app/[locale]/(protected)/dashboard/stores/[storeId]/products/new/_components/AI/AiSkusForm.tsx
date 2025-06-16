"use client";

import { useProductForm } from "@/providers/product-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Eye,
  DollarSign,
  Target,
  Activity,
  Zap,
  Star,
  ShoppingBag,
  ArrowUpRight,
  Loader,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import axios from "axios";

type Props = {
  onGenerationSuccess: () => void;
};

type SelectedSku = {
  index: number;
  sku: any;
};

type AIResponse = {
  products: Array<{
    product_name: string;
    source: string;
    price: number;
    "product link": string;
    "image link": string;
  }>;
  recommendations: {
    min_price: number;
    max_price: number;
    avg_price: number;
    user_price: number;
    price_suggestion: string;
    competitiveness: string;
    recommended_range: [number, number];
    avg_relation: string;
    profit_margin: string;
    profit_percentage: string;
  };
};

const AiVariantDialog = ({ onGenerationSuccess }: Props) => {
  const { formData } = useProductForm();
  const [selectedSku, setSelectedSku] = useState<SelectedSku | null>(null);
  const [costPrice, setCostPrice] = useState<number>(0);
  const [userPrice, setUserPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSkuSelect = (sku: any, index: number) => {
    setSelectedSku({ index, sku });
    setUserPrice(sku.price || 0);
    setCostPrice(sku.cost_per_item || 0);
  };

  const handleAnalyze = async () => {
    if (!selectedSku) return;

    setIsLoading(true);
    setError(null);

    try {
      // Create product name from base name and variant attributes
      const variantString = selectedSku.sku.variants
        .map((v: any) => `${v.name}: ${v.value}`)
        .join(", ");
      const productName = `${formData.name}`;

      const requestBody = {
        product_name: productName,
        cost_price: costPrice,
        user_price: userPrice,
      };

      // Simulate API call - replace with your actual endpoint
      const response = await axios.post(
        "https://abdallah-03-marketpriceestimation.hf.space/market-prices-estimation",
        requestBody
      );

      if (!response.data) {
        setError("Failed to analyze product. Please try again.");
        throw new Error("Failed to analyze product");
      }

      console.log(response.data);

      setAiResponse(response.data);
      // onGenerationSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getCompetitivenessColor = (competitiveness: string) => {
    if (competitiveness.includes("Very Cheap")) return "text-red-600";
    if (competitiveness.includes("Cheap")) return "text-orange-600";
    if (competitiveness.includes("Competitive")) return "text-green-600";
    if (competitiveness.includes("Expensive")) return "text-blue-600";
    return "text-gray-600";
  };

  const getCompetitivenessIcon = (competitiveness: string) => {
    if (
      competitiveness.includes("Very Cheap") ||
      competitiveness.includes("Cheap")
    ) {
      return <TrendingDown className="h-4 w-4" />;
    }
    if (competitiveness.includes("Competitive")) {
      return <CheckCircle2 className="h-4 w-4" />;
    }
    return <TrendingUp className="h-4 w-4" />;
  };

  const handleVisitProduct = (productLink: string) => {
    if (productLink && productLink !== "#" && productLink !== "") {
      window.open(productLink, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="max-w-4xl max-h-[90vh]">
      <div className="space-y-6">
        {/* Variant Selection */}
        <div>
          <Label className="text-base font-semibold mb-3 block">
            Select Product Variant
          </Label>
          {formData.skus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60">
              {formData.skus.map((sku, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedSku?.index === index
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => handleSkuSelect(sku, index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">SKU {index + 1}</Badge>
                      <span className="font-semibold text-lg">
                        ${sku.price}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {sku.variants.map((variant: any, vIndex: number) => (
                        <div
                          key={vIndex}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="font-medium">{variant.name}:</span>
                          {variant.name.toLowerCase() === "color" ? (
                            <span className="flex items-center gap-1 ">
                              <span
                                className="inline-block w-4 h-4 rounded-full border border-muted"
                                style={{ backgroundColor: variant.value }}
                              ></span>
                              <span>{variant.value}</span>
                            </span>
                          ) : (
                            <span>{variant.value}</span>
                          )}
                        </div>
                      ))}
                      <div className="text-xs text-muted-foreground mt-2">
                        Cost: ${sku.cost_per_item} | Stock: {sku.stock}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No product variants found. Please add variants to your product
                first.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Pricing Input */}
        {selectedSku && (
          <div className="space-y-4">
            <Separator />
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Pricing Information
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    value={costPrice}
                    onChange={(e) => setCostPrice(Number(e.target.value))}
                    placeholder="Enter cost price"
                  />
                </div>
                <div>
                  <Label htmlFor="userPrice">Your Selling Price</Label>
                  <Input
                    id="userPrice"
                    type="number"
                    value={userPrice}
                    onChange={(e) => setUserPrice(Number(e.target.value))}
                    placeholder="Enter your price"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !costPrice || !userPrice}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Market...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Enhanced AI Response */}
        {aiResponse && (
          <div className="space-y-6">
            <Separator />

            {/* Header with Animation */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Market Analysis Results
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered competitive intelligence
                </p>
              </div>
            </div>

            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Competitiveness Card */}
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <CardTitle className="text-sm font-medium">
                      Competitiveness
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div
                    className={`flex items-center gap-2 ${getCompetitivenessColor(
                      aiResponse.recommendations.competitiveness
                    )}`}
                  >
                    {getCompetitivenessIcon(
                      aiResponse.recommendations.competitiveness
                    )}
                    <span className="font-bold text-lg">
                      {aiResponse.recommendations.competitiveness}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Profit Margin Card */}
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <CardTitle className="text-sm font-medium">
                      Profit Margin
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {aiResponse.recommendations.profit_percentage}
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-400 font-medium">
                    {aiResponse.recommendations.profit_margin}
                  </div>
                </CardContent>
              </Card>

              {/* Market Average Card */}
              <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-full -translate-y-10 translate-x-10"></div>
                <CardHeader className="pb-2 relative">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-orange-600" />
                    <CardTitle className="text-sm font-medium">
                      Market Average
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    ${aiResponse.recommendations.avg_price.toLocaleString()}
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-400 font-medium">
                    ${aiResponse.recommendations.min_price.toLocaleString()} - $
                    {aiResponse.recommendations.max_price.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Recommendations */}
            <div className="space-y-3">
              <Alert className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Zap className="h-3 w-3 text-blue-600" />
                  </div>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
                <AlertDescription className="ml-8">
                  <span className="font-semibold text-blue-800 dark:text-blue-300">
                    Price Suggestion:
                  </span>{" "}
                  <span className="text-blue-700 dark:text-blue-400">
                    {aiResponse.recommendations.price_suggestion}
                  </span>
                </AlertDescription>
              </Alert>

              <Alert className="border-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Star className="h-3 w-3 text-purple-600" />
                  </div>
                  <AlertCircle className="h-4 w-4 text-purple-600" />
                </div>
                <AlertDescription className="ml-8">
                  <span className="font-semibold text-purple-800 dark:text-purple-300">
                    Market Position:
                  </span>{" "}
                  <span className="text-purple-700 dark:text-purple-400">
                    {aiResponse.recommendations.avg_relation}
                  </span>
                </AlertDescription>
              </Alert>
            </div>

            {/* Enhanced Competitor Products */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Competitor Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    {aiResponse.products.length} competitor products found
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {aiResponse.products.slice(0, 6).map((product, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:scale-[1.02]"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={product["image link"] || "/placeholder.svg"}
                            alt={product.product_name}
                            className="w-16 h-16 object-cover rounded-lg border-2 border-muted"
                            onError={(e) => {
                              e.currentTarget.src =
                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAyNEg0MFY0MEgyNFYyNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
                            }}
                          />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {product.product_name}
                          </h5>

                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline">{product.source}</Badge>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary">
                                ${product.price.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full h-8 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                            onClick={() =>
                              handleVisitProduct(product["product link"])
                            }
                            disabled={
                              !product["product link"] ||
                              product["product link"] === "#"
                            }
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View Product
                            <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {aiResponse.products.length > 6 && (
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="px-3 py-1">
                    +{aiResponse.products.length - 6} more competitors found
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiVariantDialog;
