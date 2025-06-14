export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  published: boolean;
  startPrice: number;
  main_image_url: string;
  images_url: string[];
  category: Category;
}

export interface Category {
  id: number;
  slug: string;
}
