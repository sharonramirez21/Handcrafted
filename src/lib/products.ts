export type Product = {
  id: string;
  name: string;
  seller: string;
  price: number;
  rating: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Ceramic Vase",
    seller: "Clay & Co.",
    price: 45,
    rating: 5,
  },
  {
    id: "2",
    name: "Leather Wallet",
    seller: "Artisan Goods",
    price: 32,
    rating: 5,
  },
  {
    id: "3",
    name: "Wooden Bowl",
    seller: "Wood Works",
    price: 58,
    rating: 5,
  },
  {
    id: "4",
    name: "Knitted Scarf",
    seller: "Cozy Crafts",
    price: 28,
    rating: 5,
  },
];