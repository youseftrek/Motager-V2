import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Men", href: "/men", image: "/images/male.png" },
  { name: "Women", href: "/women", image: "/images/female.png" },
  { name: "Accessories", href: "/accessories", image: "/images/noImage.png" },
];

export default function FeaturedCategories() {
  return (
    <div className="bg-background mx-auto py-12 container">
      <h2 className="mb-8 font-bold text-2xl text-center">Shop by Category</h2>
      <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <div className="shadow-sm hover:shadow-md p-6 rounded-lg text-center transition-shadow">
              <Image
                src={category.image}
                alt={category.name}
                width={300}
                height={300}
                className="bg-primary/20 mb-4 rounded w-full object-cover"
              />
              <p className="font-semibold text-lg">{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
