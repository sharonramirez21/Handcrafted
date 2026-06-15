import postgres from "postgres";
import type {
  ProductWithSeller,
  Review,
  ReviewWithProduct,
  Seller,
  FeaturedProduct,
  Product
} from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchProducts() {
  try {
    const products = await sql<ProductWithSeller[]>`
    SELECT
      p.id,
      p.seller_id,
      p.name,
      p.description,
      p.price::float AS price,
      p.category,
      p.image_url,
      p.stock,
      p.created_at,
      s.name AS seller_name,
      ROUND(AVG(r.rating), 1) AS avg_rating,
      COUNT(r.id) AS review_count
    FROM products p
    JOIN sellers s ON p.seller_id = s.id
    LEFT JOIN reviews r ON p.id = r.product_id
    GROUP BY p.id, p.seller_id, p.name, p.description, p.price, p.category, p.image_url, p.stock, p.created_at, s.name
    ORDER BY p.created_at DESC;
  `;

  return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchProductById(id: string) {
  try {
    const product = await sql<ProductWithSeller[]>`
    SELECT
      products.id,
      products.seller_id,
      products.name,
      products.description,
      products.price::float AS price,
      products.category,
      products.image_url,
      products.stock,
      products.created_at,
      sellers.name AS seller_name
    FROM products
    JOIN sellers ON products.seller_id = sellers.id
    WHERE products.id = ${id};
  `;

  return product[0];
  } catch (error) {
     console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchSellers() {
  try {
    const sellers = await sql<Seller[]>`
    SELECT
      id,
      name,
      bio,
      story,
      image_url
    FROM sellers
    ORDER BY created_at;
  `;

  return sellers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchSellerById(id: string) {
  try {
    const seller = await sql<Seller[]>`
    SELECT
      id,
      name,
      email,
      password,
      bio,
      story,
      image_url,
      created_at
    FROM sellers
    WHERE id = ${id};
  `;

  return seller[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchProductsBySellerId(sellerId: string) {
  try {
    const products = await sql<ProductWithSeller[]>`
    SELECT
      products.id,
      products.seller_id,
      products.name,
      products.description,
      products.price::float AS price,
      products.category,
      products.image_url,
      products.stock,
      products.created_at,
      sellers.name AS seller_name,
      ROUND(AVG(reviews.rating),1) AS avg_rating
    FROM products
    JOIN sellers ON products.seller_id = sellers.id
    LEFT JOIN reviews  ON reviews.product_id = products.id
    WHERE products.seller_id = ${sellerId}
    GROUP BY products.id,
      products.seller_id,
      products.name,
      products.description,
      products.price,
      products.category,
      products.image_url,
      products.stock,
      products.created_at,
             seller_name
    ORDER BY products.created_at DESC;
  `;

  return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchReviewsByProductId(productId: string) {
  try {
    const reviews = await sql<Review[]>`
    SELECT
      id,
      product_id,
      guest_name,
      rating,
      comment,
      created_at
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY created_at DESC;
  `;

  return reviews;
  } catch (error) {
     console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchReviewsForSellerProducts(sellerId: string) {
  try {
    const reviews = await sql<ReviewWithProduct[]>`
    SELECT
      reviews.id,
      reviews.product_id,
      reviews.guest_name,
      reviews.rating,
      reviews.comment,
      reviews.created_at,
      products.name AS product_name
    FROM reviews
    JOIN products ON reviews.product_id = products.id
    WHERE products.seller_id = ${sellerId}
    ORDER BY reviews.created_at DESC;
  `;

  return reviews;
  } catch (error) {
     console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}


export async function fetchFeaturedProducts() {
  try {
    const products = await sql<FeaturedProduct[]>`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price::float AS price,
      p.category,
      p.image_url,
      s.name AS seller_name,
      ROUND(AVG(r.rating),1) AS avg_rating
    FROM products p
    INNER JOIN reviews r ON r.product_id = p.id
    INNER JOIN sellers s ON p.seller_id = s.id
    GROUP BY p.id, p.name, p.description, p.price, p.category, p.image_url, s.name
    HAVING AVG(r.rating)>=4
    ORDER BY AVG(r.rating) DESC
    LIMIT 3;
  `;
  return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch  data.');
  }
  
}

export async function fetchProductsBySellerEmail(email: string, query: string) {
  try {
    const products = await sql<ProductWithSeller[]>`
    SELECT
      products.id,
      products.seller_id,
      products.name,
      products.description,
      products.price::float AS price,
      products.category,
      products.image_url,
      products.stock,
      products.created_at,
      sellers.name AS seller_name,
      ROUND(AVG(reviews.rating),1) AS avg_rating,
      COUNT(reviews.id) AS review_count
    FROM products
    JOIN sellers ON products.seller_id = sellers.id
    LEFT JOIN reviews  ON reviews.product_id = products.id
    WHERE sellers.email = ${email} and products.name ILIKE ${`%${query}%`}
    GROUP BY products.id,
      products.seller_id,
      products.name,
      products.description,
      products.price,
      products.category,
      products.image_url,
      products.stock,
      products.created_at,
      sellers.name
    ORDER BY products.created_at DESC;
  `;

  return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}


//By Seller Email
export async function fetchProductByIdForSellerEmail(
  productId: string,
  sellerEmail: string,
) {
  try {
    const products = await sql<Product[]>`
  SELECT
    products.id,
    products.seller_id,
    products.name,
    products.description,
    products.price::float AS price,
    products.category,
    products.image_url,
    products.stock,
    products.created_at
  FROM products
  JOIN sellers ON products.seller_id = sellers.id
    WHERE products.id = ${productId}
      AND sellers.email = ${sellerEmail}
    LIMIT 1;`;
  
  return products[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
  
}

export async function fetchSellerByEmail(email: string) {
  try {
    const seller = await sql<Seller[]>`
    SELECT 
      id,
      name,
      email,
      bio,
      story,
      image_url,
      created_at
    FROM sellers
    WHERE sellers.email=${email} `

    return seller[0];
  
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch data.');
  }
}