import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type BestSellersSliderProps = {
  swipeSpeed?: number;
  bulletColor?: string;
  showBullets?: boolean;
};

export const config = {
  inputs: {
    swipeSpeed: {
      type: "slider" as const,
      label: "Swipe Speed (sec)",
      min: 0,
      max: 10,
      default: 4,
    },
    bulletColor: {
      type: "color" as const,
      label: "Bullet Color",
      default: "#22c55e",
    },
    showBullets: {
      type: "toggle" as const,
      label: "Show Bullets",
      default: true,
    },
  },
};

const products = [
  {
    id: 1,
    name: "Luxury Sofa",
    price: "$299.99",
    image: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
  },
  {
    id: 2,
    name: "Modern Chair",
    price: "$149.99",
    image: "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
  },
  {
    id: 3,
    name: "Elegant Lamp",
    price: "$79.99",
    image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
  },
  {
    id: 4,
    name: "Wooden Table",
    price: "$199.99",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
  },
];

export default function BestSellersSlider({
  swipeSpeed = 4,
  bulletColor = "#22c55e",
  showBullets = true,
}: BestSellersSliderProps) {
  return (
    <div className="mx-auto py-8 w-full max-w-7xl">
      <h2 className="mb-6 font-bold text-2xl text-center">Best Sellers</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        autoplay={
          swipeSpeed > 0
            ? { delay: swipeSpeed * 1000, disableOnInteraction: false }
            : false
        }
        className="px-4 pb-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Card className="shadow-lg hover:shadow-2xl rounded-lg overflow-hidden transition-all">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />
              <CardContent className="flex flex-col items-center p-4 text-center">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">{product.price}</p>
                <Button className="mt-3">Add to Cart</Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className={cn(
          "flex gap-1 custom-pagination mx-auto mt-6 w-full justify-center items-center",
          !showBullets && "hidden"
        )}
      ></div>

      <style jsx>{`
        :global(.swiper-pagination) {
          position: relative !important;
          bottom: -10px !important; /* Move bullets down */
        }
        :global(.swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background-color: ${bulletColor} !important;
          opacity: 0.5;
          transition: all 0.3s ease-in-out;
        }
        :global(.swiper-pagination-bullet-active) {
          background-color: ${bulletColor} !important;
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
