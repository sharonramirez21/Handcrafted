'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from "@/auth";
import {auth} from "@/auth"
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import { z } from 'zod';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    console.log("signOut");
    await signOut({ redirectTo: '/' });
}


const ProductSchema = z.object({
      name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
    }),
    description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
    }),
    price: z.coerce.number().positive({
    message: "Price must be greater than 0.",
    }),
    category: z.string().min(1, {
    message: "Please select a category.",
    }),
    image_url: z.string().min(1, {
     message: "Please enter an image path or URL.",
   }),
    stock: z.coerce.number().int().min(0, {
    message: "Stock cannot be negative.",
    }),

});


export type ProductFormState = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
    image_url?: string[];
    stock?: string[];
  };
  message?: string | null;
};

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData,
    ): Promise<ProductFormState> {
  const validatedFields = ProductSchema.safeParse({
  name: formData.get("name"),
  description: formData.get("description"),
  price: formData.get("price"),
  category: formData.get("category"),
  image_url: formData.get("image_url"),
  stock: formData.get("stock"),
  });

  if (!validatedFields.success) {
    return {
    errors: validatedFields.error.flatten().fieldErrors,
    message: "Missing or invalid fields. Failed to create product.",
    };
  }

  const session = await auth();
  const sellerEmail = session?.user?.email;

  if (!sellerEmail) {
    return {
    message: "Seller email was not found in the session.",
    };
  }

  const { name, description, price, category, image_url, stock } =
  validatedFields.data;

  try {
    const seller = await sql<{ id: string }[]>`
    SELECT id
    FROM sellers
    WHERE email = ${sellerEmail}
    LIMIT 1;
    `;

    if (seller.length === 0) {
      return {
      message: "Seller was not found.",
      };
    }

    const sellerId = seller[0].id;

    await sql`
    INSERT INTO products (
      seller_id,
      name,
      description,
      price,
      category,
      image_url,
      stock
    )
    VALUES (
      ${sellerId},
      ${name},
      ${description},
      ${price},
      ${category},
      ${image_url},
      ${stock}
    );
    `;
  } catch (error) {
    console.error("Database Error:", error);

    return {
      message: "Database Error: Failed to create product.",
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}


const EditProductSchema = z.object({
  id: z.string().uuid({
    message: "Invalid product id.",
  }),
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be greater than 0.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  image_url: z.string().min(1, {
    message: "Please enter an image path or URL.",
  }),
  stock: z.coerce.number().int().min(0, {
    message: "Stock cannot be negative.",
  }),
});

export type EditProductFormState = {
  errors?: {
    id?: string[];
    name?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
    image_url?: string[];
    stock?: string[];
  };
  message?: string | null;
};

export async function updateProduct(
  prevState: EditProductFormState,
  formData: FormData,
):Promise<EditProductFormState> {
  const validatedFields = EditProductSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image_url: formData.get("image_url"),
    stock: formData.get("stock"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to update product."
    }
  }

  const session = await auth()
  const sellerEmail = session?.user?.email

  if (!sellerEmail) {
    return {
      message: "Seller email was not found in the session. ",
    };
  }

  const { id, name, description, price, category, image_url, stock } = validatedFields.data;
  try {
    const result = await sql<{ id: string }[]>`
      UPDATE products
      SET
      name = ${name},
      description = ${description},
      price = ${price},
      category = ${category},
      image_url = ${image_url},
      stock = ${stock}
      WHERE products.id = ${id}
      AND products.seller_id = (
      SELECT sellers.id
      FROM sellers
      WHERE sellers.email = ${sellerEmail}
    )
    RETURNING id;
    `;

    if (result.length === 0) {
      return {
        message: "Product was not found or you do not have permission to edit it.",
      };
    }
    } catch (error) {
        console.error("Database Error:", error);

        return {
          message: "Database Error: Failed to update product.",
        };
    }

    revalidatePath("/dashboard/products");
    revalidatePath(`/dashboard/products/${id}/edit`);
    redirect("/dashboard/products");


}



export async function deleteProduct(productId: string) {
    const session = await auth();
    const sellerEmail = session?.user?.email;

    if (!sellerEmail) {
        throw new Error("Seller email was not found in the session.");
    }

    try {
        await sql.begin(async (sql) => {
            await sql`
            DELETE FROM reviews
            WHERE product_id = ${productId};
            `;

        const deletedProduct = await sql<{ id: string }[]>`
            DELETE FROM products
            WHERE products.id = ${productId}
            AND products.seller_id = (
            SELECT sellers.id
            FROM sellers
            WHERE sellers.email = ${sellerEmail}
            )
            RETURNING id;
            `;

        if (deletedProduct.length === 0) {
        throw new Error(
        "Product was not found or you do not have permission to delete it.",
        );
        }
        });
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to delete product.");
    }

    revalidatePath("/dashboard/products");
}

