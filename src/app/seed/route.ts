import bcrypt from "bcrypt";
import postgres from "postgres";
import { sellers, products, reviews } from "@/lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedSellers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS sellers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      bio TEXT,
      story TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedSellers = await Promise.all(
    sellers.map(async (seller) => {
      const hashedPassword = await bcrypt.hash(seller.password, 10);

      return sql`
        INSERT INTO sellers (id, name, email, password, bio, story, image_url)
        VALUES (
          ${seller.id},
          ${seller.name},
          ${seller.email},
          ${hashedPassword},
          ${seller.bio},
          ${seller.story},
          ${seller.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedSellers;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INT NOT NULL,
      category VARCHAR(100) NOT NULL,
      image_url TEXT,
      stock INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (
          id,
          seller_id,
          name,
          description,
          price,
          category,
          image_url,
          stock
        )
        VALUES (
          ${product.id},
          ${product.seller_id},
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.category},
          ${product.image_url},
          ${product.stock}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

async function seedReviews() {
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      guest_name VARCHAR(255) NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map(
      (review) => sql`
        INSERT INTO reviews (
          id,
          product_id,
          guest_name,
          rating,
          comment
        )
        VALUES (
          ${review.id},
          ${review.product_id},
          ${review.guest_name},
          ${review.rating},
          ${review.comment}
        )
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedReviews;
}

export async function GET() {
  try {
    await sql.begin(async () => {
      await seedSellers();
      await seedProducts();
      await seedReviews();
    });

    return Response.json({
      message: "Database seeded successfully.",
    });
  } catch (error) {
    return Response.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}