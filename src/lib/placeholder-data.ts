const sellers = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Ana Handmade Studio",
    email: "ana@example.com",
    password: "123456",
    bio: "Ana creates handmade jewelry using natural stones and recycled materials.",
    story:
      "Ana started creating jewelry as a family tradition and now shares her handmade designs with customers who value unique and sustainable products.",
    image_url: "/seller/ana.png",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "Clay Art Shop",
    email: "clay@example.com",
    password: "123456",
    bio: "Clay Art Shop creates unique ceramic pieces for everyday use.",
    story:
      "This shop focuses on handcrafted pottery made with care, creativity, and attention to detail.",
    image_url: "/seller/clay.png",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442c",
    name: "Natural Crafts",
    email: "natural@example.com",
    password: "123456",
    bio: "Natural Crafts creates home decor items using natural materials.",
    story:
      "Natural Crafts promotes sustainable consumption through handmade baskets, bowls, and decorative items.",
    image_url: "/seller/natural.png",
  },
];

const products = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    seller_id: sellers[0].id,
    name: "Handmade Necklace",
    description:
      "A beautiful handmade necklace made with natural stones and recycled materials.",
    price: 2500,
    category: "Jewelry",
    image_url: "/products/necklace.webp",
    stock: 8,
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442b",
    seller_id: sellers[1].id,
    name: "Ceramic Coffee Mug",
    description:
      "A unique ceramic mug created by hand, perfect for coffee or tea lovers.",
    price: 1800,
    category: "Pottery",
    image_url: "/products/mug.webp",
    stock: 12,
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442c",
    seller_id: sellers[2].id,
    name: "Woven Basket",
    description:
      "A decorative woven basket made with natural fibers for home organization.",
    price: 3200,
    category: "Home Decor",
    image_url: "/products/basket.webp",
    stock: 5,
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442d",
    seller_id: sellers[1].id,
    name: "Ceramic Vase",
    description:
      "A handmade ceramic vase with a simple and elegant design.",
    price: 4500,
    category: "Pottery",
    image_url: "/products/vase.webp",
    stock: 4,
  },
];

const reviews = [
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f1",
    product_id: products[0].id,
    guest_name: "Maria",
    rating: 5,
    comment: "Beautiful product and excellent quality.",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    product_id: products[1].id,
    guest_name: "John",
    rating: 4,
    comment: "Very nice mug. It feels handmade and unique.",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f3",
    product_id: products[2].id,
    guest_name: "Sofia",
    rating: 5,
    comment: "The basket is beautiful and useful for my home.",
  },
];

export { sellers, products, reviews };