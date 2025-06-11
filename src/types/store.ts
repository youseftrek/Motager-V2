export interface Store {
  id: number;
  store_name: string;
  href: any;
  slug: any;
  description: string;
  business_phone: string;
  category_id: number;
  store_currency: string;
  created_at: string;
  updated_at: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
