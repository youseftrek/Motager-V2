"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedDashboardPage from "@/app/[locale]/(protected)/dashboard/_components/AnimatedDashboardPage";
import { Category } from "@/types/category";
import { useParams } from "next/navigation";
import { ArrowLeft, Edit, Package, DollarSign, Tag, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";

type Props = {
  product: any;
  categories: Category[];
};

export default function ProductView({ product, categories }: Props) {
  const { storeId } = useParams();
  const router = useRouter();

  const category = categories.find(cat => cat.id === product.category?.id);

  const handleEdit = () => {
    router.push(`/dashboard/stores/${storeId}/products/${product.id}/edit`);
  };

  const handleBack = () => {
    router.push(`/dashboard/stores/${storeId}/products`);
  };

  return (
    <AnimatedDashboardPage>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 " />
            </Button>
            <div className="mx-auto">
              <h1 className="text-2xl font-bold text-center">{product.name}</h1>
              <p className="text-muted-foreground">Product Details</p>
            </div>
          </div>
          <Button onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="variants">Variants & SKUs</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Basic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <p className="text-sm">{product.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Status</label>
                        <div className="mt-1">
                          <Badge variant={product.published ? "default" : "secondary"}>
                            {product.published ? "Published" : "Draft"}
                          </Badge>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Description</label>
                        <p className="text-sm mt-1">{product.description}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Category</label>
                        <p className="text-sm">{category?.name || "No category"}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Starting Price</label>
                        <p className="text-sm font-medium">${product.startPrice?.toFixed(2) || "0.00"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variants" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="w-5 h-5" />
                      Variants & SKUs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {product.has_variants ? (
                      <div className="space-y-4">
                        {product.variants?.map((variant: any, index: number) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-medium mb-2">{variant.name}</h4>
                            <div className="flex flex-wrap gap-2">
                              {variant.values?.map((value: string, valueIndex: number) => (
                                <Badge key={valueIndex} variant="outline">
                                  {value}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-3">SKUs</h4>
                          <div className="space-y-2">
                            {product.skus?.map((sku: any, index: number) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded">
                                <div>
                                  <p className="font-medium">${sku.price?.toFixed(2)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Stock: {sku.stock} | Cost: ${sku.cost_per_item?.toFixed(2)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm">Profit: ${sku.profit?.toFixed(2)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Margin: {sku.margin?.toFixed(1)}%
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No variants configured</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Product Images
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.main_image_url && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Main Image</label>
                          <div className="mt-2">
                            <Image
                              src={product.main_image_url}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="rounded-lg object-cover"
                            />
                          </div>
                        </div>
                      )}
                      
                      {product.images_url && product.images_url.length > 0 && (
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Additional Images</label>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                            {product.images_url.map((imageUrl: string, index: number) => (
                              <Image
                                key={index}
                                src={imageUrl}
                                alt={`${product.name} - Image ${index + 1}`}
                                width={150}
                                height={150}
                                className="rounded-lg object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Starting Price</span>
                  <span className="font-medium">${product.startPrice?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total SKUs</span>
                  <span className="font-medium">{product.skus?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Stock</span>
                  <span className="font-medium">
                    {product.skus?.reduce((sum: number, sku: any) => sum + (sku.stock || 0), 0) || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={handleEdit} className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Product
                </Button>
                <Button variant="outline" onClick={handleBack} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedDashboardPage>
  );
} 