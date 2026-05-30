export type Seller = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string | null;
  story: string | null;
  image_url: string;
  created_at: string;
};

export type Product = {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
  created_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  guest_name: string;
  rating: number;
  comment: string;
  created_at: string;
};

export type ProductWithSeller = Product & {
  seller_name: string;
};

export type ReviewWithProduct = Review & {
  product_name: string;
};

export type FeaturedProduct = {
  id: string;
  avg_rating: number | null;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  seller_name: string;
};


export type SellerProduct = FeaturedProduct & {
  seller_id: string,
  created_at: string,
  stock: number,
}


