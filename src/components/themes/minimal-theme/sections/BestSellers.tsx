// components/BestSellers.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const products = [
  { id: 1, name: "Minimal Tee", price: "$29.99", image: "/images/noImage.png" },
  {
    id: 2,
    name: "Classic Watch",
    price: "$99.99",
    image: "/images/noImage.png",
  },
  { id: 3, name: "Eco Tote", price: "$19.99", image: "/images/noImage.png" },
];

export const config = {
  inputs: {
    title: {
      type: "text" as const,
      label: "Section Title",
      placeholder: "Best Sellers",
    },
  },
};

type BestSellersProps = {
  title: string;
};

export default function BestSellers({ title }: BestSellersProps) {
  return (
    <div className="bg-background mx-auto py-12 container">
      <h2 className="mb-8 font-bold text-2xl text-center">
        {title || "Best Sellers"}
      </h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="bg-primary/20 rounded w-full object-cover"
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <p className="font-semibold text-lg">{product.name}</p>
              <p className="text-gray-600">{product.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
